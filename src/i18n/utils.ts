import { Locale, TranslationObject, SUPPORTED_LOCALES, DEFAULT_LOCALE, TRANSLATION_CATEGORIES } from './types';

/**
 * Loads translation files for a specific locale with enhanced error handling
 */
export async function loadTranslations(locale: Locale): Promise<TranslationObject> {
  const translations: Partial<TranslationObject> = {};
  const loadingErrors: string[] = [];
  
  try {
    // Validate locale format
    if (!locale || typeof locale !== 'string') {
      throw new Error(`Invalid locale format: ${locale}`);
    }
    
    if (!SUPPORTED_LOCALES.includes(locale)) {
      throw new Error(`Unsupported locale: ${locale}. Supported locales: ${SUPPORTED_LOCALES.join(', ')}`);
    }
    
    // Load all translation categories for the locale
    console.log(`Loading translations for locale: ${locale}`);
    for (const category of TRANSLATION_CATEGORIES) {
      try {
        console.log(`Loading category: ${category}`);
        const module = await import(`./locales/${locale}/${category}.json`);
        const categoryData = module.default || module;
        
        console.log(`Loaded ${category}:`, Object.keys(categoryData || {}).slice(0, 5));
        
        // Validate the loaded data structure
        if (!validateTranslationData(categoryData, category)) {
          throw new Error(`Invalid or malformed translation data for category ${category}`);
        }
        
        (translations as any)[category] = categoryData;
        console.log(`Successfully loaded category ${category}`);
      } catch (categoryError) {
        const errorMessage = categoryError instanceof Error ? categoryError.message : 'Unknown error';
        loadingErrors.push(`Failed to load ${category}: ${errorMessage}`);
        console.error(`Failed to load category ${category} for locale ${locale}:`, categoryError);
        
        // Create empty category to prevent app crash
        (translations as any)[category] = {};
      }
    }
    
    // If some categories failed to load, log warnings but continue
    if (loadingErrors.length > 0) {
      console.warn(`Some translation categories failed to load for ${locale}:`, loadingErrors);
    }
    
    // Validate that we have the basic structure
    const requiredCategories = ['ui', 'lessons', 'content', 'errors'];
    for (const category of requiredCategories) {
      if (!(translations as any)[category]) {
        (translations as any)[category] = {};
      }
    }
    
    return translations as TranslationObject;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Failed to load translations for locale ${locale}:`, error);
    throw new Error(`Translation loading failed for ${locale}: ${errorMessage}`);
  }
}

/**
 * Detects browser language and returns supported locale or default
 */
export function detectBrowserLanguage(): Locale {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }
  
  const browserLang = navigator.language || navigator.languages?.[0];
  
  if (!browserLang) {
    return DEFAULT_LOCALE;
  }
  
  // Check for exact match first
  if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }
  
  // Check for language code match (e.g., 'pt' matches 'pt-BR')
  const langCode = browserLang.split('-')[0];
  const matchingLocale = SUPPORTED_LOCALES.find(locale => 
    locale.split('-')[0] === langCode
  );
  
  return matchingLocale || DEFAULT_LOCALE;
}

/**
 * Gets nested translation value from object using dot notation with error handling
 */
export function getNestedValue(obj: any, path: string): string | undefined {
  try {
    if (!obj || !path || typeof path !== 'string') {
      return undefined;
    }
    
    const result = path.split('.').reduce((current, key) => {
      if (current === null || current === undefined) {
        return undefined;
      }
      return current[key];
    }, obj);
    
    // Only return string values
    return typeof result === 'string' ? result : undefined;
  } catch (error) {
    console.warn(`Error getting nested value for path ${path}:`, error);
    return undefined;
  }
}

/**
 * Validates and sanitizes translation data structure
 */
export function validateTranslationData(data: any, category: string): boolean {
  try {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      console.error(`Invalid translation data for category ${category}: expected object, got ${typeof data}`);
      return false;
    }
    
    // Check for circular references
    try {
      JSON.stringify(data);
    } catch (error) {
      console.error(`Translation data for category ${category} contains circular references`);
      return false;
    }
    
    // Recursively validate structure
    const validateObject = (obj: any, path: string = ''): boolean => {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          if (!validateObject(value, currentPath)) {
            return false;
          }
        } else if (typeof value !== 'string' && value !== null && value !== undefined) {
          console.warn(`Non-string value found at ${currentPath}:`, typeof value, value);
        }
      }
      return true;
    };
    
    return validateObject(data);
  } catch (error) {
    console.error(`Error validating translation data for category ${category}:`, error);
    return false;
  }
}

/**
 * Interpolates variables into translation string with enhanced error handling
 */
export function interpolateVariables(
  text: string, 
  variables?: Record<string, any>
): string {
  try {
    if (!text || typeof text !== 'string') {
      console.warn('interpolateVariables: text is not a valid string', text);
      return String(text || '');
    }
    
    if (!variables || typeof variables !== 'object') {
      return text;
    }
    
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      try {
        const value = variables[key];
        if (value === undefined || value === null) {
          console.warn(`Variable '${key}' not found in interpolation variables`);
          return match; // Return original placeholder if variable not found
        }
        
        // Escape HTML for security
        return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
      } catch (error) {
        console.error(`Error interpolating variable '${key}':`, error);
        return match; // Return original placeholder on error
      }
    });
  } catch (error) {
    console.error('Error in interpolateVariables:', error);
    return String(text || '');
  }
}

/**
 * Validates that all translation keys exist across all locales with enhanced error handling
 */
export function validateTranslationCompleteness(
  translations: Record<Locale, TranslationObject>
): { isValid: boolean; missingKeys: string[]; errors: string[] } {
  const missingKeys: string[] = [];
  const errors: string[] = [];
  const allKeys = new Set<string>();
  
  try {
    if (!translations || typeof translations !== 'object') {
      errors.push('Invalid translations object provided');
      return { isValid: false, missingKeys: [], errors };
    }
    
    // Collect all keys from all locales
    Object.entries(translations).forEach(([locale, translation]) => {
      try {
        if (!translation || typeof translation !== 'object') {
          errors.push(`Invalid translation object for locale ${locale}`);
          return;
        }
        collectKeys(translation, '', allKeys);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Error collecting keys for locale ${locale}: ${errorMessage}`);
      }
    });
    
    // Check each locale for missing keys
    SUPPORTED_LOCALES.forEach(locale => {
      try {
        const localeTranslation = translations[locale];
        if (!localeTranslation) {
          missingKeys.push(`Missing entire locale: ${locale}`);
          return;
        }
        
        allKeys.forEach(key => {
          try {
            const value = getNestedValue(localeTranslation, key);
            if (value === undefined) {
              missingKeys.push(`${locale}: ${key}`);
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            errors.push(`Error checking key ${key} for locale ${locale}: ${errorMessage}`);
          }
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Error validating locale ${locale}: ${errorMessage}`);
      }
    });
    
    return {
      isValid: missingKeys.length === 0 && errors.length === 0,
      missingKeys,
      errors
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Critical error in validation: ${errorMessage}`);
    return { isValid: false, missingKeys: [], errors };
  }
}

/**
 * Recursively collects all keys from a translation object with error handling
 */
function collectKeys(obj: any, prefix: string, keys: Set<string>): void {
  try {
    if (!obj || typeof obj !== 'object') {
      return;
    }
    
    Object.keys(obj).forEach(key => {
      try {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          collectKeys(obj[key], fullKey, keys);
        } else if (typeof obj[key] === 'string') {
          keys.add(fullKey);
        }
        // Skip non-string, non-object values (like arrays, numbers, etc.)
      } catch (error) {
        console.warn(`Error processing key ${key} in collectKeys:`, error);
      }
    });
  } catch (error) {
    console.error('Error in collectKeys:', error);
  }
}

/**
 * Formats numbers according to locale conventions
 */
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch (error) {
    console.error(`Error formatting number for locale ${locale}:`, error);
    // Fallback to default formatting
    return value.toString();
  }
}

/**
 * Formats dates according to locale conventions
 */
export function formatDate(
  date: Date,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    // Check if date is valid first
    if (isNaN(date.getTime())) {
      console.error(`Invalid date provided for formatting: ${date}`);
      return 'Invalid Date';
    }
    
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    console.error(`Error formatting date for locale ${locale}:`, error);
    // Fallback for invalid dates
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    // Fallback to ISO string for valid dates
    try {
      return date.toISOString().split('T')[0];
    } catch (isoError) {
      return 'Invalid Date';
    }
  }
}

