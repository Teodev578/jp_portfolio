import type { TranslationKey } from '../contexts/LanguageContext';

export interface ProjectData {
    id: string;
    titleKey: TranslationKey;           // Clé de traduction pour le titre
    tags: string[];             // Affichés en haut à droite (ex: ['Luxe', 'Polissage'])
    descriptionKey: TranslationKey;     // Clé pour le texte principal (Le Défi / L'Intervention)
    techStackKeys: string[];    // Tableau de clés (ou textes directs) pour la liste des prestations
}

// data/projects.ts
export const projectsData: ProjectData[] = [
    {
        id: 'project-stellantis',
        titleKey: 'project_1_title',
        tags: ['Nettoyage Industriel', 'Volume Élevé'],
        descriptionKey: 'dialog_stellantis_p1',
        techStackKeys: [
            'Préparation véhicules neufs et occasions',
            'Respect strict du cahier des charges constructeur',
            'Gestion des flux et cadences industrielles'
        ]
    },
    {
        id: 'project-flotte',
        titleKey: 'project_2_title',
        tags: ['B2B', 'Gestion de Parc'],
        descriptionKey: 'service_3_desc', // Remplace par une vraie clé de description B2B si tu en as une
        techStackKeys: [
            'Intervention sur site pour professionnels',
            'Nettoyage intérieur/extérieur régulier',
            'Maintien de la valeur résiduelle du parc'
        ]
    },
    {
        id: 'project-premium',
        titleKey: 'project_3_title',
        tags: ['Detailing Luxe', 'Protection Céramique'],
        descriptionKey: 'service_2_desc', // Remplace par une vraie clé detailing si besoin
        techStackKeys: [
            'Prélavage et lavage manuel technique',
            'Décontamination ferreuse et goudron',
            'Polissage multi-étapes (correction des micro-rayures)',
            'Pose de protection céramique hydrophobe'
        ]
    }
];