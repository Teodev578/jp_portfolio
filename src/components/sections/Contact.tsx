import { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SocialLink } from '../ui/SocialLink';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
    const { t, tHtml } = useLanguage();
    const [status, setStatus] = useState<{ message: string, color: string }>({ message: '', color: '' });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Animation fluide GSAP
    useGSAP(() => {
        gsap.from('.contact-animate', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Empêche le multi-clic pendant l'envoi
        if (isSubmitting) return;

        const form = e.currentTarget;
        const formData = new FormData(form);

        setIsSubmitting(true);
        setStatus({ message: t('contact_status_sending'), color: 'var(--text-color)' });

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(Object.fromEntries(formData.entries()))
            });

            const json = await response.json();

            if (response.ok) {
                setStatus({ message: t('contact_status_success'), color: '#10B981' });
                form.reset();
            } else {
                setStatus({ message: json.message || t('contact_status_error'), color: 'var(--accent-color)' });
            }
        } catch (error) {
            console.error("Erreur d'envoi du formulaire :", error);
            setStatus({ message: t('contact_status_conn_error'), color: 'var(--accent-color)' });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus({ message: '', color: '' }), 5000);
        }
    };

    return (
        <section id="contact" className="contact-section" ref={containerRef}>
            <div className="container">
                <div className="contact-grid">

                    {/* COLONNE GAUCHE : Formulaire */}
                    <div className="contact-form-col">
                        <div className="contact-animate">
                            <h2 className="contact-title">{t('contact_title')}</h2>
                            <p className="contact-intro" dangerouslySetInnerHTML={tHtml('contact_intro')}></p>
                        </div>

                        <form id="contact-form" onSubmit={handleSubmit} className="contact-animate">
                            <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />
                            {/* Protection anti-spam basique Web3Forms */}
                            <input type="checkbox" name="botcheck" className="sr-only" style={{ display: 'none' }} />

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name" className="sr-only">{t('contact_form_name')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={t('contact_form_name')}
                                        required
                                        maxLength={100}
                                        autoComplete="name"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="sr-only">{t('contact_form_email')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder={t('contact_form_email')}
                                        required
                                        maxLength={150}
                                        autoComplete="email"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="sr-only">{t('contact_form_message')}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder={t('contact_form_message')}
                                    rows={4}
                                    required
                                    maxLength={2000}
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>

                            <div className="form-footer">
                                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                    <span>{isSubmitting ? t('contact_status_sending') : t('contact_form_submit')}</span>
                                    {!isSubmitting && <span className="btn-arrow">→</span>}
                                </button>
                                <div className="form-status" style={{ color: status.color }} aria-live="polite">
                                    {status.message}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* COLONNE DROITE : Informations de contact */}
                    <div className="contact-info-col contact-animate">
                        <div className="info-block">
                            <h3 className="info-title">{t('contact_info_title')}</h3>

                            <div className="contact-links">
                                <SocialLink href="mailto:lepreparateur01@gmail.com" label="lepreparateur01@gmail.com" />
                                <SocialLink href="https://wa.me/33759211588" label={t('contact_social_wa')} />
                                <SocialLink href="https://www.instagram.com/lepreparateur01/?utm_source=qr&r=nametag" label={t('contact_social_ig')} />
                            </div>
                        </div>

                        <div className="info-block">
                            <h3 className="info-title">{t('contact_location_title')}</h3>
                            <p className="info-text" dangerouslySetInnerHTML={tHtml('contact_location_text')}></p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Filigrane discret en fond */}
            <div className="contact-watermark" aria-hidden="true">CONTACT</div>
        </section>
    );
};