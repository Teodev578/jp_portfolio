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
            <div className="hero-content-wrapper">
                <div className="hero-header-box">
                    <h1 className="main-headline">{t('hero_headline')}</h1>
                </div>

                <div className="hero-sub-intro">
                    <p dangerouslySetInnerHTML={tHtml('hero_sub_intro')} />
                </div>

                <div className="hero-visual">
                    <div className="image-wrapper">
                        <img src={portraitImg} alt="Portrait de Jean-Pierre Agbo" />
                    </div>
                </div>

                <div className="hero-description">
                    <p dangerouslySetInnerHTML={tHtml('hero_description')} />
                </div>

                <div className="hero-actions">
                    <a href="#about" className="hero-link" onClick={(e) => handleScroll(e, '#about')}>
                        <span>{t('hero_learn_more')}</span>
                    </a>
                    <a href="#contact" className="hero-link" onClick={(e) => handleScroll(e, '#contact')}>
                        <span>{t('hero_contact_btn')}</span>
                    </a>
                </div>
            </div>
        </section>
    );
};