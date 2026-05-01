interface SocialLinkProps {
    href: string;
    label: string;
}

export const SocialLink = ({ href, label }: SocialLinkProps) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-label">{label}</span>
            <span className="social-arrow">↗</span>
        </a>
    );
};
