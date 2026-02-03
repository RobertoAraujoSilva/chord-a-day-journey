// Core locale type
export type Locale = 'pt-BR' | 'en-US';

// Translation object structure
export interface TranslationObject {
  ui: {
    header: Record<string, string>;
    navigation: Record<string, string>;
    buttons: Record<string, string>;
    labels: Record<string, string>;
    languages: Record<string, string>;
    difficulty: Record<string, string>;
    motivation: Record<string, string>;
    celebration: Record<string, string>;
    slideshow: Record<string, string>;
  };
  lessons: {
    intro: Record<string, string | Record<string, string>>;
    chords: Record<string, string>;
    instructions: Record<string, string>;
  };
  content: {
    titles: Record<string, string>;
    descriptions: Record<string, string>;
    tips: Record<string, string>;
    chords: Record<string, {
      fullName: string;
      difficulty: string;
      instructions: string;
      tip: string;
    }>;
    bonus: Record<string, string>;
  };
  errors: Record<string, string>;
  rythm: {
    introduction: {
      title: string;
      "concept-1": string;
      "concept-2": string;
      "concept-3": string;
    };
    "get-start": {
      title: string;
      "concept-1": string;
    };
  };
}

// Translation key type for type safety
export type TranslationKey = 
  | `ui.header.${string}`
  | `ui.navigation.${string}`
  | `ui.buttons.${string}`
  | `ui.labels.${string}`
  | `ui.languages.${string}`
  | `ui.difficulty.${string}`
  | `ui.motivation.${string}`
  | `ui.celebration.${string}`
  | `ui.slideshow.${string}`
  | `lessons.intro.${string}`
  | `lessons.chords.${string}`
  | `lessons.instructions.${string}`
  | `content.titles.${string}`
  | `content.descriptions.${string}`
  | `content.tips.${string}`
  | `content.chords.${string}.fullName`
  | `content.chords.${string}.difficulty`
  | `content.chords.${string}.instructions`
  | `content.chords.${string}.tip`
  | `content.bonus.${string}`
  | `errors.${string}`
  | `rythm.introduction.title`
  | `rythm.introduction.concept-1`
  | `rythm.introduction.concept-2`
  | `rythm.introduction.concept-3`
  | `rythm.get-start.title`
  | `rythm.get-start.concept-1`
  | `rythm.finger-notation.thumb`
  | `rythm.finger-notation.index`
  | `rythm.finger-notation.middle`
  | `rythm.finger-notation.ring`
  | `rythm.hand-terminology.attack-hand`
  | `rythm.hand-terminology.chord-hand`
  | `rythm.basic-movements.title`
  | `rythm.basic-movements.description`
  | `rythm.strumming-directions.down-title`
  | `rythm.strumming-directions.down-alt`
  | `rythm.strumming-directions.up-title`
  | `rythm.strumming-directions.up-alt`
  | `rythm.muted-strumming.explanation`
  | `rythm.muted-strumming.down-muted-title`
  | `rythm.muted-strumming.down-muted-alt`
  | `rythm.muted-strumming.up-muted-title`
  | `rythm.muted-strumming.up-muted-alt`
  | `rythm.muted-strumming.technique-note`
  | `rythm.muted-strumming.conclusion`
  | `rythm.rhythmic-sequences.title`
  | `rythm.rhythmic-sequences.intro`
  | `rythm.rhythmic-sequences.styles`
  | `rythm.rhythmic-sequences.practice`
  | `rythm.music-styles.rock-pop`
  | `rythm.music-styles.sertanejo`
  | `rythm.music-styles.reggae`
  | `rythm.music-styles.bolero-intro`
  | `rythm.music-styles.spacing-note`
  | `rythm.metronome.title`
  | `rythm.metronome.definition`
  | `rythm.metronome.function`
  | `rythm.metronome.problem`
  | `rythm.metronome.measurement`
  | `rythm.metronome.importance`
  | `rythm.metronome.practice-instructions`
  | `rythm.metronome.video-instruction`
  | `rythm.metronome.video-placeholder`;

// Translation function type
export type TranslationFunction = (
  key: TranslationKey, 
  variables?: Record<string, any>
) => string;

// I18n context interface
export interface I18nContextType {
  currentLanguage: Locale;
  translations: TranslationObject;
  changeLanguage: (locale: Locale) => void;
  t: TranslationFunction;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatPlural: (
    count: number,
    pluralForms: Partial<Record<'zero' | 'one' | 'two' | 'few' | 'many' | 'other', string>>,
    includeCount?: boolean
  ) => string;
  isLoading: boolean;
  error: string | null;
}

// Configuration for supported languages
export const SUPPORTED_LOCALES: Locale[] = ['pt-BR', 'en-US'];
export const DEFAULT_LOCALE: Locale = 'pt-BR';

// Translation file categories
export const TRANSLATION_CATEGORIES = ['ui', 'lessons', 'content', 'errors', 'rythm'] as const;
export type TranslationCategory = typeof TRANSLATION_CATEGORIES[number];