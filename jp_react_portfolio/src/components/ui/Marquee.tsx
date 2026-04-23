import '../../styles/marquee.css';

export const Marquee = () => {
    const items = [
        "FRONTEND DEVELOPMENT", "UI/UX DESIGN", "REACT", "TYPESCRIPT", "NODE.JS", "TAILWIND CSS", "WEB DESIGN"
    ];

    // On duplique les items pour remplir suffisament l'écran et permettre un scroll infini parfait
    const duplicatedItems = [...items, ...items, ...items];

    return (
        <div className="marquee-container">
            <div className="marquee-track">
                {/* On crée deux blocs identiques pour faire la boucle d'animation de 0 à -50% */}
                {[...Array(2)].map((_, blockIndex) => (
                    <div
                        key={blockIndex}
                        className="marquee-content"
                        aria-hidden={blockIndex !== 0 ? "true" : "false"}
                    >
                        {duplicatedItems.map((item, index) => (
                            <span key={`${blockIndex}-${index}`}>
                                {item} <span className="marquee-item-separator">✦</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
