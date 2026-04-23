import { useLanguage } from '../../contexts/LanguageContext';
import type { ProjectModalData } from '../../types/Project';

interface ProjectModalProps {
    project: ProjectModalData | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    const { t, tHtml } = useLanguage();

    if (!project) return null;

    return (
        <div className={`dialog ${isOpen ? 'is-open' : ''}`} onClick={onClose}>
            <div className="dialog-content" onClick={e => e.stopPropagation()}>
                <div className="dialog-main-layout">
                    {project.id !== 'dialog-projet-scolaire' ? (
                        <>
                            <div className="dialog-visual">
                                <img src={project.image} alt={t(project.titleKey)} />
                            </div>
                            <div className="dialog-header-content">
                                <h2 className="dialog-title" dangerouslySetInnerHTML={tHtml(project.modalTitleKey)}></h2>
                                <p className="dialog-short-description">{t(project.shortDescKey)}</p>
                                <div className="dialog-meta">
                                    {project.techTags.map((tag: string) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="dialog-body">
                                {project.p1Key && <p>{t(project.p1Key)}</p>}
                                {project.p2Key && <p>{t(project.p2Key)}</p>}

                                {project.screenshot1 && (
                                    <div className="dialog-screenshot">
                                        <img src={project.screenshot1} alt="Screenshot 1" />
                                        {project.caption1Key && <p className="caption">{t(project.caption1Key)}</p>}
                                    </div>
                                )}

                                {project.p3Key && <p>{t(project.p3Key)}</p>}

                                {project.screenshot2 && (
                                    <div className="dialog-screenshot">
                                        <img src={project.screenshot2} alt="Screenshot 2" />
                                        {project.caption2Key && <p className="caption">{t(project.caption2Key)}</p>}
                                    </div>
                                )}

                                {project.p4Key && <p>{t(project.p4Key)}</p>}
                            </div>
                        </>
                    ) : (
                        <div className="dialog-body">
                            <p>{t(project.p1Key || 'nav_home')}</p>
                        </div>
                    )}
                </div>
                <button className="dialog-close" onClick={onClose}>{t(project.closeKey)}</button>
            </div>
        </div>
    );
};
