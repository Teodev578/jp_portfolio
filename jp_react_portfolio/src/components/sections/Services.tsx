import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import serviceMockup from '../../assets/service_mockup.jpeg';

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
    const { t } = useLanguage();
    const lenis = useLenis();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        lenis?.scrollTo(target);
    };

    const services = [
        { id: '1', title: t('service_1_title'), desc: t('service_1_desc') },
        { id: '2', title: t('service_2_title'), desc: t('service_2_desc') },
        { id: '3', title: t('service_3_title'), desc: t('service_3_desc') },
        { id: '4', title: t('service_4_title'), desc: t('service_4_desc') },
    ];

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 992px)", () => {
            // Animation du titre
            gsap.from('.services-main-title', {
                scrollTrigger: {
                    trigger: '.services-main-title',
                    start: 'top 80%',
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out'
            });

            // Animation de l'image (parallaxe léger)
            gsap.to('.services-image-wrapper img', {
                scrollTrigger: {
                    trigger: '#services',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: 50,
                ease: 'none'
            });

            // Animation des items de service
            gsap.from('.service-item', {
                scrollTrigger: {
                    trigger: '.services-list',
                    start: 'top 70%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
        });

        // Animation mobile simplifiée
        mm.add("(max-width: 991px)", () => {
            gsap.from('.service-item', {
                scrollTrigger: {
                    trigger: '.services-list',
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
        });

    }, { scope: containerRef });

    return (
        <section id="services" className="services-new" ref={containerRef}>
            <div className="services-container-new">

                <h2 className="services-main-title">{t('services_title')}</h2>

                <div className="services-image-wrapper">
                    <img src={serviceMockup} alt="Prestation de préparation automobile premium" />
                    <div className="image-overlay-text">Detailing Excellence</div>
                </div>

                <div className="services-list">
                    {services.map((service) => (
                        <div key={service.id} className="service-item group">
                            <div className="service-number font-serif">0{service.id}</div>
                            <div className="service-content">
                                <h3 className="group-hover:text-accent transition-colors duration-300">
                                    {service.title}
                                    <span className="arrow">→</span>
                                </h3>
                                <p>{service.desc}</p>
                            </div>
                        </div>
                    ))}

                    <a href="#about" className="about-me-link group" onClick={(e) => handleScroll(e, '#about')}>
                        <span className="link-text">{t('services_scroll_about')}</span>
                        <span className="link-underline"></span>
                    </a>
                </div>

            </div>
        </section>
    );
};