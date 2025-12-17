// Export all types
export type {
  Locale,
  TranslationObject,
  TranslationKey,
  TranslationFunction,
  I18nContextType,
  TranslationCategory
} from './types';

// Export constants
export {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  TRANSLATION_CATEGORIES
} from './types';

// Export utilities
export {
  loadTranslations,
  detectBrowserLanguage,
  getNestedValue,
  interpolateVariables,
  validateTranslationCompleteness,
  formatNumber,
  formatDate,
  formatPlural,
  getPlural
} from './utils';

// Export context and hooks
export {
  I18nProvider,
  useI18n,
  useTranslation
} from './context';