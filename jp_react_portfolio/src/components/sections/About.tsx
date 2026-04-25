import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import portraitAbout from '../../assets/a_propos.jpeg';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
    const { t, tHtml } = useLanguage();
    const lenis = useLenis();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        lenis?.scrollTo(target);
    };

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 992px)", () => {
            // Animation de l'image (parallaxe léger)
            gsap.to('.about-image-wrapper img', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: 100,
                ease: 'none'
            });

            // Animation du contenu
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                }
            });

            tl.from('.about-name', { y: 50, opacity: 0, duration: 1, ease: 'power4.out' })
                .from('.about-subtitle', { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
                .from('.about-description', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
                .from('.about-detail-item', { y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.4')
                .from('.about-projects-link', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
        });

        mm.add("(max-width: 991px)", () => {
            gsap.from(['.about-name', '.about-subtitle', '.about-description', '.about-detail-item'], {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });
        });

    }, { scope: containerRef });

    return (
        <section id="about" className="about-section" ref={containerRef}>
            <div className="about-container">

                <div className="about-image-wrapper">
                    <img src={portraitAbout} alt="Photo de Jean-Pierre AGBO - Le Préparateur" />
                </div>

                <div className="about-content-scroll">
                    <div className="about-intro">
                        <h2 className="about-name">Le Préparateur</h2>
                        <p className="about-subtitle">{t('about_subtitle')}</p>
                        <p className="about-description" dangerouslySetInnerHTML={tHtml('about_description')}></p>
                    </div>

                    <div className="about-details-grid">

                        <article className="about-detail-item">
                            <h3 className="detail-title">{t('about_study_title')}</h3>
                            <div className="detail-content" dangerouslySetInnerHTML={tHtml('about_study_content')}></div>
                        </article>

                        <article className="about-detail-item">
                            <h3 className="detail-title">{t('about_skills_title')}</h3>
                            <div className="detail-content" dangerouslySetInnerHTML={tHtml('about_skills_content')}></div>
                        </article>

                        <article className="about-detail-item">
                            <h3 className="detail-title">{t('about_exp_title')}</h3>
                            <div className="detail-content">
                                <p dangerouslySetInnerHTML={tHtml('about_academic_exp_title')}></p>
                                <div dangerouslySetInnerHTML={tHtml('about_academic_exp_list')}></div>
                                <br />
                                <p dangerouslySetInnerHTML={tHtml('about_exp_content_title')}></p>
                                <div dangerouslySetInnerHTML={tHtml('about_exp_content_list')}></div>
                            </div>
                        </article>

                    </div>

                    <a href="#projets" className="about-projects-link" onClick={(e) => handleScroll(e, '#projets')}>{t('about_scroll_projects')}</a>
                </div>

            </div>
        </section>
    );
};