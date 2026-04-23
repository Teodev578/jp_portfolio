import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import portraitImg from '../../assets/portrait.avif';
import cvFr from '../../assets/CV-Fr-Fabien-Téo-KPEKPASSI.pdf';
import cvEn from '../../assets/CV-En-Fabien-Téo-KPEKPASSI.pdf';

export const Hero = () => {
    const { t, lang, tHtml } = useLanguage();
    const lenis = useLenis();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        lenis?.scrollTo(target);
    };

    const cvPath = lang === 'fr' ? cvFr : cvEn;

    return (
        <section id="accueil" className="hero">
            <div className="hero-content-grid">

                <div className="hero-main-content">
                    <div className="hero-text">
                        <h1 className="main-headline">{t('hero_headline')}</h1>
                        <p className="intro-text" dangerouslySetInnerHTML={tHtml('hero_intro')} />
                    </div>

                    <div className="hero-actions">
                        <a href="#contact" className="hero-link" onClick={(e) => handleScroll(e, '#contact')}>
                            <span>{t('hero_contact_btn')}</span>
                        </a>
                        <a href={cvPath} download className="hero-link" id="cv-download-link" target="_blank">
                            <span>{t('hero_cv_btn')}</span>
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="image-wrapper">
                        <img src={portraitImg} alt="Portrait de Fabien Téo KPEKPASSi" />
                    </div>
                    <div className="visual-caption">
                        <span className="caption-name">Fabien Téo KPEKPASSi</span>
                        <a href="#services" className="scroll-down-link" onClick={(e) => handleScroll(e, '#services')}>{t('hero_scroll_services')}</a>
                    </div>
                </div>
            </div>
        </section>
    );
};