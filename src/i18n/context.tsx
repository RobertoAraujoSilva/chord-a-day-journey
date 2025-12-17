import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Locale, 
  TranslationObject, 
  I18nContextType, 
  TranslationKey,
  DEFAULT_LOCALE 
} from './types';
import { 
  loadTranslations, 
  detectBrowserLanguage, 
  getNestedValue, 
  interpolateVariables,
  formatNumber as utilFormatNumber,
  formatDate as utilFormatDate,
  formatPlural as utilFormatPlural,
  validateTranslationCompleteness
} from './utils';

// Create the context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Storage key for localStorage
const LANGUAGE_STORAGE_KEY = 'chord-a-day-language';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(DEFAULT_LOCALE);
  const [translations, setTranslations] = useState<TranslationObject>({} as TranslationObject);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize language on mount
  useEffect(() => {
    initializeLanguage();
  }, []);

  // Load translations when language changes
  useEffect(() => {
    if (currentLanguage) {
      loadLanguageTranslations(currentLanguage);
    }
  }, [currentLanguage]);

  /**
   * Initialize language from localStorage or browser detection
   */
  async function initializeLanguage() {
    try {
      // Try to get saved language from localStorage
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Locale;
      
      if (savedLanguage && ['pt-BR', 'en-US'].includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      } else {
        // Detect browser language
        const detectedLanguage = detectBrowserLanguage();
        setCurrentLanguage(detectedLanguage);
        // Save detected language to localStorage
        localStorage.setItem(LANGUAGE_STORAGE_KEY, detectedLanguage);
      }
    } catch (error) {
      console.error('Error initializing language:', error);
      setCurrentLanguage(DEFAULT_LOCALE);
    }
  }

  /**
   * Load translations for a specific language
   */
  async function loadLanguageTranslations(locale: Locale) {
    setIsLoading(true);
    setError(null);
    
    try {
      const loadedTranslations = await loadTranslations(locale);
      
      // Validate translation completeness
      const validation = validateTranslationCompleteness({ [locale]: loadedTranslations });
      if (!validation.isValid) {
        console.warn(`Translation validation failed for ${locale}:`, validation.missingKeys);
        setError(`Some translations are missing for ${locale}. Using available translations.`);
      }
      
      setTranslations(loadedTranslations);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Failed to load translations for ${locale}:`, error);
      
      // Set user-friendly error message
      setError(`Failed to load ${locale} translations: ${errorMessage}`);
      
      // Fallback to default locale if current locale fails
      if (locale !== DEFAULT_LOCALE) {
        try {
          console.log(`Attempting fallback to ${DEFAULT_LOCALE}...`);
          const fallbackTranslations = await loadTranslations(DEFAULT_LOCALE);
          setTranslations(fallbackTranslations);
          setCurrentLanguage(DEFAULT_LOCALE);
          setError(`Failed to load ${locale} translations. Switched to ${DEFAULT_LOCALE}.`);
        } catch (fallbackError) {
          const fallbackErrorMessage = fallbackError instanceof Error ? fallbackError.message : 'Unknown error';
          console.error('Failed to load fallback translations:', fallbackError);
          setError(`Critical error: Failed to load any translations. ${fallbackErrorMessage}`);
          
          // Create minimal fallback translations to prevent app crash
          const minimalTranslations: TranslationObject = {
            ui: { 
              header: {}, 
              navigation: {}, 
              buttons: {}, 
              labels: {}, 
              languages: { 'pt-BR': 'Português', 'en-US': 'English' },
              difficulty: {}
            },
            lessons: { intro: {}, chords: {}, instructions: {} },
            content: { titles: {}, descriptions: {}, tips: {}, chords: {} },
            errors: { loading_failed: 'Failed to load translations' }
          };
          setTranslations(minimalTranslations);
        }
      } else {
        // If default locale fails, create minimal translations
        const minimalTranslations: TranslationObject = {
          ui: { 
            header: {}, 
            navigation: {}, 
            buttons: {}, 
            labels: {}, 
            languages: { 'pt-BR': 'Português', 'en-US': 'English' },
            difficulty: {}
          },
          lessons: { intro: {}, chords: {}, instructions: {} },
          content: { titles: {}, descriptions: {}, tips: {}, chords: {} },
          errors: { loading_failed: 'Failed to load translations' }
        };
        setTranslations(minimalTranslations);
      }
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Change the current language
   */
  function changeLanguage(locale: Locale) {
    setCurrentLanguage(locale);
    // Persist to localStorage
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }

  /**
   * Translation function with enhanced error handling
   */
  function t(key: TranslationKey, variables?: Record<string, any>): string {
    try {
      const value = getNestedValue(translations, key);
      
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return key as fallback
      }
      
      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string for key: ${key}`, value);
        return key;
      }
      
      return interpolateVariables(value, variables);
    } catch (error) {
      console.error(`Error in translation function for key ${key}:`, error);
      return key; // Return key as safe fallback
    }
  }

  /**
   * Format number with current locale
   */
  function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return utilFormatNumber(value, currentLanguage, options);
  }

  /**
   * Format date with current locale
   */
  function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return utilFormatDate(date, currentLanguage, options);
  }

  /**
   * Format plural with current locale
   */
  function formatPlural(
    count: number,
    pluralForms: Partial<Record<'zero' | 'one' | 'two' | 'few' | 'many' | 'other', string>>,
    includeCount: boolean = true
  ): string {
    return utilFormatPlural(count, currentLanguage, pluralForms, includeCount);
  }

  const contextValue: I18nContextType = {
    currentLanguage,
    translations,
    changeLanguage,
    t,
    formatNumber,
    formatDate,
    formatPlural,
    isLoading,
    error
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook to use the i18n context
 */
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

/**
 * Hook for translation function only (convenience hook)
 */
export function useTranslation() {
  const { t, currentLanguage, changeLanguage, isLoading, formatNumber, formatDate, formatPlural, error } = useI18n();
  return { t, currentLanguage, changeLanguage, isLoading, formatNumber, formatDate, formatPlural, error };
}