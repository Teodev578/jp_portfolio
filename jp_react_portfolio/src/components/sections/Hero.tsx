import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import portraitImg from '../../assets/portrait.jpeg';

export const Hero = () => {
    const { t, tHtml } = useLanguage();
    const lenis = useLenis();
    const container = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        lenis?.scrollTo(target);
    };

    /**
     * Splits a string into individual character spans for the stagger effect.
     * Preserves spaces using whitespace-pre.
     */
    const splitLetters = (text: string) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char inline-block whitespace-pre translate-y-full opacity-0">
                {char}
            </span>
        ));
    };

    useGSAP(() => {
        if (!container.current) return;

        // Configuration de la Timeline principale
        const tl = gsap.timeline({
            defaults: { ease: 'expo.out' }
        });

        // 1. Hero Reveal : Titre 'LEPREPARATEUR' en stagger ultra-rapide
        tl.to('.char', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.015, // Très rapide pour l'effet industriel
            ease: 'expo.out'
        });

        // 2. Image Entrance : Dévoilement par clip-path (effet rideau industriel)
        tl.fromTo('.image-wrapper',
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.4,
                ease: 'power4.inOut'
            },
            "-=0.6" // Chevauchement pour plus de fluidité
        );

        // 3. Text Split : Animation ligne par ligne (ou bloc par bloc ici pour préserver le HTML)
        // Note : Pour un vrai split par ligne complexe avec HTML, SplitText (plugin GSAP) est recommandé.
        // Ici on utilise un stagger sur les paragraphes pour une performance optimale.
        tl.fromTo(['.hero-sub-intro p', '.hero-description p'],
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out'
            },
            "-=0.8"
        );

        // 4. CTA Entrance : Apparition progressive des liens
        tl.fromTo('.hero-link',
            { y: 15, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            },
            "-=0.4"
        );

    }, { scope: container });

    return (
        <section id="accueil" className="hero" ref={container}>
            <div className="hero-content-wrapper">
                <div className="hero-header-box overflow-hidden">
                    <h1 className="main-headline">
                        {splitLetters(t('hero_headline'))}
                    </h1>
                </div>

                <div className="hero-sub-intro">
                    <p dangerouslySetInnerHTML={tHtml('hero_sub_intro')} />
                </div>

                <div className="hero-visual">
                    <div className="image-wrapper">
                        <img
                            src={portraitImg}
                            alt="Portrait de Jean-Pierre Agbo"
                            className="hero-image"
                        />
                    </div>
                </div>

                <div className="hero-description">
                    <p dangerouslySetInnerHTML={tHtml('hero_description')} />
                </div>

                <div className="hero-actions">
                    <a href="#about" className="hero-link group" onClick={(e) => handleScroll(e, '#about')}>
                        <span className="relative">
                            {t('hero_learn_more')}
                            {/* Underline fill animation */}
                            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-current scale-x-0 origin-left transition-transform duration-500 ease-expo group-hover:scale-x-100 group-hover:bg-[#DFFF00]"></span>
                        </span>
                    </a>
                    <a href="#contact" className="hero-link group" onClick={(e) => handleScroll(e, '#contact')}>
                        <span className="relative">
                            {t('hero_contact_btn')}
                            {/* Underline fill animation */}
                            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-current scale-x-0 origin-left transition-transform duration-500 ease-expo group-hover:scale-x-100 group-hover:bg-[#DFFF00]"></span>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};