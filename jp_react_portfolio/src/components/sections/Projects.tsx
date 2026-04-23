import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ProjectCard } from '../ui/ProjectCard';
import { projectsData } from '../../data/projects';

export const Projects = () => {
    const { t } = useLanguage();
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

    const toggleProject = (id: string) => {
        setActiveProjectId(prev => prev === id ? null : id);
    };

    return (
        <section id="projets" className="projects-section">
            <div className="projects-container">
                <div className="projects-header">
                    <span className="header-symbol">*</span>
                    <div className="header-text">
                        <h2 className="projects-title">{t('projects_header_title')}</h2>
                        <p>{t('projects_header_desc')}</p>
                    </div>
                </div>
            </div>

            <div className="projects-list-wrapper">
                <div className="projects-list">
                    {projectsData.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isOpen={activeProjectId === project.id}
                            onToggle={() => toggleProject(project.id)}
                        />
                    ))}
                </div>

                <div className="github-link-container">
                    <a href="https://github.com/Teodev578" target="_blank" rel="noopener noreferrer" className="github-link">
                        {t('projects_github_link')}
                    </a>
                </div>
            </div>
        </section>
    );
};