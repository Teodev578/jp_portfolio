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
        if (lenis) {
            e.preventDefault();
            lenis.scrollTo(target);
        }
    };

    useGSAP(() => {
        if (!container.current) return;

        const tl = gsap.timeline({ delay: 0.1 });

        tl.fromTo('.hero-kicker',
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        )
            .fromTo('.title-mask',
                { yPercent: 100 },
                { yPercent: 0, duration: 1.2, ease: 'expo.out' },
                "-=0.7"
            )
            .fromTo('.hero-image-wrapper',
                { clipPath: 'inset(100% 0% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' },
                "-=1"
            )
            .fromTo('.hero-image',
                { scale: 1.3 },
                { scale: 1, duration: 1.5, ease: 'expo.inOut' },
                "<"
            )
            .fromTo('.hero-animate-text',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
                "-=0.8"
            );

        gsap.to('.hero-image', {
            yPercent: 15,
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
                        {/* ROBUSTESSE : Bouton modifié pour un lien externe sécurisé */}
                        <a
                            href="https://www.instagram.com/lepreparateur01/?utm_source=qr&r=nametag"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-btn-primary"
                        >
                            {t('hero_insta_btn')} <span className="arrow-external">↗</span>
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
                            loading="eager" /* Eager est parfait ici car c'est la 1ère image du site */
                        />
                        <div className="image-overlay"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};