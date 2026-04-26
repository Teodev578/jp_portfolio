import { useLanguage } from '../../contexts/LanguageContext';
import { projectsData } from '../../data/projects';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion'; // Assure-toi que le chemin pointe vers le fichier Radix UI que tu m'as donné

export const Projects = () => {
    const { t } = useLanguage();

    return (
        <section id="projets" className="projects-section">
            <div className="container">

                {/* En-tête de section Minimaliste */}
                <div className="projects-header">
                    <h2 className="projects-title">{t('projects_header_title')}</h2>
                    <p className="projects-subtitle">{t('projects_header_desc')}</p>
                </div>

                {/* Accordéon Radix UI */}
                <div className="projects-accordion-wrapper">
                    <Accordion type="single" collapsible className="w-full">
                        {projectsData.map((project, index) => (
                            <AccordionItem
                                key={project.id}
                                value={project.id}
                                className="project-item"
                            >
                                <AccordionTrigger className="project-trigger group">
                                    <div className="trigger-content">
                                        {/* Numéro (ex: 01, 02) */}
                                        <span className="project-number">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        {/* Titre du projet */}
                                        <span className="project-name">
                                            {t(project.titleKey)}
                                        </span>

                                        {/* Tags affichés uniquement sur Desktop (optionnel mais très pro) */}
                                        <div className="project-tags hidden md:flex">
                                            {project.tags?.slice(0, 2).map((tag, i) => (
                                                <span key={i} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="project-content">
                                    <div className="content-grid">

                                        {/* Description détaillée */}
                                        <div className="content-description">
                                            <h4>Le Défi / L'Intervention</h4>
                                            <p>{t(project.descriptionKey)}</p>
                                        </div>

                                        {/* Liste des techniques / prestations (façon fiche technique) */}
                                        <div className="content-specs">
                                            <h4>Prestations réalisées</h4>
                                            <ul>
                                                {project.techStackKeys?.map((tech, i) => (
                                                    <li key={i}>{tech}</li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Lien Footer (Instagram/GitHub) - Style Éditorial */}
                <div className="projects-footer">
                    <a
                        href="https://www.instagram.com/lepreparateur01/?utm_source=qr&r=nametag"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="editorial-link"
                    >
                        {t('projects_github_link')}
                    </a>
                </div>

            </div>
        </section>
    );
};