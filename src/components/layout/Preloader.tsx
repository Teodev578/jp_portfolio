import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logoJP from '../../assets/logo_jp.avif';
import portraitImg from '../../assets/portrait_nb.avif';
import net1 from '../../assets/nettoyage/1.avif';
import est1 from '../../assets/esthetique/1.avif';
import prep1 from '../../assets/preparation/1.avif';

interface PreloaderProps {
    onLoaded: () => void;
}

export const Preloader = ({ onLoaded }: PreloaderProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
        // Bloquer le scroll pendant le chargement
        document.body.style.overflow = 'hidden';

        // 1. Animation de pulsation du logo (en boucle infinie)
        const pulseAnim = gsap.to(logoRef.current, {
            scale: 1.05,
            opacity: 1,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        // 2. Préchargement des images critiques
        const criticalImages = [logoJP, portraitImg, net1, est1, prep1];
        let loadedCount = 0;

        const updateProgress = () => {
            loadedCount++;
            const progress = (loadedCount / criticalImages.length) * 100;
            setLoadProgress(progress);

            if (loadedCount === criticalImages.length) {
                // Une fois fini, on lance la sortie du preloader
                startExitAnimation();
            }
        };

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = updateProgress;
            img.onerror = updateProgress; // On continue même si une image échoue
        });

        // Sécurité : Timeout si le chargement est trop long (5s)
        const timeout = setTimeout(() => {
            if (loadedCount < criticalImages.length) {
                setLoadProgress(100);
                startExitAnimation();
            }
        }, 5000);

        function startExitAnimation() {
            const tl = gsap.timeline({
                onComplete: () => {
                    pulseAnim.kill();
                    document.body.style.overflow = '';
                    onLoaded();
                }
            });

            tl.to(['.preloader-content'], {
                y: -20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.in",
            }, "+=0.3")
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut"
            });
        }

        return () => {
            clearTimeout(timeout);
            pulseAnim.kill();
        };
    }, [onLoaded]);

    // Animation fluide de la barre et du compteur
    useEffect(() => {
        gsap.to(progressBarRef.current, {
            scaleX: loadProgress / 100,
            duration: 0.5,
            ease: "power2.out"
        });
        
        if (counterRef.current) {
            const currentNum = parseInt(counterRef.current.innerText) || 0;
            gsap.to({ val: currentNum }, {
                val: loadProgress,
                duration: 0.5,
                onUpdate: function() {
                    if (counterRef.current) {
                        counterRef.current.innerText = `${Math.round(this.targets()[0].val).toString().padStart(2, '0')}%`;
                    }
                }
            });
        }
    }, [loadProgress]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-[100vh] z-[9999] flex flex-col justify-between"
            style={{ backgroundColor: 'var(--bg-color)' }} /* S'adapte dynamiquement au thème ! */
        >

            {/* Centre : Logo */}
            <div className="preloader-content flex-1 flex justify-center items-center">
                <img
                    ref={logoRef}
                    src={logoJP}
                    alt="Le Préparateur Logo"
                    className="w-[120px] h-auto opacity-60 grayscale contrast-125"
                />
            </div>

            {/* Bas : Informations Techniques */}
            <div className="preloader-content w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0 px-6 md:px-8 pb-6">
                    <span
                        className="font-mono text-[0.65rem] md:text-xs uppercase tracking-[0.2em] opacity-50"
                        style={{ color: 'var(--text-color)' }} /* S'adapte à var(--text-color) */
                    >
                        Initialisation du studio //
                    </span>
                    <span
                        ref={counterRef}
                        className="font-extrabold leading-[0.8] text-[clamp(3rem,8vw,6rem)]"
                        style={{ fontFamily: 'var(--font-headline)', color: 'var(--text-color)' }}
                    >
                        00%
                    </span>
                </div>

                {/* Ligne de fond de la barre de progression */}
                <div className="w-full h-[2px]" style={{ backgroundColor: 'var(--border-color)' }}>
                    {/* Barre de progression remplie avec la couleur Accent */}
                    <div
                        ref={progressBarRef}
                        className="w-full h-full origin-left scale-x-0"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                    ></div>
                </div>
            </div>

        </div>
    );
};