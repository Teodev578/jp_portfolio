import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

// Import des images de prestation
import presta1 from '../../assets/presta/presta_4.jpeg';
import presta2 from '../../assets/presta/presta_1.jpeg';
import presta3 from '../../assets/presta/presta_5.jpeg';
import presta4 from '../../assets/presta/presta_6.jpeg';

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
    const { t } = useLanguage();
    const lenis = useLenis();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState(0);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        lenis?.scrollTo(target);
    };

    // Nettoie le symbole '>' pour l'accessibilité (balises alt)
    const cleanTitle = (title: string) => title.replace(/^>\s*/, '');

    const services = [
        { id: '1', title: t('service_1_title'), desc: t('service_1_desc'), img: presta1 },
        { id: '2', title: t('service_2_title'), desc: t('service_2_desc'), img: presta2 },
        { id: '3', title: t('service_3_title'), desc: t('service_3_desc'), img: presta3 },
        { id: '4', title: t('service_4_title'), desc: t('service_4_desc'), img: presta4 },
    ];

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // --- ANIMATION DESKTOP (PC) ---
        mm.add("(min-width: 992px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.services-section',
                    start: 'top 75%', // Se déclenche quand la section est bien visible
                    once: true
                }
            });

            // 1. Mask Reveal du Titre
            tl.fromTo('.title-mask-service',
                { yPercent: 100 },
                { yPercent: 0, duration: 1, ease: 'expo.out' }
            )
                // 2. Dévoilement du conteneur d'image (Clip Path)
                .fromTo('.sticky-wrapper',
                    { clipPath: 'inset(100% 0% 0% 0%)' },
                    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' },
                    "-=0.6"
                )
                // 3. Apparition en cascade de la liste des services
                .fromTo('.service-item',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
                    "-=0.8"
                )
                // 4. Apparition du lien footer
                .fromTo('.services-footer',
                    { opacity: 0 },
                    { opacity: 1, duration: 1, ease: 'power2.out' },
                    "-=0.4"
                );

            // Sync de l'image active au scroll (Indépendant de l'apparition)
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
                    trigger: '.services-section',
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

                {/* Ajout du conteneur Overflow Hidden pour le Titre */}
                <h2 className="services-main-title">
                    <span className="title-mask-service block">
                        {t('services_title')}
                    </span>
                </h2>

                <div className="services-layout">

                    {/* COLONNE GAUCHE (Image) */}
                    <div className="services-visuals">
                        <div className="sticky-wrapper">
                            {services.map((service, index) => (
                                <img
                                    key={`desktop-img-${service.id}`}
                                    src={service.img}
                                    alt={cleanTitle(service.title)}
                                    className={activeImage === index ? 'active' : ''}
                                />
                            ))}
                            <div className="visual-overlay">
                                <span>Detailing Excellence</span>
                            </div>
                        </div>
                    </div>

                    {/* COLONNE DROITE (Liste) */}
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

                                    {/* Image Mobile */}
                                    <div className="service-mobile-img">
                                        <img src={service.img} alt={cleanTitle(service.title)} loading="lazy" />
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