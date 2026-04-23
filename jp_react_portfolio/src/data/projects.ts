import type { ProjectModalData } from '../types/Project';
import screenshot1 from '../assets/Capture d\'écran 1.png';
import screenshot2 from '../assets/Capture d\'écran 2.png';
import pomodoMockup from '../assets/pomodo_mockup.png';

export const projectsData: ProjectModalData[] = [
    {
        id: 'dialog-projet-pro',
        number: '#1',
        titleKey: 'project_1_title',
        tags: ['Flutter', 'Firebase', 'Gestion de stock'],
        actionKey: 'project_learn_more',
        image: 'https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg',
        modalTitleKey: 'dialog_bms_title',
        shortDescKey: 'dialog_bms_short_desc',
        techTags: ['Flutter', 'Firebase', 'Windows'],
        p1Key: 'dialog_bms_p1',
        p2Key: 'dialog_bms_p2',
        p3Key: 'dialog_bms_p3',
        p4Key: 'dialog_bms_p4',
        screenshot1: screenshot1,
        caption1Key: 'dialog_bms_caption1',
        screenshot2: screenshot2,
        caption2Key: 'dialog_bms_caption2',
        closeKey: 'dialog_close'
    },
    {
        id: 'dialog-projet-gmailsorter',
        number: '#2',
        titleKey: 'project_2_title',
        tags: ['Python', 'Gemini 1.5', 'Gmail API',],
        actionKey: 'project_learn_more_2',
        image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg',
        modalTitleKey: 'dialog_gmail_title',
        shortDescKey: 'dialog_gmail_short_desc',
        techTags: ['Python', 'Gmail API', 'Gemini'],
        p1Key: 'dialog_gmail_p1',
        p2Key: 'dialog_gmail_p2',
        p3Key: 'dialog_gmail_p3',
        closeKey: 'dialog_close_2'
    },
    {
        id: 'dialog-projet-pomodo',
        number: '#3',
        titleKey: 'project_3_title',
        tags: ['React', 'TypeScript', 'Productivité'],
        actionKey: 'project_learn_more_3',
        image: pomodoMockup,
        modalTitleKey: 'dialog_pomodo_title',
        shortDescKey: 'dialog_pomodo_short_desc',
        techTags: ['React', 'TypeScript', 'Vite'],
        p1Key: 'dialog_pomodo_p1',
        p2Key: 'dialog_pomodo_p2',
        p3Key: 'dialog_pomodo_p3',
        closeKey: 'dialog_close_3'
    },
    {
        id: 'dialog-projet-scolaire',
        number: '#4',
        titleKey: 'project_4_title',
        tags: ['AI', 'FLUTTER'],
        actionKey: 'project_learn_more_4',
        image: '',
        modalTitleKey: 'project_4_title',
        shortDescKey: 'project_4_title',
        techTags: [],
        p1Key: 'dialog_school_content',
        closeKey: 'dialog_close_4'
    }
];
