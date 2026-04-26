import '../../styles/SkillsRail.css';

const detailingSkillsTop = [
    "Protection Céramique",
    "Correction Vernis",
    "Polissage Multi-Étapes",
    "Préparation Esthétique",
    "Traitement Hydrophobe"
];

const detailingSkillsBottom = [
    "Soin Cuir & Alcantara",
    "Décontamination",
    "Nettoyage Moteur",
    "Finition Showroom",
    "Gestion de Flotte"
];

export const SkillsRail = () => {
    // On duplique les tableaux pour créer une boucle infinie parfaite
    const duplicatedTop = [...detailingSkillsTop, ...detailingSkillsTop, ...detailingSkillsTop];
    const duplicatedBottom = [...detailingSkillsBottom, ...detailingSkillsBottom, ...detailingSkillsBottom];

    return (
        <section className="skills-rail-section">

            {/* Ligne 1 : Défilement vers la gauche */}
            <div className="rail-container border-top">
                <div className="rail-track animate-scroll-left">
                    {duplicatedTop.map((skill, index) => (
                        <div key={`top-${index}`} className="rail-item">
                            <span className={index % 2 === 0 ? "text-solid" : "text-outline"}>
                                {skill}
                            </span>
                            <span className="separator font-mono">+</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ligne 2 : Défilement vers la droite */}
            <div className="rail-container border-bottom bg-alt">
                <div className="rail-track animate-scroll-right">
                    {duplicatedBottom.map((skill, index) => (
                        <div key={`bottom-${index}`} className="rail-item">
                            <span className={index % 2 !== 0 ? "text-solid" : "text-outline"}>
                                {skill}
                            </span>
                            <span className="separator font-mono">+</span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};