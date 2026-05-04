import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLenis } from 'lenis/react';
import logoJP from '../../assets/logo_jp.avif';

export const Header = () => {
    const { lang, setLang, t } = useLanguage();
    const { isDarkMode, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('accueil'); // État pour la section active

    const lenis = useLenis(({ scroll }) => {
        setIsScrolled(scroll > 50);
    });

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        document.body.style.overflow = '';

        // On met à jour visuellement la section tout de suite pour l'utilisateur
        setActiveSection(target.replace('#', ''));

        if (lenis) {
            lenis.scrollTo(target, { offset: -70 });
        } else {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
    };

    // 1. IntersectionObserver pour les sections
    useEffect(() => {
        // 💡 L'OBSERVATEUR DE SECTIONS
        const sections = document.querySelectorAll('section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            threshold: 0,
            rootMargin: "-25% 0px -65% 0px"
        });

        sections.forEach(section => {
            if (section.id) observer.observe(section);
        });

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    // Helper pour savoir si le lien est actif
    const isLinkActive = (id: string) => activeSection === id ? 'active' : '';

    return (
        <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'menu-is-open' : ''}`}>
            <div className="container header-container">

                <a href="#accueil" className="header-logo" onClick={(e) => handleLinkClick(e, '#accueil')}>
                    <img src={logoJP} alt="Le Préparateur Logo" />
                    <span>Jean-Pierre AGBO</span>
                </a>

                <nav className={`header-nav ${isMenuOpen ? 'is-active' : ''}`}>
                    <ul className="nav-list">
                        <li><a href="#accueil" className={isLinkActive('accueil')} onClick={(e) => handleLinkClick(e, '#accueil')}>{t('nav_home')}</a></li>
                        <li><a href="#services" className={isLinkActive('services')} onClick={(e) => handleLinkClick(e, '#services')}>{t('nav_services')}</a></li>
                        <li><a href="#about" className={isLinkActive('about')} onClick={(e) => handleLinkClick(e, '#about')}>{t('nav_about')}</a></li>
                        <li><a href="#projets" className={isLinkActive('projets')} onClick={(e) => handleLinkClick(e, '#projets')}>{t('nav_projects')}</a></li>
                        <li><a href="#contact" className={isLinkActive('contact')} onClick={(e) => handleLinkClick(e, '#contact')}>{t('nav_contact')}</a></li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <div className="lang-switcher">
                        <button className={lang === 'fr' ? 'active' : ''} onClick={() => setLang('fr')}>FR</button>
                        <span className="lang-separator">/</span>
                        <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
                    </div>

                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer le thème">
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>

                    <button className={`burger-menu ${isMenuOpen ? 'is-active' : ''}`} onClick={toggleMenu} aria-label="Menu">
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                    </button>
                </div>

            </div>
        </header>
    );
};