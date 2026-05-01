interface SocialLinkProps {
    href: string;
    label: string;
}

export const SocialLink = ({ href, label }: SocialLinkProps) => {
    const isExternal = href.startsWith('http');
    
    return (
        <a 
            href={href} 
            target={isExternal ? "_blank" : undefined} 
            rel={isExternal ? "noopener noreferrer" : undefined} 
            className="social-link"
        >
            <span className="social-label">{label}</span>
            <span className="social-arrow">↗</span>
        </a>
    );
};
