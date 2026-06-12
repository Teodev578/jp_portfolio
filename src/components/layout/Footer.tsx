import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import logoJP from '../../assets/logo_jp.avif';

interface FooterProps {
    onOpenLegal: (type: 'legal' | 'privacy') => void;
}

export const Footer = ({ onOpenLegal }: FooterProps) => {
    const { t } = useLanguage();
    const lenis = useLenis();

    const handleScrollTo = (e: React.MouseEvent, target: string) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(target, { offset: -70 });
        } else {
            const el = document.querySelector(target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleBackToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const currentYear = new Date().getFullYear();
    const copyrightText = t('footer_copyright').replace('{year}', String(currentYear));

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    
                    {/* Colonne 1 : Branding */}
                    <div className="footer-brand-col">
                        <div className="footer-logo">
                            <img src={logoJP} alt="Le Préparateur Logo" />
                            <span>{t('footer_brand')}</span>
                        </div>
                        <p className="footer-tagline">
                            {t('footer_tagline')}
                        </p>
                    </div>

                    {/* Colonne 2 : Navigation */}
                    <div className="footer-links-col">
                        <h4 className="footer-col-title">{t('footer_nav_title')}</h4>
                        <ul className="footer-links-list">
                            <li className="footer-link-item">
                                <a href="#accueil" onClick={(e) => handleScrollTo(e, '#accueil')}>{t('nav_home')}</a>
                            </li>
                            <li className="footer-link-item">
                                <a href="#services" onClick={(e) => handleScrollTo(e, '#services')}>{t('nav_services')}</a>
                            </li>
                            <li className="footer-link-item">
                                <a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>{t('nav_about')}</a>
                            </li>
                            <li className="footer-link-item">
                                <a href="#projets" onClick={(e) => handleScrollTo(e, '#projets')}>{t('nav_projects')}</a>
                            </li>
                            <li className="footer-link-item">
                                <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>{t('nav_contact')}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Légal */}
                    <div className="footer-links-col">
                        <h4 className="footer-col-title">{t('footer_legal_title')}</h4>
                        <ul className="footer-links-list">
                            <li className="footer-link-item">
                                <button type="button" onClick={() => onOpenLegal('legal')}>
                                    {t('footer_legal_notice')}
                                </button>
                            </li>
                            <li className="footer-link-item">
                                <button type="button" onClick={() => onOpenLegal('privacy')}>
                                    {t('footer_privacy_policy')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4 : Réseaux */}
                    <div className="footer-links-col">
                        <h4 className="footer-col-title">{t('footer_socials_title')}</h4>
                        <ul className="footer-links-list">
                            <li className="footer-link-item">
                                <a href="https://www.instagram.com/lepreparateur01/?utm_source=qr&r=nametag" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>
                            </li>
                            <li className="footer-link-item">
                                <a href="https://wa.me/33759211588" target="_blank" rel="noopener noreferrer">
                                    WhatsApp
                                </a>
                            </li>
                            <li className="footer-link-item">
                                <a href="mailto:lepreparateur01@gmail.com">
                                    Email
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Rangée inférieure : Copyright & Retour en haut */}
                <div className="footer-bottom">
                    <div className="footer-credits">
                        <p className="footer-copyright">
                            {copyrightText}
                        </p>
                        <p className="footer-copyright" style={{ opacity: 0.5 }}>
                            {t('footer_developed_by')}
                        </p>
                    </div>
                    <button 
                        type="button" 
                        className="back-to-top-btn" 
                        onClick={handleBackToTop}
                        aria-label={t('footer_back_to_top')}
                    >
                        {t('footer_back_to_top').split(' ↑')[0]} <span>↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};
