import type { ProjectModalData } from '../types/Project';

export const projectsData: ProjectModalData[] = [
    {
        id: 'dialog-stellantis',
        number: '#1',
        titleKey: 'project_1_title',
        tags: ['Nettoyage Industriel', 'Stellantis', 'Volume élevé'],
        actionKey: 'project_learn_more',
        image: 'https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg', // Car detailing image
        modalTitleKey: 'dialog_stellantis_title',
        shortDescKey: 'dialog_stellantis_short_desc',
        techTags: ['Stellantis', 'Poissy', 'Qualité Constructeur'],
        p1Key: 'dialog_stellantis_p1',
        p2Key: 'dialog_stellantis_p2',
        p3Key: 'dialog_stellantis_p3',
        closeKey: 'dialog_close'
    },
    {
        id: 'dialog-flotte',
        number: '#2',
        titleKey: 'project_2_title',
        tags: ['B2B', 'Maintenance', 'Flotte'],
        actionKey: 'project_learn_more_2',
        image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg', // Fleet of cars
        modalTitleKey: 'project_2_title',
        shortDescKey: 'service_3_desc',
        techTags: ['Gestion de parc', 'Nettoyage régulier'],
        p1Key: 'service_3_desc',
        closeKey: 'dialog_close_2'
    },
    {
        id: 'dialog-premium',
        number: '#3',
        titleKey: 'project_3_title',
        tags: ['Luxe', 'Detailing', 'Protection'],
        actionKey: 'project_learn_more_3',
        image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg', // Luxury car cleaning
        modalTitleKey: 'project_3_title',
        shortDescKey: 'service_2_desc',
        techTags: ['Polissage', 'Céramique'],
        p1Key: 'service_2_desc',
        closeKey: 'dialog_close_3'
    }
];
