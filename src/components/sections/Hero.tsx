import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import portraitImg from '../../assets/portrait_nb.jpeg';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const { t, tHtml } = useLanguage();
    const lenis = useLenis();
    const container = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        lenis?.scrollTo(target);
    };

    useGSAP(() => {
        if (!container.current) return;

        // Configuration d'une timeline globale (Chorégraphie)
        const tl = gsap.timeline({ delay: 0.1 });

        // 1. Le "Kicker" (// Detailing Studio) glisse doucement depuis la gauche
        tl.fromTo('.hero-kicker',
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        )

            // 2. "Mask Reveal" du grand Titre (Surgit de sa propre boîte)
            .fromTo('.title-mask',
                { yPercent: 100 }, // Commence caché en bas
                { yPercent: 0, duration: 1.2, ease: 'expo.out' }, // Remonte d'un coup avec un freinage doux
                "-=0.7" // Démarre en même temps que la fin du kicker
            )

            // 3. Dévoilement de l'image (Clip Path + Dézoom simultané = Effet Cinéma)
            .fromTo('.hero-image-wrapper',
                { clipPath: 'inset(100% 0% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' },
                "-=1"
            )
            .fromTo('.hero-image',
                { scale: 1.3 }, // L'image est zoomée au départ
                { scale: 1, duration: 1.5, ease: 'expo.inOut' },
                "<" // "<" signifie "Joue exactement en même temps que l'animation précédente"
            )

            // 4. Apparition des textes et boutons en cascade
            .fromTo('.hero-animate-text',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
                "-=0.8"
            );

        // 5. Parallaxe de l'image au scroll (Indépendant de la timeline d'apparition)
        gsap.to('.hero-image', {
            yPercent: 15, // Un peu plus de mouvement pour contraster avec le cadre fixe
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

    }, { scope: container });

    return (
        <section id="accueil" className="hero-section" ref={container}>
            <div className="container hero-grid">

                {/* COLONNE TEXTE */}
                <div className="hero-content">
                    <div className="hero-kicker font-mono">
                        // Detailing Studio
                    </div>

                    {/* Modification HTML : Ajout du conteneur de masque */}
                    <h1 className="hero-title">
                        <span className="title-mask block">
                            {t('hero_headline') || 'LE PRÉPARATEUR'}
                        </span>
                    </h1>

                    <div className="hero-text-block">
                        <div className="hero-sub-intro hero-animate-text" dangerouslySetInnerHTML={tHtml('hero_sub_intro')} />
                        <div className="hero-description hero-animate-text" dangerouslySetInnerHTML={tHtml('hero_description')} />
                    </div>

                    <div className="hero-actions hero-animate-text">
                        <a href="#about" className="hero-btn-primary" onClick={(e) => handleScroll(e, '#about')}>
                            {t('hero_learn_more')} <span className="arrow">↓</span>
                        </a>
                        <a href="#contact" className="hero-link-editorial" onClick={(e) => handleScroll(e, '#contact')}>
                            {t('hero_contact_btn')}
                        </a>
                    </div>
                </div>

                {/* COLONNE IMAGE */}
                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <img
                            src={portraitImg}
                            alt="Portrait de Jean-Pierre Agbo"
                            className="hero-image"
                            loading="eager"
                        />
                        <div className="image-overlay"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};