import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'legal' | 'privacy' | null;
}

export const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
    const { t, tHtml } = useLanguage();

    // Bloquer le scroll de l'arrière-plan quand la modal est ouverte
    useEffect(() => {
        if (isOpen && type) {
            document.body.classList.add('dialog-open');
        } else {
            document.body.classList.remove('dialog-open');
        }
        return () => {
            document.body.classList.remove('dialog-open');
        };
    }, [isOpen, type]);

    if (!isOpen || !type) return null;

    const titleKey = type === 'legal' ? 'legal_modal_title' : 'privacy_modal_title';
    const contentKey = type === 'legal' ? 'legal_modal_content' : 'privacy_modal_content';
    const closeText = t('nav_home') === 'Accueil' ? 'Fermer' : 'Close'; // fallback basique si pas de traduction dédiée

    return (
        <div 
            className="dialog is-open" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-labelledby="legal-modal-title"
        >
            <div 
                className="dialog-content legal-dialog-content" 
                onClick={e => e.stopPropagation()}
                data-lenis-prevent
            >
                <div className="legal-dialog-layout">
                    <div className="dialog-header-content">
                        <h2 id="legal-modal-title" className="dialog-title">
                            {t(titleKey)}
                        </h2>
                    </div>
                    <div 
                        className="legal-dialog-body" 
                        dangerouslySetInnerHTML={tHtml(contentKey)}
                    />
                </div>
                <button 
                    className="dialog-close" 
                    onClick={onClose}
                    aria-label={closeText}
                    style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}
                >
                    {closeText} <span>→</span>
                </button>
            </div>
        </div>
    );
};
