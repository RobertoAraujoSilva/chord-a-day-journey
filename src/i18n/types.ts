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
  };
  lessons: {
    intro: Record<string, string>;
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
  };
  errors: Record<string, string>;
}

// Translation key type for type safety
export type TranslationKey = 
  | `ui.header.${string}`
  | `ui.navigation.${string}`
  | `ui.buttons.${string}`
  | `ui.labels.${string}`
  | `ui.languages.${string}`
  | `ui.difficulty.${string}`
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
  | `errors.${string}`;

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
export const TRANSLATION_CATEGORIES = ['ui', 'lessons', 'content', 'errors'] as const;
export type TranslationCategory = typeof TRANSLATION_CATEGORIES[number];