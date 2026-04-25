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

    const services = [
        { id: '1', title: t('service_1_title'), desc: t('service_1_desc'), img: presta1 },
        { id: '2', title: t('service_2_title'), desc: t('service_2_desc'), img: presta2 },
        { id: '3', title: t('service_3_title'), desc: t('service_3_desc'), img: presta3 },
        { id: '4', title: t('service_4_title'), desc: t('service_4_desc'), img: presta4 },
    ];

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 992px)", () => {
            gsap.from('.services-main-title', {
                scrollTrigger: { trigger: '.services-section', start: 'top 80%' },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.service-item', {
                scrollTrigger: { trigger: '.services-list', start: 'top 75%' },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
        });

        mm.add("(max-width: 991px)", () => {
            gsap.from('.service-item', {
                scrollTrigger: { trigger: '.services-list', start: 'top 85%' },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
        });

    }, { scope: containerRef });

    return (
        <section id="services" className="services-section" ref={containerRef}>
            <div className="container">

                <h2 className="services-main-title">{t('services_title')}</h2>

                <div className="services-layout">

                    {/* COLONNE GAUCHE : Images Fixes (PC uniquement) */}
                    <div className="services-visuals">
                        <div className="sticky-wrapper">
                            {services.map((service, index) => (
                                <img
                                    key={`img-${service.id}`}
                                    src={service.img}
                                    alt={service.title}
                                    className={activeImage === index ? 'active' : ''}
                                />
                            ))}
                            <div className="visual-overlay">
                                <span>Detailing Excellence</span>
                            </div>
                        </div>
                    </div>

                    {/* COLONNE DROITE : Liste (Scroll) */}
                    <div className="services-content">
                        <div className="services-list">
                            {services.map((service, index) => (
                                <div
                                    key={service.id}
                                    className="service-item"
                                    onMouseEnter={() => setActiveImage(index)}
                                >
                                    <div className="service-number">0{service.id}</div>

                                    <div className="service-text">
                                        <h3>
                                            {service.title}
                                            <span className="arrow">→</span>
                                        </h3>
                                        <p>{service.desc}</p>
                                    </div>

                                    {/* Image visible uniquement sur mobile */}
                                    <div className="service-mobile-img">
                                        <img src={service.img} alt={service.title} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Lien About Me */}
                        <div className="services-footer">
                            <a href="#about" className="about-link" onClick={(e) => handleScroll(e, '#about')}>
                                {t('services_scroll_about')} <span className="arrow-down">↓</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};