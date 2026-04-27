import '../../styles/SkillsRail.css';
import { useLanguage, type TranslationKey } from '../../contexts/LanguageContext';

const detailingSkillsTop: TranslationKey[] = [
    "skill_ceramic",
    "skill_varnish",
    "skill_polishing",
    "skill_aesthetic",
    "skill_hydrophobic"
];

const detailingSkillsBottom: TranslationKey[] = [
    "skill_leather",
    "skill_decontamination",
    "skill_engine",
    "skill_showroom",
    "skill_fleet"
];

export const SkillsRail = () => {
    const { t } = useLanguage();

    // On duplique les tableaux pour créer une boucle infinie parfaite
    const duplicatedTop = [...detailingSkillsTop, ...detailingSkillsTop, ...detailingSkillsTop];
    const duplicatedBottom = [...detailingSkillsBottom, ...detailingSkillsBottom, ...detailingSkillsBottom];

    return (
        <section className="skills-rail-section">

            {/* Ligne 1 : Défilement vers la gauche */}
            <div className="rail-container border-top">
                <div className="rail-track animate-scroll-left">
                    {duplicatedTop.map((skillKey, index) => (
                        <div key={`top-${index}`} className="rail-item">
                            <span className={index % 2 === 0 ? "text-solid" : "text-outline"}>
                                {t(skillKey)}
                            </span>
                            <span className="separator font-mono">+</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ligne 2 : Défilement vers la droite */}
            <div className="rail-container border-bottom bg-alt">
                <div className="rail-track animate-scroll-right">
                    {duplicatedBottom.map((skillKey, index) => (
                        <div key={`bottom-${index}`} className="rail-item">
                            <span className={index % 2 !== 0 ? "text-solid" : "text-outline"}>
                                {t(skillKey)}
                            </span>
                            <span className="separator font-mono">+</span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};