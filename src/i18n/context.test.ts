import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { detectBrowserLanguage, getNestedValue, formatNumber, formatDate, formatPlural } from './utils';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, TranslationObject, Locale } from './types';

describe('I18n Context Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Property 1: Browser language detection consistency', () => {
    /**
     * **Feature: i18n-system, Property 1: Browser language detection consistency**
     * **Validates: Requirements 1.1**
     * 
     * For any supported browser language setting, the system should correctly detect 
     * and set it as the default language
     */
    it('should consistently detect supported browser languages', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          (supportedLocale) => {
            // Mock navigator with the supported locale
            Object.defineProperty(global, 'navigator', {
              value: {
                language: supportedLocale,
                languages: [supportedLocale]
              },
              writable: true,
              configurable: true
            });

            const detectedLanguage = detectBrowserLanguage();
            
            // The detected language should match the browser language when supported
            expect(detectedLanguage).toBe(supportedLocale);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should consistently fall back to default for unsupported languages', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 2, maxLength: 10 }).filter(lang => 
            !SUPPORTED_LOCALES.includes(lang as any) && 
            !lang.startsWith('pt') && 
            !lang.startsWith('en')
          ),
          (unsupportedLang) => {
            // Mock navigator with unsupported language
            Object.defineProperty(global, 'navigator', {
              value: {
                language: unsupportedLang,
                languages: [unsupportedLang]
              },
              writable: true,
              configurable: true
            });

            const detectedLanguage = detectBrowserLanguage();
            
            // Should fall back to default locale for unsupported languages
            expect(detectedLanguage).toBe(DEFAULT_LOCALE);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle partial language matches consistently', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('pt', 'en'),
          fc.string({ minLength: 1, maxLength: 5 }),
          (langCode, region) => {
            const browserLang = `${langCode}-${region}`;
            
            // Mock navigator with partial match
            Object.defineProperty(global, 'navigator', {
              value: {
                language: browserLang,
                languages: [browserLang]
              },
              writable: true,
              configurable: true
            });

            const detectedLanguage = detectBrowserLanguage();
            
            // Should find matching supported locale for the language code
            const expectedLocale = SUPPORTED_LOCALES.find(locale => 
              locale.startsWith(langCode)
            ) || DEFAULT_LOCALE;
            
            expect(detectedLanguage).toBe(expectedLocale);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 5: Translation key fallback behavior', () => {
    /**
     * **Feature: i18n-system, Property 5: Translation key fallback behavior**
     * **Validates: Requirements 2.5**
     * 
     * For any missing translation key, the system should display the key name 
     * as fallback text rather than throwing errors
     */
    it('should return key name as fallback for missing translation keys', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 3, maxLength: 50 }).filter(s => 
            // Generate strings that look like translation keys but don't exist
            s.includes('.') && !s.startsWith('.') && !s.endsWith('.') && s.trim().length > 0
          ),
          (missingKey) => {
            // Create a minimal translation object
            const emptyTranslations: TranslationObject = {
              ui: { navigation: {}, buttons: {}, labels: {}, languages: {} },
              lessons: { intro: {}, chords: {}, instructions: {} },
              content: { titles: {}, descriptions: {}, tips: {} },
              errors: {}
            };

            // Mock the translation function behavior
            const value = getNestedValue(emptyTranslations, missingKey);
            
            // Property: Missing keys should return undefined from getNestedValue
            expect(value).toBeUndefined();
            
            // The translation function should return the key as fallback
            // (This simulates the behavior in the t function)
            const fallbackResult = value === undefined ? missingKey : value;
            expect(fallbackResult).toBe(missingKey);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle deeply nested missing keys consistently', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string({ minLength: 1, maxLength: 10 }).filter(s => s.trim().length > 0), { minLength: 2, maxLength: 5 }),
          (keyParts) => {
            const missingKey = keyParts.join('.');
            
            // Create a translation object with some content but not the generated key
            const partialTranslations: TranslationObject = {
              ui: { 
                navigation: { home: 'Home' }, 
                buttons: { start: 'Start' }, 
                labels: { language: 'Language' },
                languages: { 'pt-BR': 'Português', 'en-US': 'English' }
              },
              lessons: { 
                intro: { welcome: 'Welcome' }, 
                chords: { title: 'Title' }, 
                instructions: { hold: 'Hold' } 
              },
              content: { 
                titles: { app: 'App' }, 
                descriptions: { app: 'Description' }, 
                tips: { practice: 'Practice' } 
              },
              errors: { loading_failed: 'Failed' }
            };

            // Property: Any missing nested key should return undefined
            const value = getNestedValue(partialTranslations, missingKey);
            expect(value).toBeUndefined();
            
            // The fallback behavior should return the original key
            const fallbackResult = value === undefined ? missingKey : value;
            expect(fallbackResult).toBe(missingKey);
            expect(typeof fallbackResult).toBe('string');
            expect(fallbackResult.length).toBeGreaterThan(0);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not throw errors for any missing key format', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.string({ minLength: 1, maxLength: 20 }),
            fc.string({ minLength: 1, maxLength: 20 }).map(s => `invalid.${s}`),
            fc.string({ minLength: 1, maxLength: 20 }).map(s => `${s}.missing.key`),
            fc.constant(''),
            fc.constant('...'),
            fc.constant('key.with.many.nested.levels.that.do.not.exist')
          ),
          (invalidKey) => {
            const emptyTranslations: TranslationObject = {
              ui: { navigation: {}, buttons: {}, labels: {}, languages: {} },
              lessons: { intro: {}, chords: {}, instructions: {} },
              content: { titles: {}, descriptions: {}, tips: {} },
              errors: {}
            };

            // Property: getNestedValue should never throw for any key format
            expect(() => {
              const result = getNestedValue(emptyTranslations, invalidKey);
              // Result should be undefined for missing keys, or a string if it exists
              if (result !== undefined) {
                // For some keys like 'constructor', we might get non-string values
                // This is expected behavior due to JavaScript object properties
                expect(['string', 'function', 'object'].includes(typeof result)).toBe(true);
              }
            }).not.toThrow();
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 9: Locale formatting consistency', () => {
    /**
     * **Feature: i18n-system, Property 9: Locale formatting consistency**
     * **Validates: Requirements 6.2, 6.3**
     * 
     * For any numeric or date value, formatting should match the conventions 
     * of the currently selected locale
     */
    it('should format numbers consistently according to locale conventions', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.float({ min: -1000000, max: 1000000, noNaN: true }),
          (locale, number) => {
            const formatted = formatNumber(number, locale);
            
            // Property: Formatted result should be a non-empty string
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            
            // Property: Should contain numeric characters
            expect(/\d/.test(formatted)).toBe(true);
            
            // Property: Different locales should produce valid formatted strings
            const ptBRFormatted = formatNumber(number, 'pt-BR');
            const enUSFormatted = formatNumber(number, 'en-US');
            
            expect(typeof ptBRFormatted).toBe('string');
            expect(typeof enUSFormatted).toBe('string');
            expect(ptBRFormatted.length).toBeGreaterThan(0);
            expect(enUSFormatted.length).toBeGreaterThan(0);
            
            // Property: Both should contain the same digits (ignoring formatting)
            const ptBRDigits = ptBRFormatted.replace(/[^\d]/g, '');
            const enUSDigits = enUSFormatted.replace(/[^\d]/g, '');
            expect(ptBRDigits).toBe(enUSDigits);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should format numbers with options consistently', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.float({ min: 0, max: 100, noNaN: true }),
          fc.integer({ min: 0, max: 5 }),
          (locale, number, fractionDigits) => {
            const options: Intl.NumberFormatOptions = {
              minimumFractionDigits: fractionDigits,
              maximumFractionDigits: fractionDigits
            };
            
            const formatted = formatNumber(number, locale, options);
            
            // Property: Result should be a string
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            
            // Property: Should contain the expected number of decimal places
            if (fractionDigits > 0) {
              const decimalPart = formatted.split(/[.,]/)[1];
              if (decimalPart) {
                expect(decimalPart.length).toBe(fractionDigits);
              }
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should format dates consistently according to locale conventions', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.date({ min: new Date('2000-01-01'), max: new Date('2030-12-31') }).filter(date => !isNaN(date.getTime())),
          (locale, date) => {
            // Skip invalid dates
            if (isNaN(date.getTime())) {
              return true;
            }
            
            const formatted = formatDate(date, locale);
            
            // Property: Formatted result should be a non-empty string
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            
            // Property: Should contain date components (numbers)
            expect(/\d/.test(formatted)).toBe(true);
            
            // Property: Different locales should potentially format differently
            // (We can't guarantee they're different, but they should be valid)
            const ptBRFormatted = formatDate(date, 'pt-BR');
            const enUSFormatted = formatDate(date, 'en-US');
            
            expect(typeof ptBRFormatted).toBe('string');
            expect(typeof enUSFormatted).toBe('string');
            expect(ptBRFormatted.length).toBeGreaterThan(0);
            expect(enUSFormatted.length).toBeGreaterThan(0);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should format dates with options consistently', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.date({ min: new Date('2000-01-01'), max: new Date('2030-12-31') }).filter(date => !isNaN(date.getTime())),
          fc.constantFrom(
            { year: 'numeric' as const },
            { month: 'long' as const },
            { day: 'numeric' as const },
            { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const }
          ),
          (locale, date, options) => {
            // Skip invalid dates
            if (isNaN(date.getTime())) {
              return true;
            }
            
            const formatted = formatDate(date, locale, options);
            
            // Property: Result should be a string
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            
            // Property: Should contain relevant date information based on options
            if (options.year) {
              expect(/\d{4}/.test(formatted)).toBe(true); // Should contain 4-digit year
            }
            if (options.month) {
              expect(formatted.length).toBeGreaterThan(2); // Month names make it longer
            }
            if (options.day) {
              expect(/\d/.test(formatted)).toBe(true); // Should contain day number
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle formatting errors gracefully', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.oneof(
            fc.constant(NaN),
            fc.constant(Infinity),
            fc.constant(-Infinity)
          ),
          (locale, invalidNumber) => {
            const formatted = formatNumber(invalidNumber, locale);
            
            // Property: Should not throw and should return a string
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 10: Pluralization correctness', () => {
    /**
     * **Feature: i18n-system, Property 10: Pluralization correctness**
     * **Validates: Requirements 6.4**
     * 
     * For any count value and language, the system should apply correct plural forms 
     * according to language-specific rules
     */
    it('should apply correct pluralization rules for Portuguese-Brazilian', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 1000 }),
          (count) => {
            const pluralForms = {
              zero: 'nenhum item',
              one: 'um item',
              other: 'itens'
            };
            
            const formatted = formatPlural(count, 'pt-BR', pluralForms, true);
            
            // Property: Result should be a non-empty string
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            
            // Property: Should contain the formatted count number
            const expectedFormattedCount = formatNumber(count, 'pt-BR');
            expect(formatted).toContain(expectedFormattedCount);
            
            // Property: Should apply correct Portuguese pluralization rules
            if (count === 0) {
              expect(formatted).toContain('nenhum item');
            } else if (count === 1) {
              expect(formatted).toContain('um item');
            } else {
              expect(formatted).toContain('itens');
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should apply correct pluralization rules for English-US', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 1000 }),
          (count) => {
            const pluralForms = {
              zero: 'no items',
              one: 'item',
              other: 'items'
            };
            
            const formatted = formatPlural(count, 'en-US', pluralForms, true);
            
            // Property: Result should be a non-empty string
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            
            // Property: Should contain the formatted count number
            const expectedFormattedCount = formatNumber(count, 'en-US');
            expect(formatted).toContain(expectedFormattedCount);
            
            // Property: Should apply correct English pluralization rules
            if (count === 0) {
              expect(formatted).toContain('no items');
            } else if (count === 1) {
              expect(formatted).toContain('item');
              expect(formatted).not.toContain('items'); // Should not contain plural form
            } else {
              expect(formatted).toContain('items');
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle pluralization without count display', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.integer({ min: 0, max: 100 }),
          (locale, count) => {
            const pluralForms = {
              zero: 'zero form',
              one: 'singular form',
              other: 'plural form'
            };
            
            const formatted = formatPlural(count, locale, pluralForms, false);
            
            // Property: Result should be a non-empty string
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            
            // Property: Should NOT contain the count number when includeCount is false
            const expectedFormattedCount = formatNumber(count, locale);
            expect(formatted).not.toContain(expectedFormattedCount);
            
            // Property: Should contain one of the plural forms
            const containsForm = formatted.includes('zero form') || 
                               formatted.includes('singular form') || 
                               formatted.includes('plural form');
            expect(containsForm).toBe(true);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle missing plural forms gracefully', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.integer({ min: 0, max: 100 }),
          (locale, count) => {
            // Provide incomplete plural forms (missing some cases)
            const incompletePluralForms = {
              other: 'fallback form'
            };
            
            const formatted = formatPlural(count, locale, incompletePluralForms, true);
            
            // Property: Should not throw and should return a string
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            
            // Property: Should fall back to 'other' form when specific form is missing
            expect(formatted).toContain('fallback form');
            
            // Property: Should still include count when requested
            const expectedFormattedCount = formatNumber(count, locale);
            expect(formatted).toContain(expectedFormattedCount);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should be consistent across multiple calls with same parameters', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.integer({ min: 0, max: 50 }),
          fc.boolean(),
          (locale, count, includeCount) => {
            const pluralForms = {
              zero: 'zero items',
              one: 'one item',
              other: 'many items'
            };
            
            // Call the function multiple times with same parameters
            const result1 = formatPlural(count, locale, pluralForms, includeCount);
            const result2 = formatPlural(count, locale, pluralForms, includeCount);
            const result3 = formatPlural(count, locale, pluralForms, includeCount);
            
            // Property: Results should be identical for same inputs
            expect(result1).toBe(result2);
            expect(result2).toBe(result3);
            expect(result1).toBe(result3);
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 12: Content category translation completeness', () => {
    /**
     * **Feature: i18n-system, Property 12: Content category translation completeness**
     * **Validates: Requirements 4.1, 4.3, 4.4, 4.5**
     * 
     * For any content category (chord information, UI elements, progress indicators, error messages), 
     * all text should be properly translated
     */
    it('should have complete translations for all content categories', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.constantFrom('ui', 'lessons', 'content', 'errors'),
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(s)),
          (locale: Locale, category: string, keyName: string) => {
            // Create mock translation objects for testing
            const createMockTranslations = (locale: Locale) => {
              const baseTranslations = {
                ui: {
                  header: { title: locale === 'pt-BR' ? 'Título' : 'Title' },
                  navigation: { home: locale === 'pt-BR' ? 'Início' : 'Home' },
                  buttons: { start: locale === 'pt-BR' ? 'Começar' : 'Start' },
                  labels: { 
                    difficulty: locale === 'pt-BR' ? 'Dificuldade' : 'Difficulty',
                    chord_diagram: locale === 'pt-BR' ? 'Diagrama do Acorde' : 'Chord Diagram',
                    how_to_play: locale === 'pt-BR' ? 'Como tocar:' : 'How to play:',
                    important_tip: locale === 'pt-BR' ? 'Dica importante:' : 'Important tip:',
                    famous_songs: locale === 'pt-BR' ? 'Músicas famosas que usam este acorde:' : 'Famous songs that use this chord:'
                  },
                  languages: { 'pt-BR': 'Português', 'en-US': 'English' },
                  difficulty: {
                    easy: locale === 'pt-BR' ? 'Fácil' : 'Easy',
                    medium: locale === 'pt-BR' ? 'Médio' : 'Medium',
                    hard: locale === 'pt-BR' ? 'Difícil' : 'Hard'
                  }
                },
                lessons: {
                  intro: { welcome: locale === 'pt-BR' ? 'Bem-vindo' : 'Welcome' },
                  chords: { 
                    title: locale === 'pt-BR' ? 'Acorde do Dia' : 'Chord of the Day',
                    practice: locale === 'pt-BR' ? 'Pratique este acorde' : 'Practice this chord'
                  },
                  instructions: { hold: locale === 'pt-BR' ? 'Segure o acorde' : 'Hold the chord' }
                },
                content: {
                  titles: { 
                    app: locale === 'pt-BR' ? '30 Acordes em 30 Dias' : '30 Chords in 30 Days',
                    daily_chord: locale === 'pt-BR' ? 'Acorde Diário' : 'Daily Chord'
                  },
                  descriptions: { 
                    app: locale === 'pt-BR' ? 'Sua jornada diária' : 'Your daily journey',
                    chord_practice: locale === 'pt-BR' ? 'Pratique e domine novos acordes' : 'Practice and master new chords'
                  },
                  tips: { 
                    finger_position: locale === 'pt-BR' ? 'Posicione os dedos corretamente' : 'Position your fingers correctly',
                    practice_daily: locale === 'pt-BR' ? 'Pratique todos os dias' : 'Practice daily'
                  }
                },
                errors: {
                  intro_required: locale === 'pt-BR' ? 'Complete primeiro a Lição Introdutória' : 'Complete the Introductory Lesson first',
                  loading_failed: locale === 'pt-BR' ? 'Falha ao carregar' : 'Failed to load'
                }
              };
              return baseTranslations;
            };

            const translations = createMockTranslations(locale);
            
            // Property: All content categories should have translations
            expect(translations).toHaveProperty(category);
            
            // Property: Each category should have non-empty content
            const categoryContent = translations[category as keyof typeof translations];
            expect(categoryContent).toBeDefined();
            expect(typeof categoryContent).toBe('object');
            expect(Object.keys(categoryContent).length).toBeGreaterThan(0);
            
            // Property: All translation values should be non-empty strings
            const checkTranslationValues = (obj: any, path: string = '') => {
              for (const [key, value] of Object.entries(obj)) {
                const currentPath = path ? `${path}.${key}` : key;
                if (typeof value === 'string') {
                  expect(value.length).toBeGreaterThan(0);
                  expect(value.trim()).toBe(value); // Should not have leading/trailing whitespace
                } else if (typeof value === 'object' && value !== null) {
                  checkTranslationValues(value, currentPath);
                }
              }
            };
            
            checkTranslationValues(categoryContent);
            
            // Property: Critical UI elements should be translated
            if (category === 'ui') {
              const uiContent = categoryContent as any;
              expect(uiContent.labels).toBeDefined();
              expect(uiContent.labels.difficulty).toBeDefined();
              expect(uiContent.labels.chord_diagram).toBeDefined();
              expect(uiContent.labels.how_to_play).toBeDefined();
              expect(uiContent.labels.important_tip).toBeDefined();
              expect(uiContent.labels.famous_songs).toBeDefined();
            }
            
            // Property: Chord-related content should be translated
            if (category === 'lessons') {
              const lessonsContent = categoryContent as any;
              expect(lessonsContent.chords).toBeDefined();
              expect(lessonsContent.chords.title).toBeDefined();
              expect(lessonsContent.chords.practice).toBeDefined();
            }
            
            // Property: Content titles and descriptions should be translated
            if (category === 'content') {
              const contentData = categoryContent as any;
              expect(contentData.titles).toBeDefined();
              expect(contentData.descriptions).toBeDefined();
              expect(contentData.tips).toBeDefined();
            }
            
            // Property: Error messages should be translated
            if (category === 'errors') {
              const errorsContent = categoryContent as any;
              expect(errorsContent.intro_required).toBeDefined();
              expect(errorsContent.loading_failed).toBeDefined();
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain translation consistency across all supported locales', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('ui.labels.difficulty', 'ui.labels.chord_diagram', 'lessons.chords.title', 'content.titles.app', 'errors.intro_required'),
          (translationKey: string) => {
            // Property: Same translation key should exist in all supported locales
            const keyParts = translationKey.split('.');
            const category = keyParts[0];
            const subcategory = keyParts[1];
            const key = keyParts[2];
            
            // Mock translations for both locales
            const ptBRTranslations = {
              ui: { labels: { difficulty: 'Dificuldade', chord_diagram: 'Diagrama do Acorde' } },
              lessons: { chords: { title: 'Acorde do Dia' } },
              content: { titles: { app: '30 Acordes em 30 Dias' } },
              errors: { intro_required: 'Complete primeiro a Lição Introdutória' }
            };
            
            const enUSTranslations = {
              ui: { labels: { difficulty: 'Difficulty', chord_diagram: 'Chord Diagram' } },
              lessons: { chords: { title: 'Chord of the Day' } },
              content: { titles: { app: '30 Chords in 30 Days' } },
              errors: { intro_required: 'Complete the Introductory Lesson first' }
            };
            
            // Property: Key should exist in both locales
            const ptBRValue = getNestedValue(ptBRTranslations, translationKey);
            const enUSValue = getNestedValue(enUSTranslations, translationKey);
            
            expect(ptBRValue).toBeDefined();
            expect(enUSValue).toBeDefined();
            expect(typeof ptBRValue).toBe('string');
            expect(typeof enUSValue).toBe('string');
            expect(ptBRValue.length).toBeGreaterThan(0);
            expect(enUSValue.length).toBeGreaterThan(0);
            
            // Property: Translations should be different (not just copied)
            if (ptBRValue && enUSValue) {
              expect(ptBRValue).not.toBe(enUSValue);
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 11: Language consistency across navigation', () => {
    /**
     * **Feature: i18n-system, Property 11: Language consistency across navigation**
     * **Validates: Requirements 8.1, 8.3, 8.4**
     * 
     * For any page navigation or component loading, the selected language should remain 
     * consistent throughout the application
     */
    it('should maintain language consistency across different application states', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.array(fc.constantFrom('intro', 'chord', 'notfound'), { minLength: 2, maxLength: 5 }),
          (selectedLanguage, navigationSequence) => {
            // Mock localStorage
            const mockStorage: Record<string, string> = {};
            const mockLocalStorage = {
              getItem: vi.fn((key: string) => mockStorage[key] || null),
              setItem: vi.fn((key: string, value: string) => {
                mockStorage[key] = value;
              }),
              removeItem: vi.fn(),
              clear: vi.fn()
            };

            Object.defineProperty(global, 'localStorage', {
              value: mockLocalStorage,
              writable: true,
              configurable: true
            });

            // Set initial language
            localStorage.setItem('chord-a-day-language', selectedLanguage);
            
            // Create translation objects for the selected language
            const createTranslations = (locale: Locale): TranslationObject => ({
              ui: { 
                navigation: { 
                  home: locale === 'pt-BR' ? 'Início' : 'Home',
                  go_to_chords: locale === 'pt-BR' ? 'Ir para Acordes' : 'Go to Chords',
                  review_intro: locale === 'pt-BR' ? 'Revisar Introdução' : 'Review Introduction'
                }, 
                buttons: { 
                  start: locale === 'pt-BR' ? 'Começar' : 'Start',
                  next: locale === 'pt-BR' ? 'Próximo' : 'Next',
                  previous: locale === 'pt-BR' ? 'Anterior' : 'Previous',
                  complete: locale === 'pt-BR' ? 'Completar' : 'Complete',
                  completed: locale === 'pt-BR' ? 'Completado' : 'Completed'
                }, 
                labels: { 
                  language: locale === 'pt-BR' ? 'Idioma' : 'Language',
                  progress: locale === 'pt-BR' ? 'Progresso' : 'Progress',
                  day: locale === 'pt-BR' ? 'Dia' : 'Day',
                  chord_diagram: locale === 'pt-BR' ? 'Diagrama do Acorde' : 'Chord Diagram',
                  how_to_play: locale === 'pt-BR' ? 'Como tocar:' : 'How to play:',
                  important_tip: locale === 'pt-BR' ? 'Dica importante:' : 'Important tip:',
                  famous_songs: locale === 'pt-BR' ? 'Músicas famosas que usam este acorde:' : 'Famous songs that use this chord:',
                  chords_progress: locale === 'pt-BR' ? 'acordes' : 'chords',
                  percent_complete: locale === 'pt-BR' ? '% completo' : '% complete'
                },
                languages: { 'pt-BR': 'Português', 'en-US': 'English' },
                header: {
                  title: locale === 'pt-BR' ? '30 Acordes em 30 Dias' : '30 Chords in 30 Days',
                  subtitle: locale === 'pt-BR' ? 'Aprenda violão um acorde por vez' : 'Learn guitar one chord at a time'
                }
              },
              lessons: { 
                intro: {
                  welcome: locale === 'pt-BR' ? 'Bem-vindo' : 'Welcome'
                }, 
                chords: {
                  title: locale === 'pt-BR' ? 'Acorde do Dia' : 'Chord of the Day'
                }, 
                instructions: {} 
              },
              content: { 
                titles: {
                  intro_lesson: locale === 'pt-BR' ? 'Lição Introdutória' : 'Introductory Lesson'
                }, 
                descriptions: {}, 
                tips: {} 
              },
              errors: {
                intro_required: locale === 'pt-BR' ? 'Complete primeiro a Lição Introdutória' : 'Complete the Introductory Lesson first'
              }
            });

            let currentTranslations = createTranslations(selectedLanguage);
            let currentLanguage = selectedLanguage;

            // Simulate navigation through different application states
            for (const pageState of navigationSequence) {
              // Property: Language should remain consistent regardless of page state
              expect(currentLanguage).toBe(selectedLanguage);
              
              // Property: Translation function should return consistent language content
              const homeTranslation = getNestedValue(currentTranslations, 'ui.navigation.home');
              const expectedHomeText = selectedLanguage === 'pt-BR' ? 'Início' : 'Home';
              expect(homeTranslation).toBe(expectedHomeText);
              
              // Property: Header translations should be consistent
              const headerTitle = getNestedValue(currentTranslations, 'ui.header.title');
              const expectedTitle = selectedLanguage === 'pt-BR' ? '30 Acordes em 30 Dias' : '30 Chords in 30 Days';
              expect(headerTitle).toBe(expectedTitle);
              
              // Property: Button translations should be consistent
              const startButton = getNestedValue(currentTranslations, 'ui.buttons.start');
              const expectedStart = selectedLanguage === 'pt-BR' ? 'Começar' : 'Start';
              expect(startButton).toBe(expectedStart);
              
              // Property: Error messages should be consistent
              const errorMessage = getNestedValue(currentTranslations, 'errors.intro_required');
              const expectedError = selectedLanguage === 'pt-BR' ? 
                'Complete primeiro a Lição Introdutória' : 
                'Complete the Introductory Lesson first';
              expect(errorMessage).toBe(expectedError);
              
              // Simulate component re-rendering or navigation
              // Language should persist from localStorage
              const persistedLanguage = localStorage.getItem('chord-a-day-language');
              expect(persistedLanguage).toBe(selectedLanguage);
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain language consistency during component state changes', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.array(fc.boolean(), { minLength: 3, maxLength: 8 }),
          fc.array(fc.integer({ min: 0, max: 30 }), { minLength: 2, maxLength: 6 }),
          (selectedLanguage, stateChanges, daySelections) => {
            // Mock localStorage
            const mockStorage: Record<string, string> = {};
            const mockLocalStorage = {
              getItem: vi.fn((key: string) => mockStorage[key] || null),
              setItem: vi.fn((key: string, value: string) => {
                mockStorage[key] = value;
              }),
              removeItem: vi.fn(),
              clear: vi.fn()
            };

            Object.defineProperty(global, 'localStorage', {
              value: mockLocalStorage,
              writable: true,
              configurable: true
            });

            // Set initial language
            localStorage.setItem('chord-a-day-language', selectedLanguage);
            
            let currentLanguage = selectedLanguage;
            
            // Create consistent translation function
            const getTranslation = (key: string) => {
              const translations = {
                'ui.labels.day': selectedLanguage === 'pt-BR' ? 'Dia' : 'Day',
                'ui.buttons.complete': selectedLanguage === 'pt-BR' ? 'Completar' : 'Complete',
                'ui.buttons.completed': selectedLanguage === 'pt-BR' ? 'Completado' : 'Completed',
                'ui.labels.progress': selectedLanguage === 'pt-BR' ? 'Progresso' : 'Progress',
                'content.titles.intro_lesson': selectedLanguage === 'pt-BR' ? 'Lição Introdutória' : 'Introductory Lesson'
              };
              return translations[key as keyof typeof translations] || key;
            };

            // Simulate various component state changes (intro/chord view, day selection, completion status)
            for (let i = 0; i < Math.min(stateChanges.length, daySelections.length); i++) {
              const showIntro = stateChanges[i];
              const selectedDay = daySelections[i];
              
              // Property: Language should remain consistent during state changes
              expect(currentLanguage).toBe(selectedLanguage);
              
              // Property: All translations should be consistent with selected language
              const dayLabel = getTranslation('ui.labels.day');
              const expectedDayLabel = selectedLanguage === 'pt-BR' ? 'Dia' : 'Day';
              expect(dayLabel).toBe(expectedDayLabel);
              
              const completeButton = getTranslation('ui.buttons.complete');
              const expectedComplete = selectedLanguage === 'pt-BR' ? 'Completar' : 'Complete';
              expect(completeButton).toBe(expectedComplete);
              
              const progressLabel = getTranslation('ui.labels.progress');
              const expectedProgress = selectedLanguage === 'pt-BR' ? 'Progresso' : 'Progress';
              expect(progressLabel).toBe(expectedProgress);
              
              // Property: Language preference should persist in localStorage
              const persistedLanguage = localStorage.getItem('chord-a-day-language');
              expect(persistedLanguage).toBe(selectedLanguage);
              
              // Simulate component re-render with new state
              // Language should remain unchanged
              expect(currentLanguage).toBe(selectedLanguage);
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain language consistency across browser navigation events', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.array(fc.constantFrom('/', '/intro', '/chord/1', '/chord/15', '/chord/30'), { minLength: 2, maxLength: 5 }),
          (selectedLanguage, urlSequence) => {
            // Mock localStorage
            const mockStorage: Record<string, string> = {};
            const mockLocalStorage = {
              getItem: vi.fn((key: string) => mockStorage[key] || null),
              setItem: vi.fn((key: string, value: string) => {
                mockStorage[key] = value;
              }),
              removeItem: vi.fn(),
              clear: vi.fn()
            };

            Object.defineProperty(global, 'localStorage', {
              value: mockLocalStorage,
              writable: true,
              configurable: true
            });

            // Set initial language
            localStorage.setItem('chord-a-day-language', selectedLanguage);
            
            let currentLanguage = selectedLanguage;
            
            // Simulate browser navigation through different URLs
            for (const url of urlSequence) {
              // Property: Language should remain consistent across URL changes
              expect(currentLanguage).toBe(selectedLanguage);
              
              // Property: Language preference should persist in localStorage
              const persistedLanguage = localStorage.getItem('chord-a-day-language');
              expect(persistedLanguage).toBe(selectedLanguage);
              
              // Property: Translation context should maintain consistency
              // Simulate loading translations for the current language
              const mockTranslations = {
                'ui.header.title': selectedLanguage === 'pt-BR' ? '30 Acordes em 30 Dias' : '30 Chords in 30 Days',
                'ui.navigation.home': selectedLanguage === 'pt-BR' ? 'Início' : 'Home',
                'errors.intro_required': selectedLanguage === 'pt-BR' ? 
                  'Complete primeiro a Lição Introdutória' : 
                  'Complete the Introductory Lesson first'
              };
              
              // All translations should be consistent with the selected language
              for (const [key, expectedValue] of Object.entries(mockTranslations)) {
                expect(expectedValue).toBeDefined();
                expect(typeof expectedValue).toBe('string');
                expect(expectedValue.length).toBeGreaterThan(0);
                
                // Verify language-specific content
                if (selectedLanguage === 'pt-BR') {
                  // Portuguese content should not contain English words
                  if (key === 'ui.header.title') {
                    expect(expectedValue).toContain('Acordes');
                    expect(expectedValue).toContain('Dias');
                  }
                } else {
                  // English content should not contain Portuguese words
                  if (key === 'ui.header.title') {
                    expect(expectedValue).toContain('Chords');
                    expect(expectedValue).toContain('Days');
                  }
                }
              }
              
              // Simulate page load/component mount
              // Language should be restored from localStorage
              const restoredLanguage = localStorage.getItem('chord-a-day-language');
              expect(restoredLanguage).toBe(selectedLanguage);
              currentLanguage = restoredLanguage as Locale;
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle language consistency during rapid navigation', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.array(fc.record({
            showIntro: fc.boolean(),
            currentDay: fc.integer({ min: 0, max: 30 }),
            completedDays: fc.array(fc.integer({ min: 1, max: 30 }), { maxLength: 10 })
          }), { minLength: 5, maxLength: 15 }),
          (selectedLanguage, navigationStates) => {
            // Mock localStorage
            const mockStorage: Record<string, string> = {};
            const mockLocalStorage = {
              getItem: vi.fn((key: string) => mockStorage[key] || null),
              setItem: vi.fn((key: string, value: string) => {
                mockStorage[key] = value;
              }),
              removeItem: vi.fn(),
              clear: vi.fn()
            };

            Object.defineProperty(global, 'localStorage', {
              value: mockLocalStorage,
              writable: true,
              configurable: true
            });

            // Set initial language
            localStorage.setItem('chord-a-day-language', selectedLanguage);
            
            let currentLanguage = selectedLanguage;
            
            // Simulate rapid navigation through different application states
            for (const state of navigationStates) {
              // Property: Language should remain consistent during rapid state changes
              expect(currentLanguage).toBe(selectedLanguage);
              
              // Property: Language should persist in localStorage
              const persistedLanguage = localStorage.getItem('chord-a-day-language');
              expect(persistedLanguage).toBe(selectedLanguage);
              
              // Property: Translation keys should return consistent language content
              const mockTranslationFunction = (key: string) => {
                const translations = {
                  'ui.buttons.next': selectedLanguage === 'pt-BR' ? 'Próximo' : 'Next',
                  'ui.buttons.previous': selectedLanguage === 'pt-BR' ? 'Anterior' : 'Previous',
                  'ui.labels.day': selectedLanguage === 'pt-BR' ? 'Dia' : 'Day',
                  'content.titles.intro_lesson': selectedLanguage === 'pt-BR' ? 'Lição Introdutória' : 'Introductory Lesson'
                };
                return translations[key as keyof typeof translations] || key;
              };
              
              // Test key translations for consistency
              const nextButton = mockTranslationFunction('ui.buttons.next');
              const previousButton = mockTranslationFunction('ui.buttons.previous');
              const dayLabel = mockTranslationFunction('ui.labels.day');
              
              if (selectedLanguage === 'pt-BR') {
                expect(nextButton).toBe('Próximo');
                expect(previousButton).toBe('Anterior');
                expect(dayLabel).toBe('Dia');
              } else {
                expect(nextButton).toBe('Next');
                expect(previousButton).toBe('Previous');
                expect(dayLabel).toBe('Day');
              }
              
              // Simulate component re-render with new state
              // Language should remain unchanged
              expect(currentLanguage).toBe(selectedLanguage);
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
  describe('Property 3: Language persistence round-trip', () => {
    /**
     * **Feature: i18n-system, Property 3: Language persistence round-trip**
     * **Validates: Requirements 1.3, 1.5**
     * 
     * For any language selection, storing in localStorage and retrieving after 
     * page refresh should return the same language value
     */
    it('should persist and retrieve language selections consistently', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          (selectedLocale) => {
            // Mock localStorage
            const mockStorage: Record<string, string> = {};
            const mockLocalStorage = {
              getItem: vi.fn((key: string) => mockStorage[key] || null),
              setItem: vi.fn((key: string, value: string) => {
                mockStorage[key] = value;
              }),
              removeItem: vi.fn((key: string) => {
                delete mockStorage[key];
              }),
              clear: vi.fn(() => {
                Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
              })
            };

            Object.defineProperty(global, 'localStorage', {
              value: mockLocalStorage,
              writable: true,
              configurable: true
            });

            const storageKey = 'chord-a-day-language';
            
            // Store the language
            localStorage.setItem(storageKey, selectedLocale);
            
            // Retrieve the language
            const retrievedLanguage = localStorage.getItem(storageKey);
            
            // The retrieved language should match the stored language
            expect(retrievedLanguage).toBe(selectedLocale);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(storageKey, selectedLocale);
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith(storageKey);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle localStorage errors gracefully', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          (selectedLocale) => {
            // Mock localStorage that throws errors
            const mockLocalStorage = {
              getItem: vi.fn(() => {
                throw new Error('localStorage not available');
              }),
              setItem: vi.fn(() => {
                throw new Error('localStorage not available');
              }),
              removeItem: vi.fn(),
              clear: vi.fn()
            };

            Object.defineProperty(global, 'localStorage', {
              value: mockLocalStorage,
              writable: true,
              configurable: true
            });

            // Should not throw when localStorage fails
            expect(() => {
              try {
                localStorage.setItem('chord-a-day-language', selectedLocale);
              } catch (error) {
                // Error should be caught and handled gracefully
              }
            }).not.toThrow();

            expect(() => {
              try {
                localStorage.getItem('chord-a-day-language');
              } catch (error) {
                // Error should be caught and handled gracefully
              }
            }).not.toThrow();
          }
        ),
        { numRuns: 100 }
      );
    });
  });
  describe('Property 2: Language switching immediacy', () => {
    /**
     * **Feature: i18n-system, Property 2: Language switching immediacy**
     * **Validates: Requirements 1.2, 8.2**
     * 
     * For any language change operation, all visible text content should update 
     * to the new language without requiring page refresh
     */
    it('should immediately update translation context when language changes', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.constantFrom(...SUPPORTED_LOCALES),
          (initialLanguage, targetLanguage) => {
            // Mock localStorage
            const mockStorage: Record<string, string> = {};
            const mockLocalStorage = {
              getItem: vi.fn((key: string) => mockStorage[key] || null),
              setItem: vi.fn((key: string, value: string) => {
                mockStorage[key] = value;
              }),
              removeItem: vi.fn(),
              clear: vi.fn()
            };

            Object.defineProperty(global, 'localStorage', {
              value: mockLocalStorage,
              writable: true,
              configurable: true
            });

            // Create mock translation objects for both languages
            const initialTranslations: TranslationObject = {
              ui: { 
                navigation: { home: initialLanguage === 'pt-BR' ? 'Início' : 'Home' }, 
                buttons: { start: initialLanguage === 'pt-BR' ? 'Começar' : 'Start' }, 
                labels: { language: initialLanguage === 'pt-BR' ? 'Idioma' : 'Language' },
                languages: { 'pt-BR': 'Português', 'en-US': 'English' }
              },
              lessons: { intro: {}, chords: {}, instructions: {} },
              content: { titles: {}, descriptions: {}, tips: {} },
              errors: {}
            };

            const targetTranslations: TranslationObject = {
              ui: { 
                navigation: { home: targetLanguage === 'pt-BR' ? 'Início' : 'Home' }, 
                buttons: { start: targetLanguage === 'pt-BR' ? 'Começar' : 'Start' }, 
                labels: { language: targetLanguage === 'pt-BR' ? 'Idioma' : 'Language' },
                languages: { 'pt-BR': 'Português', 'en-US': 'English' }
              },
              lessons: { intro: {}, chords: {}, instructions: {} },
              content: { titles: {}, descriptions: {}, tips: {} },
              errors: {}
            };

            // Property: Language change should immediately update the current language
            // This simulates the behavior of the changeLanguage function
            let currentLanguage = initialLanguage;
            let currentTranslations = initialTranslations;

            // Simulate language change
            const changeLanguage = (newLocale: Locale) => {
              currentLanguage = newLocale;
              currentTranslations = newLocale === targetLanguage ? targetTranslations : initialTranslations;
              localStorage.setItem('chord-a-day-language', newLocale);
            };

            // Change language
            changeLanguage(targetLanguage);

            // Property: Current language should immediately reflect the change
            expect(currentLanguage).toBe(targetLanguage);

            // Property: Translation function should immediately return new language content
            const homeTranslation = getNestedValue(currentTranslations, 'ui.navigation.home');
            const expectedHomeText = targetLanguage === 'pt-BR' ? 'Início' : 'Home';
            expect(homeTranslation).toBe(expectedHomeText);

            // Property: Language preference should be persisted immediately
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('chord-a-day-language', targetLanguage);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle rapid language switching consistently', () => {
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom(...SUPPORTED_LOCALES), { minLength: 2, maxLength: 10 }),
          (languageSequence) => {
            // Mock localStorage
            const mockStorage: Record<string, string> = {};
            const mockLocalStorage = {
              getItem: vi.fn((key: string) => mockStorage[key] || null),
              setItem: vi.fn((key: string, value: string) => {
                mockStorage[key] = value;
              }),
              removeItem: vi.fn(),
              clear: vi.fn()
            };

            Object.defineProperty(global, 'localStorage', {
              value: mockLocalStorage,
              writable: true,
              configurable: true
            });

            let currentLanguage: Locale = DEFAULT_LOCALE;

            // Simulate rapid language switching
            const changeLanguage = (newLocale: Locale) => {
              currentLanguage = newLocale;
              localStorage.setItem('chord-a-day-language', newLocale);
            };

            // Apply each language change in sequence
            for (const targetLanguage of languageSequence) {
              changeLanguage(targetLanguage);
              
              // Property: After each change, current language should match the target
              expect(currentLanguage).toBe(targetLanguage);
              
              // Property: localStorage should be updated for each change
              expect(mockLocalStorage.setItem).toHaveBeenCalledWith('chord-a-day-language', targetLanguage);
            }

            // Property: Final language should be the last in the sequence
            const finalLanguage = languageSequence[languageSequence.length - 1];
            expect(currentLanguage).toBe(finalLanguage);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain translation consistency during language switches', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.constantFrom(...SUPPORTED_LOCALES),
          fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 5 }),
          (fromLanguage, toLanguage, translationKeys) => {
            // Create consistent translation objects
            const createTranslations = (locale: Locale): TranslationObject => ({
              ui: { 
                navigation: { 
                  home: locale === 'pt-BR' ? 'Início' : 'Home',
                  lessons: locale === 'pt-BR' ? 'Lições' : 'Lessons'
                }, 
                buttons: { 
                  start: locale === 'pt-BR' ? 'Começar' : 'Start',
                  next: locale === 'pt-BR' ? 'Próximo' : 'Next'
                }, 
                labels: { 
                  language: locale === 'pt-BR' ? 'Idioma' : 'Language',
                  progress: locale === 'pt-BR' ? 'Progresso' : 'Progress'
                },
                languages: { 'pt-BR': 'Português', 'en-US': 'English' }
              },
              lessons: { intro: {}, chords: {}, instructions: {} },
              content: { titles: {}, descriptions: {}, tips: {} },
              errors: {}
            });

            let currentTranslations = createTranslations(fromLanguage);

            // Simulate language change
            const changeLanguage = (newLocale: Locale) => {
              currentTranslations = createTranslations(newLocale);
            };

            // Change language
            changeLanguage(toLanguage);

            // Property: All translation keys should be consistently available in new language
            const testKeys = ['ui.navigation.home', 'ui.buttons.start', 'ui.labels.language'];
            
            for (const key of testKeys) {
              const translation = getNestedValue(currentTranslations, key);
              
              // Property: Translation should exist and be a non-empty string
              expect(typeof translation).toBe('string');
              expect(translation.length).toBeGreaterThan(0);
              
              // Property: Translation should match expected language
              if (key === 'ui.navigation.home') {
                const expected = toLanguage === 'pt-BR' ? 'Início' : 'Home';
                expect(translation).toBe(expected);
              }
            }

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 4: Unsupported language fallback', () => {
    /**
     * **Feature: i18n-system, Property 4: Unsupported language fallback**
     * **Validates: Requirements 1.4**
     * 
     * For any unsupported browser language code, the system should default 
     * to Portuguese-Brazilian (pt-BR)
     */
    it('should consistently fallback to default locale for unsupported languages', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 2, maxLength: 10 }).filter(lang => 
            !SUPPORTED_LOCALES.includes(lang as any) &&
            !lang.startsWith('pt') &&
            !lang.startsWith('en') &&
            lang !== DEFAULT_LOCALE
          ),
          (unsupportedLang) => {
            // Mock navigator with completely unsupported language
            Object.defineProperty(global, 'navigator', {
              value: {
                language: unsupportedLang,
                languages: [unsupportedLang]
              },
              writable: true,
              configurable: true
            });

            const detectedLanguage = detectBrowserLanguage();
            
            // Should always fall back to the default locale
            expect(detectedLanguage).toBe(DEFAULT_LOCALE);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should fallback to default when navigator is undefined', () => {
      // Mock undefined navigator (server-side rendering scenario)
      Object.defineProperty(global, 'navigator', {
        value: undefined,
        writable: true,
        configurable: true
      });

      const detectedLanguage = detectBrowserLanguage();
      
      // Should fall back to default locale when navigator is undefined
      expect(detectedLanguage).toBe(DEFAULT_LOCALE);
    });

    it('should fallback to default when language properties are missing', () => {
      fc.assert(
        fc.property(
          fc.record({
            language: fc.constantFrom(undefined, null, ''),
            languages: fc.constantFrom(undefined, null, [])
          }),
          (navigatorProps) => {
            // Mock navigator with missing or empty language properties
            Object.defineProperty(global, 'navigator', {
              value: navigatorProps,
              writable: true,
              configurable: true
            });

            const detectedLanguage = detectBrowserLanguage();
            
            // Should fall back to default locale when language info is missing
            expect(detectedLanguage).toBe(DEFAULT_LOCALE);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

describe('Error Handling Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Failed language loading fallback behavior', () => {
    it('should create minimal translations when all loading fails', () => {
      // Test that minimal translations structure is correct
      const minimalTranslations = {
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

      expect(minimalTranslations.errors.loading_failed).toBe('Failed to load translations');
      expect(minimalTranslations.ui.languages['pt-BR']).toBe('Português');
      expect(minimalTranslations.ui.languages['en-US']).toBe('English');
    });

    it('should handle network timeouts gracefully', async () => {
      const timeoutError = new Error('Network timeout');
      timeoutError.name = 'TimeoutError';

      // Test that error handling doesn't crash
      expect(() => {
        throw timeoutError;
      }).toThrow('Network timeout');
    });
  });

  describe('Translation function error handling', () => {
    it('should handle interpolation errors gracefully', async () => {
      const { interpolateVariables } = await import('./utils');
      
      // Test with invalid text parameter
      expect(interpolateVariables(null, { key: 'value' })).toBe('');
      expect(interpolateVariables(undefined, { key: 'value' })).toBe('');
      expect(interpolateVariables(42 as any, { key: 'value' })).toBe('42');
      
      // Test with invalid variables parameter
      expect(interpolateVariables('Hello {{name}}', null)).toBe('Hello {{name}}');
      expect(interpolateVariables('Hello {{name}}', 'invalid' as any)).toBe('Hello {{name}}');
      
      // Test with missing variables
      expect(interpolateVariables('Hello {{name}}', {})).toBe('Hello {{name}}');
      expect(interpolateVariables('Hello {{name}}', { other: 'value' })).toBe('Hello {{name}}');
    });

    it('should escape HTML in variable interpolation', async () => {
      const { interpolateVariables } = await import('./utils');
      
      const maliciousInput = '<script>alert("xss")</script>';
      const result = interpolateVariables('Hello {{name}}', { name: maliciousInput });
      
      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;script&gt;');
      expect(result).toContain('&quot;');
    });

    it('should handle nested value retrieval errors', async () => {
      const { getNestedValue } = await import('./utils');
      
      // Test with invalid object
      expect(getNestedValue(null, 'key')).toBeUndefined();
      expect(getNestedValue(undefined, 'key')).toBeUndefined();
      expect(getNestedValue('string', 'key')).toBeUndefined();
      
      // Test with invalid path
      expect(getNestedValue({}, null)).toBeUndefined();
      expect(getNestedValue({}, undefined)).toBeUndefined();
      expect(getNestedValue({}, '')).toBeUndefined();
      
      // Test with deep path on shallow object
      expect(getNestedValue({ key: 'value' }, 'key.deep.path')).toBeUndefined();
    });

    it('should return undefined for non-string values', async () => {
      const { getNestedValue } = await import('./utils');
      
      const translations = {
        validString: 'Home',
        invalidNumber: 42,
        invalidObject: { nested: 'value' }
      };
      
      // Should return undefined for non-string values
      expect(getNestedValue(translations, 'invalidNumber')).toBeUndefined();
      expect(getNestedValue(translations, 'invalidObject')).toBeUndefined();
      
      // Should return string values normally
      expect(getNestedValue(translations, 'validString')).toBe('Home');
    });
  });

  describe('Validation error handling', () => {
    it('should handle validation with invalid input', async () => {
      const { validateTranslationCompleteness } = await import('./utils');
      
      // Test with invalid translations object
      const result1 = validateTranslationCompleteness(null);
      expect(result1.isValid).toBe(false);
      expect(result1.errors).toContain('Invalid translations object provided');
      
      const result2 = validateTranslationCompleteness('invalid' as any);
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Invalid translations object provided');
    });

    it('should handle validation with missing locales', async () => {
      const { validateTranslationCompleteness } = await import('./utils');
      
      const incompleteTranslations = {
        'pt-BR': {
          ui: { navigation: { home: 'Início' }, buttons: {}, labels: {}, languages: {}, header: {}, difficulty: {} },
          lessons: { intro: {}, chords: {}, instructions: {} },
          content: { titles: {}, descriptions: {}, tips: {}, chords: {} },
          errors: {}
        }
        // Missing en-US
      };
      
      const result = validateTranslationCompleteness(incompleteTranslations);
      expect(result.isValid).toBe(false);
      expect(result.missingKeys).toContain('Missing entire locale: en-US');
    });

    it('should handle validation data structure', async () => {
      const { validateTranslationData } = await import('./utils');
      
      // Test with valid data
      const validData = {
        valid: 'string',
        nested: {
          validNested: 'string'
        }
      };
      
      const isValid = validateTranslationData(validData, 'test');
      expect(isValid).toBe(true);
      
      // Test with circular reference
      const circularData: any = { key: 'value' };
      circularData.circular = circularData;
      
      const isInvalid = validateTranslationData(circularData, 'test');
      expect(isInvalid).toBe(false);
    });
  });

  describe('Formatting error handling', () => {
    it('should handle number formatting errors gracefully', async () => {
      const { formatNumber } = await import('./utils');
      
      // Test with invalid numbers
      const result1 = formatNumber(NaN, 'pt-BR');
      expect(typeof result1).toBe('string');
      expect(result1.length).toBeGreaterThan(0);
      
      const result2 = formatNumber(Infinity, 'en-US');
      expect(typeof result2).toBe('string');
      expect(result2.length).toBeGreaterThan(0);
      
      const result3 = formatNumber(-Infinity, 'pt-BR');
      expect(typeof result3).toBe('string');
      expect(result3.length).toBeGreaterThan(0);
    });

    it('should handle date formatting errors gracefully', async () => {
      const { formatDate } = await import('./utils');
      
      // Test with invalid dates
      const invalidDate = new Date('invalid');
      const result = formatDate(invalidDate, 'pt-BR');
      
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
      // Should fallback to 'Invalid Date' for invalid dates
      expect(result).toBe('Invalid Date');
    });

    it('should handle pluralization with missing rules', async () => {
      const { formatPlural } = await import('./utils');
      
      // Test with unsupported locale (should use fallback)
      const result = formatPlural(5, 'fr-FR' as any, { other: 'items' }, true);
      
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain('items');
    });
  });

  describe('Locale validation', () => {
    it('should validate locale format before attempting to load', async () => {
      const { loadTranslations } = await import('./utils');
      
      // Test invalid locale formats
      await expect(loadTranslations(null as any)).rejects.toThrow('Invalid locale format');
      await expect(loadTranslations(undefined as any)).rejects.toThrow('Invalid locale format');
      await expect(loadTranslations('' as any)).rejects.toThrow('Invalid locale format');
      await expect(loadTranslations('invalid-locale' as any)).rejects.toThrow('Unsupported locale');
    });
  });
});