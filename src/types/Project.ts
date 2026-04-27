import type { TranslationKey } from '../contexts/LanguageContext';

export interface Project {
    id: string;
    number: string;
    titleKey: TranslationKey;
    tags: string[];
    actionKey: TranslationKey;
}

export interface ProjectModalData extends Project {
    image: string;
    shortDescKey: TranslationKey;
    p1Key?: TranslationKey;
    p2Key?: TranslationKey;
    p3Key?: TranslationKey;
    p4Key?: TranslationKey;
    caption1Key?: TranslationKey;
    caption2Key?: TranslationKey;
    screenshot1?: string;
    screenshot2?: string;
    modalTitleKey: TranslationKey;
    techTags: string[];
    closeKey: TranslationKey;
}
