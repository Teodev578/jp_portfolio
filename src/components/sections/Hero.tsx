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

        // 1. Titre (Apparition indépendante prioritaire)
        gsap.fromTo('.hero-title',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
        );

        const tl = gsap.timeline({ delay: 0.2 });

        // 2. Image (Apparition fluide)
        tl.fromTo('.hero-image-wrapper',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }
        )
            // 3. Textes restants
            .fromTo('.hero-animate-text',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
                "-=0.6"
            );

        // 4. Parallaxe de l'image au scroll
        gsap.to('.hero-image', {
            yPercent: 10,
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
                    <div className="hero-kicker font-mono hero-animate-text">
                        // Detailing Studio
                    </div>

                    <h1 className="hero-title">
                        {t('hero_headline') || 'LE PRÉPARATEUR'}
                    </h1>

                    <div className="hero-text-block hero-animate-text">
                        <div className="hero-sub-intro" dangerouslySetInnerHTML={tHtml('hero_sub_intro')} />
                        <div className="hero-description" dangerouslySetInnerHTML={tHtml('hero_description')} />
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

                {/* COLONNE IMAGE (Passe en haut sur mobile grâce à 'order: -1' dans le CSS) */}
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