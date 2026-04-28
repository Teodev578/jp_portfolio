import React, { useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. IMPORTE TES IMAGES AVANT / APRÈS ICI :
// Pour le Service 1 (Nettoyage Premium)
import imgS1Avant from '../../assets/before_after/before_1.jpeg';
import imgS1Apres from '../../assets/before_after/after_1.jpeg';

// Pour le Service 2 (Esthétique Auto / Polissage)
import imgS2Avant from '../../assets/before_after/before_2.jpeg';
import imgS2Apres from '../../assets/before_after/after_2.jpeg';

// Pour le Service 3 (Préparation Livraison)
import imgS3Avant from '../../assets/before_after/before_3.jpeg';
import imgS3Apres from '../../assets/before_after/after_3.jpeg';

// Pour le Service 4 (Traitement Céramique / Conseil)
// TODO: Ajouter after_4.jpeg et before_4.jpeg dans src/assets/before_after/
import imgS4Avant from '../../assets/before_after/after_1.jpeg';
import imgS4Apres from '../../assets/before_after/before_1.jpeg';

gsap.registerPlugin(ScrollTrigger);

// ========================================================
// COMPOSANT SLIDER AVANT/APRÈS
// ========================================================
const BeforeAfterImage = ({ before, after, alt, className = "relative" }: { before: string, after: string, alt: string, className?: string }) => {
    const [sliderPos, setSliderPos] = useState(50);

    return (
        <div className={`w-full h-full overflow-hidden select-none group ${className}`}>
            {/* Image APRÈS (Fond) */}
            <img
                src={after}
                alt={`${alt} Après`}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Image AVANT (Découpée par le clip-path) */}
            <img
                src={before}
                alt={`${alt} Avant`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            />

            {/* Input Range invisible pour le contrôle (tactile & souris) */}
            <input
                type="range"
                min="0" max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0 p-0"
            />

            {/* Ligne visuelle du slider */}
            <div
                className="absolute top-0 bottom-0 w-[2px] bg-white z-10 pointer-events-none transition-transform duration-75"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
                {/* Bouton central du slider */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l6-6-6-6M9 18l-6-6 6-6" />
                    </svg>
                </div>
            </div>

            {/* Badges Texte */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs uppercase tracking-wider rounded-sm pointer-events-none">Avant</div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs uppercase tracking-wider rounded-sm pointer-events-none">Après</div>
        </div>
    );
};

// ========================================================
// SECTION SERVICES PRINCIPALE
// ========================================================
export const Services = () => {
    const { t } = useLanguage();
    const lenis = useLenis();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState(0);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        lenis?.scrollTo(target);
    };

    const cleanTitle = (title: string) => title.replace(/^>\s*/, '');

    // 2. CONFIGURE TON TABLEAU AVEC imgBefore ET imgAfter
    const services = [
        {
            id: '1',
            title: t('service_1_title'),
            desc: t('service_1_desc'),
            imgBefore: imgS1Avant,   // <-- Image AVANT
            imgAfter: imgS1Apres     // <-- Image APRÈS
        },
        {
            id: '2',
            title: t('service_2_title'),
            desc: t('service_2_desc'),
            imgBefore: imgS2Avant,
            imgAfter: imgS2Apres
        },
        {
            id: '3',
            title: t('service_3_title'),
            desc: t('service_3_desc'),
            imgBefore: imgS3Avant,
            imgAfter: imgS3Apres
        },
        {
            id: '4',
            title: t('service_4_title'),
            desc: t('service_4_desc'),
            imgBefore: imgS4Avant,
            imgAfter: imgS4Apres
        },
    ];

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // --- ANIMATION DESKTOP ---
        mm.add("(min-width: 992px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    once: true
                }
            });

            tl.fromTo('.title-mask-service',
                { yPercent: 100 },
                { yPercent: 0, duration: 1, ease: 'expo.out' }
            )
                .fromTo('.sticky-wrapper',
                    { clipPath: 'inset(100% 0% 0% 0%)' },
                    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' },
                    "-=0.6"
                )
                .fromTo('.service-item',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
                    "-=0.8"
                )
                .fromTo('.services-footer',
                    { opacity: 0 },
                    { opacity: 1, duration: 1, ease: 'power2.out' },
                    "-=0.4"
                );

            // Synchronisation du Slider Actif au Scroll
            const items = gsap.utils.toArray<HTMLElement>('.service-item');
            items.forEach((item) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top 50%',
                    end: 'bottom 50%',
                    onToggle: self => {
                        if (self.isActive) {
                            const index = items.indexOf(item);
                            setActiveImage(index);
                        }
                    }
                });
            });
        });

        // --- ANIMATION MOBILE ---
        mm.add("(max-width: 991px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    once: true
                }
            });

            tl.fromTo('.title-mask-service',
                { yPercent: 100 },
                { yPercent: 0, duration: 1, ease: 'expo.out' }
            )
                .fromTo('.service-item',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
                    "-=0.6"
                )
                .fromTo('.services-footer',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.8 },
                    "-=0.4"
                );
        });

    }, { scope: containerRef });

    return (
        <section id="services" className="services-section" ref={containerRef}>
            <div className="container">

                <h2 className="services-main-title">
                    <span className="title-mask-service block">
                        {t('services_title')}
                    </span>
                </h2>

                <div className="services-layout">

                    {/* COLONNE GAUCHE : SLIDER FIXE (PC) */}
                    <div className="services-visuals">
                        <div className="sticky-wrapper">
                            {services.map((service, index) => (
                                <BeforeAfterImage
                                    key={`desktop-slider-${service.id}`}
                                    before={service.imgBefore}
                                    after={service.imgAfter}
                                    alt={cleanTitle(service.title)}
                                    // La classe ci-dessous gère l'apparition en fondu quand on scrolle sur la liste
                                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeImage === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* COLONNE DROITE : LISTE DES SERVICES */}
                    <div className="services-content">
                        <div className="services-list group-list">
                            {services.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`service-item ${activeImage === index ? 'is-active' : ''}`}
                                    onMouseEnter={() => setActiveImage(index)}
                                >
                                    <div className="service-text">
                                        <h3>
                                            {service.title.startsWith('>') ? (
                                                <>
                                                    <span className="service-symbol" aria-hidden="true">{'>'}</span>
                                                    {service.title.substring(1)}
                                                </>
                                            ) : (
                                                service.title
                                            )}
                                        </h3>
                                        <p>{service.desc}</p>
                                    </div>

                                    {/* SLIDER MOBILE (Intégré dans la carte) */}
                                    <div className="service-mobile-img relative">
                                        <BeforeAfterImage
                                            before={service.imgBefore}
                                            after={service.imgAfter}
                                            alt={cleanTitle(service.title)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="services-footer">
                            <a href="#about" className="editorial-link" onClick={(e) => handleScroll(e, '#about')}>
                                {t('services_scroll_about')}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};