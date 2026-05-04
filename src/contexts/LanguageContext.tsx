/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

type Language = 'fr' | 'en';
export type TranslationKey = keyof typeof translations.fr;

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: TranslationKey) => string;
    tHtml: (key: TranslationKey) => { __html: string };
    isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLangState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved === 'en' || saved === 'fr') ? saved : 'fr';
    });
    const [isTransitioning, setIsTransitioning] = useState(false);

    const setLang = (newLang: Language) => {
        if (newLang === lang || isTransitioning) return;

        // Start transition animation
        setIsTransitioning(true);

        // Wait for overlay to fade in completely
        setTimeout(() => {
            setLangState(newLang);
            localStorage.setItem('language', newLang);
            document.documentElement.lang = newLang;

            // Wait slightly before hiding overlay for a smooth perceived load
            setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
        }, 400); // Overlay display duration CSS time is ~0.4s
    };

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const t = (key: TranslationKey): string => {
        return translations[lang][key as keyof typeof translations.fr] || key;
    };

    const tHtml = (key: TranslationKey) => {
        return { __html: translations[lang][key as keyof typeof translations.fr] || key };
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, tHtml, isTransitioning }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