/**
 * Pluralization rules for different languages
 */
const PLURALIZATION_RULES: Record<Locale, (count: number) => 'zero' | 'one' | 'two' | 'few' | 'many' | 'other'> = {
  'pt-BR': (count: number) => {
    if (count === 0) return 'zero';
    if (count === 1) return 'one';
    return 'other';
  },
  'en-US': (count: number) => {
    if (count === 0) return 'zero';
    if (count === 1) return 'one';
    return 'other';
  }
};

/**
 * Gets the correct plural form for a count and locale
 */
export function getPlural(count: number, locale: Locale): 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' {
  const rule = PLURALIZATION_RULES[locale];
  if (!rule) {
    console.warn(`No pluralization rule found for locale ${locale}, using default`);
    return count === 1 ? 'one' : 'other';
  }
  return rule(count);
}

/**
 * Formats pluralized text with count
 */
export function formatPlural(
  count: number,
  locale: Locale,
  pluralForms: Partial<Record<'zero' | 'one' | 'two' | 'few' | 'many' | 'other', string>>,
  includeCount: boolean = true
): string {
  const pluralForm = getPlural(count, locale);
  const text = pluralForms[pluralForm] || pluralForms.other || '';
  
  if (includeCount) {
    const formattedCount = formatNumber(count, locale);
    return `${formattedCount} ${text}`;
  }
  
  return text;
}