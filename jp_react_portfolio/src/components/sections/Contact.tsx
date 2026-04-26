import { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SocialLink } from '../ui/SocialLink';
import { ContactEmail } from '../ui/ContactEmail';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
    const { t, tHtml } = useLanguage();
    const [status, setStatus] = useState<{ message: string, color: string }>({ message: '', color: '' });
    const containerRef = useRef<HTMLDivElement>(null);

    // Animation fluide GSAP
    useGSAP(() => {
        gsap.from('.contact-animate', {
            scrollTrigger: {
                trigger: '.contact-section',
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
        const form = e.currentTarget;
        const formData = new FormData(form);

        setStatus({ message: "Envoi en cours...", color: 'var(--text-color)' });

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(Object.fromEntries(formData.entries()))
            });

            const json = await response.json();

            if (response.status === 200) {
                setStatus({ message: "Message envoyé avec succès !", color: '#10B981' }); // Vert émeraude propre
                form.reset();
            } else {
                setStatus({ message: json.message || "Une erreur s'est produite.", color: 'var(--accent-color)' });
            }
        } catch (error) {
            console.log(error);
            setStatus({ message: "Une erreur s'est produite lors de l'envoi.", color: 'var(--accent-color)' });
        }

        setTimeout(() => setStatus({ message: '', color: '' }), 5000);
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
                            <input type="hidden" name="access_key" value="8efd2e12-79ac-4611-989d-e4c448541f75" />

                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" id="name" name="name" placeholder={t('contact_form_name')} required />
                                </div>
                                <div className="form-group">
                                    <input type="email" id="email" name="email" placeholder={t('contact_form_email')} required />
                                </div>
                            </div>

                            <div className="form-group">
                                <textarea id="message" name="message" placeholder={t('contact_form_message')} rows={4} required></textarea>
                            </div>

                            <div className="form-footer">
                                <button type="submit" className="submit-btn">
                                    <span>{t('contact_form_submit')}</span>
                                    <span className="btn-arrow">→</span>
                                </button>
                                <div className="form-status" style={{ color: status.color }}>
                                    {status.message}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* COLONNE DROITE : Informations de contact */}
                    <div className="contact-info-col contact-animate">
                        <div className="info-block">
                            <h3 className="info-title">Discutons de votre projet</h3>

                            <div className="contact-links">
                                <SocialLink href="mailto:lepreparateur01@gmail.com" label="lepreparateur01@gmail.com" />
                                <SocialLink href="https://wa.me/33759211588" label={t('contact_social_wa')} />
                                <SocialLink href="https://www.instagram.com/lepreparateur01/?utm_source=qr&r=nametag" label={t('contact_social_ig')} />
                            </div>
                        </div>

                        <div className="info-block">
                            <h3 className="info-title">Localisation</h3>
                            <p className="info-text">Intervention sur site<br />& Atelier sur rendez-vous</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Filigrane discret en fond */}
            <div className="contact-watermark">CONTACT</div>
        </section>
    );
};