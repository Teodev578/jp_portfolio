// data/projects.ts
import type { TranslationKey } from '../contexts/LanguageContext';

export interface ProjectData {
    id: string;
    titleKey: TranslationKey;
    tags: string[];
    descriptionKey: TranslationKey;
    techStackKeys: TranslationKey[];
}

export const projectsData: ProjectData[] = [
    {
        id: 'project-stellantis',
        titleKey: 'project_1_title',
        tags: ['Nettoyage Industriel', 'Cadence Élevée'],
        descriptionKey: 'project_1_desc',
        techStackKeys: [
            'project_1_spec_1',
            'project_1_spec_2',
            'project_1_spec_3',
            'project_1_spec_4'
        ]
    },
    {
        id: 'project-flotte',
        titleKey: 'project_2_title',
        tags: ['B2B', 'Gestion de Parc'],
        descriptionKey: 'project_2_desc',
        techStackKeys: [
            'project_2_spec_1',
            'project_2_spec_2',
            'project_2_spec_3',
            'project_2_spec_4'
        ]
    },
    {
        id: 'project-premium',
        titleKey: 'project_3_title',
        tags: ['Detailing Luxe', 'Protection Céramique'],
        descriptionKey: 'project_3_desc',
        techStackKeys: [
            'project_3_spec_1',
            'project_3_spec_2',
            'project_3_spec_3',
            'project_3_spec_4'
        ]
    }
];