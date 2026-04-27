import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/languageTransition.css';

export const LanguageTransition = () => {
    const { isTransitioning } = useLanguage();

    return (
        <div className={`language-transition-overlay ${isTransitioning ? 'active' : ''}`}>
            <div className="transition-content">
                <span className="sr-only">Langue / Language...</span>
                <div className="loading-spinner"></div>
            </div>
        </div>
    );
};
