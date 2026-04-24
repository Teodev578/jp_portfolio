import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import portraitAbout from '../../assets/portrait-3.avif';

export const About = () => {
    const { t, tHtml } = useLanguage();
    const lenis = useLenis();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        lenis?.scrollTo(target);
    };

    return (
        <section id="about" className="about-section">
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