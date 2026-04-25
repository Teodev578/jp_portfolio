import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

// Import des images de prestation
import presta1 from '../../assets/presta/presta_1.jpeg';
import presta2 from '../../assets/presta/presta_2.jpeg';
import presta3 from '../../assets/presta/presta_3.jpeg';
import presta4 from '../../assets/presta/presta_4.jpeg';

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

        // Animation Desktop (min-width: 992px)
        mm.add("(min-width: 992px)", () => {
            // Titre Principal
            gsap.from('.services-main-title', {
                scrollTrigger: { 
                    trigger: '.services-main-title', 
                    start: 'top 90%',
                    once: true 
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            // Items Individuels pour un meilleur contrôle au scroll
            const items = gsap.utils.toArray<HTMLElement>('.service-item');
            items.forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                        once: true
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });

                // Sync de l'image active au scroll sur Desktop
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

        // Animation Mobile (max-width: 991px)
        mm.add("(max-width: 991px)", () => {
            gsap.from('.services-main-title', {
                scrollTrigger: { 
                    trigger: '.services-main-title', 
                    start: 'top 90%',
                    once: true 
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });

            const items = gsap.utils.toArray<HTMLElement>('.service-item');
            items.forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: { 
                        trigger: item, 
                        start: 'top 90%',
                        once: true 
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });
        });

    }, { scope: containerRef });

    return (
        <section id="services" className="services-section" ref={containerRef}>
            <div className="container">

                <h2 className="services-main-title">{t('services_title')}</h2>

                <div className="services-layout">

                    {/* COLONNE GAUCHE : Caches sur mobile via CSS, affichés sur Desktop */}
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

                    {/* COLONNE DROITE : Liste affichée en 1ère sur Mobile */}
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

                                    {/* Image de la carte : affichée sur mobile, cachée sur Desktop */}
                                    <div className="service-mobile-img">
                                        <img src={service.img} alt={cleanTitle(service.title)} loading="lazy" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Lien Éditorial */}
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