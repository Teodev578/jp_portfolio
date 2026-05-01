import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import portraitAbout from '../../assets/about_1.jpg';

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
            // Animation d'apparition du contenu
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                }
            });

            tl.from('.about-subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
                .from('.about-name', { y: 40, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.6')
                .from('.about-description', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
                .from('.about-detail-item', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.4')
                .from('.about-projects-link', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
        });

        mm.add("(max-width: 991px)", () => {
            gsap.from(['.about-subtitle', '.about-name', '.about-description', '.about-detail-item'], {
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
            <div className="container">
                <div className="about-grid">

                    {/* COLONNE GAUCHE : Texte & Tableau de bord */}
                    <div className="about-content">
                        <div className="about-header">
                            <p className="about-subtitle">// {t('about_subtitle')}</p>
                            <h2 className="about-name">Le Préparateur</h2>
                        </div>

                        <div className="about-description" dangerouslySetInnerHTML={tHtml('about_description')}></div>

                        <div className="about-details-table">
                            <article className="about-detail-item">
                                <h3 className="detail-title">01 - {t('about_study_title')}</h3>
                                <div className="detail-content" dangerouslySetInnerHTML={tHtml('about_study_content')}></div>
                            </article>

                            <article className="about-detail-item">
                                <h3 className="detail-title">02 - {t('about_skills_title')}</h3>
                                <div className="detail-content" dangerouslySetInnerHTML={tHtml('about_skills_content')}></div>
                            </article>

                            <article className="about-detail-item">
                                <h3 className="detail-title">03 - {t('about_exp_title')}</h3>
                                <div className="detail-content detail-content-split">
                                    <div className="exp-block">
                                        <h4 dangerouslySetInnerHTML={tHtml('about_academic_exp_title')}></h4>
                                        <div dangerouslySetInnerHTML={tHtml('about_academic_exp_list')}></div>
                                    </div>
                                    <div className="exp-block">
                                        <h4 dangerouslySetInnerHTML={tHtml('about_exp_content_title')}></h4>
                                        <div dangerouslySetInnerHTML={tHtml('about_exp_content_list')}></div>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <a href="#projets" className="about-projects-link" onClick={(e) => handleScroll(e, '#projets')}>
                            {t('about_scroll_projects')} <span className="arrow-down">↓</span>
                        </a>
                    </div>

                    {/* COLONNE DROITE : Image Architecturale */}
                    <div className="about-visuals">
                        <div className="about-image-wrapper">
                            <img
                                src={portraitAbout}
                                alt="Photo de Jean-Pierre AGBO - Le Préparateur"
                                className="about-image"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};