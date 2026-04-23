import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SocialLink } from '../ui/SocialLink';
import { ContactEmail } from '../ui/ContactEmail';

export const Contact = () => {
    const { t, tHtml } = useLanguage();
    const [status, setStatus] = useState<{ message: string, color: string }>({ message: '', color: '' });

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
                setStatus({ message: "Message envoyé avec succès !", color: 'green' });
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
        <section id="contact" className="contact-section-new">
            <div className="contact-container-new">

                <div className="contact-form-col">
                    <h2 className="contact-title-new">{t('contact_title')}</h2>
                    <p className="contact-intro-new" dangerouslySetInnerHTML={tHtml('contact_intro')}></p>

                    <form id="contact-form" onSubmit={handleSubmit}>
                        <input type="hidden" name="access_key" value="8efd2e12-79ac-4611-989d-e4c448541f75" />

                        <div className="form-row-new">
                            <div className="form-group-new">
                                <input type="text" id="name" name="name" placeholder={t('contact_form_name')} required />
                            </div>
                            <div className="form-group-new">
                                <input type="email" id="email" name="email" placeholder={t('contact_form_email')} required />
                            </div>
                        </div>

                        <div className="form-group-new">
                            <textarea id="message" name="message" placeholder={t('contact_form_message')} rows={5} required></textarea>
                        </div>

                        <button type="submit" className="submit-btn-new">
                            <span>{t('contact_form_submit')}</span>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 13.5L13.5 1.5M13.5 1.5H3.5M13.5 1.5V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <div id="form-status" className="form-status-new" style={{ color: status.color }}>{status.message}</div>
                    </form>
                </div>

                <div className="contact-info-col">
                    <div className="contact-cta-new">
                        <span>{t('contact_cta')}</span>
                    </div>
                    <div className="contact-details-group">
                        <div className="contact-links-new">
                            <SocialLink href="https://www.facebook.com/TeoDePeya" label={t('contact_social_fb')} />
                            <SocialLink href="https://www.instagram.com/fabienkpekpassi/" label={t('contact_social_ig')} />
                            <SocialLink href="https://www.linkedin.com/in/fabien-kpekpassi-7aba12229/" label={t('contact_social_li')} />
                            <SocialLink href="https://x.com/TeoDevUltimate" label={t('contact_social_x')} />
                            <SocialLink href="https://wa.me/message/O2YXC4BLQOWXC1" label={t('contact_social_wa')} />
                        </div>
                        <ContactEmail email="teokpekpassi@gmail.com" />
                    </div>
                    {/* <div className="contact-background-text">CONTACT</div> */}
                </div>
            </div>
        </section>
    );
};