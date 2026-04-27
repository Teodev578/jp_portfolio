interface ContactEmailProps {
    email: string;
}

export const ContactEmail = ({ email }: ContactEmailProps) => {
    return (
        <a href={`mailto:${email}`} className="contact-email-new">
            {email}
        </a>
    );
};
