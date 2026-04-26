import { useLanguage } from '../../contexts/LanguageContext';
import { projectsData } from '../../data/projects';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';

export const Projects = () => {
    const { t } = useLanguage();

    return (
        <section id="projets" className="projects-section">
            <div className="container">

                <div className="projects-header">
                    <h2 className="projects-title">{t('projects_header_title')}</h2>
                    <p className="projects-subtitle">{t('projects_header_desc')}</p>
                </div>

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
                                        <span className="project-number">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <span className="project-name">
                                            {t(project.titleKey)}
                                        </span>

                                        <div className="project-tags hidden md:flex">
                                            {project.tags?.slice(0, 2).map((tag, i) => (
                                                <span key={i} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* NOUVEAU : Indicateur d'état animé (+ / -) */}
                                    <div className="accordion-icon">
                                        <span className="icon-line horizontal"></span>
                                        <span className="icon-line vertical"></span>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="project-content">
                                    <div className="content-grid inner-content-animate">

                                        <div className="content-description">
                                            <h4>{t('projects_challenge_header')}</h4>
                                            <p>{t(project.descriptionKey)}</p>
                                        </div>

                                        <div className="content-specs">
                                            <h4>{t('projects_services_header')}</h4>
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