import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imgConseil from '../../assets/Conseil/2.jpeg';

// Images Nettoyage Premium
//import net1 from '../../assets/nettoyage/IMG-20260409-WA0035.jpg';
import net1 from '../../assets/nettoyage/1.jpg';
import net2 from '../../assets/nettoyage/2.jpg';
import net3 from '../../assets/nettoyage/3.jpg';
import net4 from '../../assets/nettoyage/4.jpg';
import net5 from '../../assets/nettoyage/5.jpg';

// Images Esthétique Auto
import est1 from '../../assets/esthetique/1.jpg';
import est2 from '../../assets/esthetique/2.avif';
import est3 from '../../assets/esthetique/3.jpg';

// Images Préparation Livraison
import prep1 from '../../assets/preparation/1.jpg';
import prep2 from '../../assets/preparation/2.avif';
import prep3 from '../../assets/preparation/3.jpeg';

gsap.registerPlugin(ScrollTrigger);

// ========================================================
// 1. COMPOSANT : SLIDER AVANT/APRÈS
// ========================================================
const BeforeAfterImage = ({ before, after, alt }: { before: string, after: string, alt: string }) => {
    const [sliderPos, setSliderPos] = useState(50);
    return (
        <div className="w-full h-full overflow-hidden select-none relative group">
            <img src={after} alt={`${alt} Après`} className="absolute inset-0 w-full h-full object-cover" />
            <img
                src={before}
                alt={`${alt} Avant`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            />
            <input
                type="range" min="0" max="100" value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0 p-0"
            />
            <div
                className="absolute top-0 bottom-0 w-[2px] bg-white z-10 pointer-events-none transition-transform duration-75"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l6-6-6-6M9 18l-6-6 6-6" />
                    </svg>
                </div>
            </div>
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-[0.65rem] md:text-xs uppercase tracking-wider rounded-sm pointer-events-none">Avant</div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-[0.65rem] md:text-xs uppercase tracking-wider rounded-sm pointer-events-none">Après</div>
        </div>
    );
};

// ========================================================
// 2. COMPOSANT : DIAPORAMA
// ========================================================
const Slideshow = ({ images, alt }: { images: string[], alt: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="w-full h-full relative overflow-hidden">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`${alt} vue ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

// ========================================================
// 3. COMPOSANT : IMAGE SIMPLE
// ========================================================
const SimpleImage = ({ src, alt }: { src: string, alt: string }) => (
    <div className="w-full h-full overflow-hidden relative">
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    </div>
);


// ========================================================
// SECTION SERVICES PRINCIPALE
// ========================================================
export const Services = () => {
    const { t } = useLanguage();
    const lenis = useLenis();
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState(0);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        lenis?.scrollTo(target);
    };

    const cleanTitle = (title: string) => title.replace(/^>\s*/, '');

    const services = [
        {
            id: '1',
            title: t('service_1_title'),
            desc: t('service_1_desc'),
            media: {
                type: 'slideshow',
                images: [net1, net2, net3, net4, net5]
            }
        },
        {
            id: '2',
            title: t('service_2_title'),
            desc: t('service_2_desc'),
            media: {
                type: 'slideshow',
                images: [est1, est2, est3]
            }
        },
        {
            id: '3',
            title: t('service_3_title'),
            desc: t('service_3_desc'),
            media: {
                type: 'slideshow',
                images: [prep1, prep2, prep3]
            }
        },
        {
            id: '4',
            title: t('service_4_title'),
            desc: t('service_4_desc'),
            media: { type: 'image', src: imgConseil }
        },
    ];

    const renderMedia = (media: any, title: string) => {
        if (media.type === 'before-after') return <BeforeAfterImage before={media.before} after={media.after} alt={cleanTitle(title)} />;
        if (media.type === 'slideshow') return <Slideshow images={media.images} alt={cleanTitle(title)} />;
        if (media.type === 'image') return <SimpleImage src={media.src} alt={cleanTitle(title)} />;
        return null;
    };

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 992px)", () => {
            // 1. Apparition des éléments
            const tl = gsap.timeline({
                scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true }
            });

            tl.fromTo('.services-main-title .title-mask-service',
                { yPercent: 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out' }
            )
                .fromTo('.sticky-wrapper', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, "-=0.6")
                .fromTo('.service-item', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, "-=0.8")
                .fromTo('.services-footer', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' }, "-=0.4");

            // 2. Logique de défilement (ScrollTrigger) pour changer l'image active
            if (!listRef.current) return;
            const items = gsap.utils.toArray<HTMLElement>('.service-item', listRef.current);

            items.forEach((item, index) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: "top center", // Quand le HAUT de l'item touche le CENTRE de l'écran
                    end: "bottom center", // Quand le BAS de l'item quitte le CENTRE de l'écran
                    onToggle: self => {
                        if (self.isActive) {
                            setActiveImage(index);
                        }
                    }
                });
            });
        });

        mm.add("(max-width: 991px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true }
            });

            tl.fromTo('.services-main-title .title-mask-service',
                { yPercent: 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out' }
            )
                .fromTo('.service-item', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }, "-=0.6")
                .fromTo('.services-footer', { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.4");
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

                    {/* COLONNE GAUCHE : Visuels fixes (PC) */}
                    <div className="services-visuals">
                        {/* La classe sticky-wrapper gère le positionnement fixe (sticky) via CSS */}
                        <div className="sticky-wrapper">
                            {services.map((service, index) => (
                                // Chaque média est en absolute. L'opacité gère le fondu croisé
                                <div
                                    key={`desktop-media-${service.id}`}
                                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeImage === index ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
                                >
                                    {renderMedia(service.media, service.title)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLONNE DROITE : LISTE DES SERVICES */}
                    <div className="services-content">
                        <div className="services-list group-list" ref={listRef}>
                            {services.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`service-item ${activeImage === index ? 'is-active' : ''}`}
                                    onMouseEnter={() => window.innerWidth >= 992 && setActiveImage(index)}
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

                                    {/* MÉDIA MOBILE (Intégré dans la carte) */}
                                    <div className="service-mobile-img relative">
                                        {renderMedia(service.media, service.title)}
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