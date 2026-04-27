import { useLanguage } from '../../contexts/LanguageContext';
import type { ProjectModalData } from '../../types/Project';

interface ProjectCardProps {
    project: ProjectModalData;
    isOpen: boolean;
    onToggle: () => void;
}

export const ProjectCard = ({ project, isOpen, onToggle }: ProjectCardProps) => {
    const { t, tHtml } = useLanguage();

    return (
        <article className={`project-card ${isOpen ? 'is-expanded' : ''}`}>
            <div className="project-card-header" onClick={onToggle}>
                <div className="project-card-inner-container">
                    <div className="card-number">{project.number}</div>
                    <div className="card-content">
                        <div className="card-info">
                            <h3 className="card-title">{t(project.titleKey)}</h3>
                            <p className="card-description">{t(project.shortDescKey)}</p>
                            <div className="card-tags">
                                {project.tags.map((tag: string, index: number) => (
                                    <span key={tag}>
                                        {tag}{index < project.tags.length - 1 ? ' | ' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="card-action">
                            <span className="action-text">{isOpen ? t(project.closeKey) : t(project.actionKey)}</span>
                            <svg
                                className={`card-icon ${isOpen ? 'rotate' : ''}`}
                                width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1.5 13.5L13.5 1.5M13.5 1.5H3.5M13.5 1.5V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="project-accordion-content">
                <div className="accordion-inner">
                    <div className="accordion-grid">
                        <div className="accordion-visual-side">
                            {project.image && (
                                <div className="accordion-image-wrapper">
                                    <img src={project.image} alt={t(project.titleKey)} />
                                </div>
                            )}
                            <div className="accordion-tech-stack">
                                <span className="stack-label">STACK :</span>
                                <div className="tech-tags-list">
                                    {project.techTags.map(tag => (
                                        <span key={tag} className="tech-tag-badge">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="accordion-text-side">
                            <h2 className="accordion-headline" dangerouslySetInnerHTML={tHtml(project.modalTitleKey)}></h2>

                            <div className="accordion-paragraphs">
                                {project.p1Key && <p>{t(project.p1Key)}</p>}
                                {project.p2Key && <p>{t(project.p2Key)}</p>}

                                {(project.screenshot1 || project.screenshot2) && (
                                    <div className="accordion-gallery">
                                        {project.screenshot1 && (
                                            <figure className="gallery-item">
                                                <img src={project.screenshot1} alt="Preview 1" />
                                                {project.caption1Key && <figcaption>{t(project.caption1Key)}</figcaption>}
                                            </figure>
                                        )}
                                        {project.screenshot2 && (
                                            <figure className="gallery-item">
                                                <img src={project.screenshot2} alt="Preview 2" />
                                                {project.caption2Key && <figcaption>{t(project.caption2Key)}</figcaption>}
                                            </figure>
                                        )}
                                    </div>
                                )}

                                {project.p3Key && <p>{t(project.p3Key)}</p>}
                                {project.p4Key && <p>{t(project.p4Key)}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

