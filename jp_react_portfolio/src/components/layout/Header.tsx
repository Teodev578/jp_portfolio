import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLenis } from 'lenis/react';
import logoTeo from '../../assets/logo-teo_compressed_final.png';

export const Header = () => {
    const { lang, setLang, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!headerRef.current) return;
        const rect = headerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        headerRef.current.style.setProperty('--mouse-x', `${x}px`);
    };

    // Gestion du scroll
    const lenis = useLenis(({ scroll }) => {
        setIsScrolled(scroll > 50);
    });

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        if (lenis) {
            lenis.scrollTo(target);
        } else {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Initialisation
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        // Au cas où lenis n'est pas encore initialisé
        window.addEventListener('scroll', handleScroll, { once: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Gestion du thème
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    return (
        <header
            className={isScrolled ? 'scrolled' : ''}
            ref={headerRef}
            onMouseMove={handleMouseMove}
        >
            <div className="container header-container">
                <a href="#accueil" className="logo" onClick={(e) => handleLinkClick(e, '#accueil')}>
                    <img src={logoTeo} alt="Logo" className="logo-image" />
                    <span>Fabien Téo KPEKPASSI</span>
                </a>

                <div className="header-right">
                    <nav className={`main-nav ${isMenuOpen ? 'nav-active' : ''}`} id="main-nav">
                        <ul className="nav-links">
                            {/* On ferme le menu quand on clique sur un lien */}
                            <li><a href="#accueil" onClick={(e) => handleLinkClick(e, '#accueil')}>{t('nav_home')}</a></li>
                            <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')}>{t('nav_services')}</a></li>
                            <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')}>{t('nav_about')}</a></li>
                            <li><a href="#projets" onClick={(e) => handleLinkClick(e, '#projets')}>{t('nav_projects')}</a></li>
                            <li><a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>{t('nav_contact')}</a></li>
                        </ul>
                    </nav>

                    <div className="header-actions">
                        <div className="language-switcher">
                            <a href="#" className={`lang-link ${lang === 'fr' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setLang('fr'); }}>FR</a>
                            <span>/</span>
                            <a href="#" className={`lang-link ${lang === 'en' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setLang('en'); }}>EN</a>
                        </div>

                        <button id="theme-toggle" className="theme-toggle" onClick={toggleTheme} aria-label="Changer le thème">
                            {/* Copie tes SVG ici */}
                            {isDarkMode ? (
                                <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            ) : (
                                <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            )}
                        </button>

                        <div className={`burger-menu ${isMenuOpen ? 'toggle' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};