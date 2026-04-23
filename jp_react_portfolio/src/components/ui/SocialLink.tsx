interface SocialLinkProps {
    href: string;
    label: string;
}

export const SocialLink = ({ href, label }: SocialLinkProps) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <span>{label}</span>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 13.5L13.5 1.5M13.5 1.5H3.5M13.5 1.5V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </a>
    );
};
