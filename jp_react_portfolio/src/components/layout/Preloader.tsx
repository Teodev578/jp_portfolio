import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logoJP from '../../assets/logo_jp.png';

interface PreloaderProps {
    onLoaded: () => void;
}

export const Preloader = ({ onLoaded }: PreloaderProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

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

        // 2. Timeline principale du preloader
        const tl = gsap.timeline({
            onComplete: () => {
                pulseAnim.kill(); // On arrête la pulsation
                document.body.style.overflow = ''; // On débloque le scroll
                onLoaded(); // On affiche le site
            }
        });

        const progress = { value: 0 };

        // Chargement (de 0 à 100%)
        tl.to(progress, {
            value: 100,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    const num = Math.round(progress.value);
                    counterRef.current.innerText = `${num.toString().padStart(2, '0')}%`;
                }
            }
        }, 0)
            // Barre de progression qui se remplit
            .to(progressBarRef.current, {
                scaleX: 1,
                duration: 2,
                ease: "power3.inOut",
            }, 0);

        // Disparition des éléments internes
        tl.to(['.preloader-content'], {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.in",
        }, "+=0.2");

        // Glissement vers le haut de l'écran (Effet Rideau)
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut"
        });

        return () => {
            tl.kill();
            pulseAnim.kill();
        };
    }, [onLoaded]);

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