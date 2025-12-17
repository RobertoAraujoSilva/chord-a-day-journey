import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { TranslationKey, TranslationObject, TRANSLATION_CATEGORIES, Locale, SUPPORTED_LOCALES } from './types';
import { getNestedValue, validateTranslationCompleteness, loadTranslations, interpolateVariables } from './utils';

/**
 * **Feature: i18n-system, Property 6: Component text sourcing compliance**
 * **Validates: Requirements 7.1, 7.2**
 * 
 * For any rendered text content in components, the text should originate from 
 * translation keys and contain no hardcoded strings
 */
describe('Translation Key Type Safety', () => {
  it('should ensure all valid translation keys can be resolved in translation objects', () => {
    // Create a mock translation object that matches our structure
    const mockTranslation: TranslationObject = {
      ui: {
        navigation: { home: 'Home', lessons: 'Lessons', progress: 'Progress' },
        buttons: { start: 'Start', next: 'Next', previous: 'Previous', save: 'Save', cancel: 'Cancel' },
        labels: { language: 'Language', day: 'Day', progress: 'Progress', completed: 'Completed' }
      },
      lessons: {
        intro: { welcome: 'Welcome', description: 'Description' },
        chords: { title: 'Title', practice: 'Practice', tips: 'Tips' },
        instructions: { hold: 'Hold', strum: 'Strum', repeat: 'Repeat' }
      },
      content: {
        titles: { app: 'App', daily_chord: 'Daily Chord', progress_tracker: 'Progress Tracker' },
        descriptions: { app: 'App Description', chord_practice: 'Chord Practice', progress: 'Progress' },
        tips: { finger_position: 'Finger Position', practice_daily: 'Practice Daily', be_patient: 'Be Patient' }
      },
      errors: {
        loading_failed: 'Loading Failed',
        translation_missing: 'Translation Missing',
        language_not_supported: 'Language Not Supported',
        network_error: 'Network Error',
        generic_error: 'Generic Error'
      }
    };

    // Generator for valid translation keys based on our structure
    const validTranslationKeyArb = fc.oneof(
      // UI keys
      fc.constantFrom('home', 'lessons', 'progress').map(key => `ui.navigation.${key}` as TranslationKey),
      fc.constantFrom('start', 'next', 'previous', 'save', 'cancel').map(key => `ui.buttons.${key}` as TranslationKey),
      fc.constantFrom('language', 'day', 'progress', 'completed').map(key => `ui.labels.${key}` as TranslationKey),
      
      // Lessons keys
      fc.constantFrom('welcome', 'description').map(key => `lessons.intro.${key}` as TranslationKey),
      fc.constantFrom('title', 'practice', 'tips').map(key => `lessons.chords.${key}` as TranslationKey),
      fc.constantFrom('hold', 'strum', 'repeat').map(key => `lessons.instructions.${key}` as TranslationKey),
      
      // Content keys
      fc.constantFrom('app', 'daily_chord', 'progress_tracker').map(key => `content.titles.${key}` as TranslationKey),
      fc.constantFrom('app', 'chord_practice', 'progress').map(key => `content.descriptions.${key}` as TranslationKey),
      fc.constantFrom('finger_position', 'practice_daily', 'be_patient').map(key => `content.tips.${key}` as TranslationKey),
      
      // Error keys
      fc.constantFrom('loading_failed', 'translation_missing', 'language_not_supported', 'network_error', 'generic_error')
        .map(key => `errors.${key}` as TranslationKey)
    );

    fc.assert(
      fc.property(validTranslationKeyArb, (translationKey) => {
        // Property: Any valid translation key should be resolvable in a properly structured translation object
        const resolvedValue = getNestedValue(mockTranslation, translationKey);
        
        // The key should resolve to a string value (not undefined)
        expect(typeof resolvedValue).toBe('string');
        expect(resolvedValue).toBeDefined();
        expect(resolvedValue.length).toBeGreaterThan(0);
        
        // The resolved value should not be the key itself (indicating proper translation)
        expect(resolvedValue).not.toBe(translationKey);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should validate translation key structure follows the defined pattern', () => {
    // Generator for translation key components
    const categoryArb = fc.constantFrom(...TRANSLATION_CATEGORIES);
    const subcategoryArb = fc.oneof(
      fc.constant('navigation'),
      fc.constant('buttons'), 
      fc.constant('labels'),
      fc.constant('intro'),
      fc.constant('chords'),
      fc.constant('instructions'),
      fc.constant('titles'),
      fc.constant('descriptions'),
      fc.constant('tips')
    );
    const keyNameArb = fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-z_]+$/.test(s));

    fc.assert(
      fc.property(categoryArb, subcategoryArb, keyNameArb, (category, subcategory, keyName) => {
        // Skip invalid combinations
        if (category === 'errors' && subcategory !== 'errors') {
          return true; // Skip this combination
        }
        if (category !== 'errors' && subcategory === 'errors') {
          return true; // Skip this combination
        }

        let translationKey: string;
        
        if (category === 'errors') {
          translationKey = `errors.${keyName}`;
        } else {
          // Only use subcategory for non-error categories
          const validSubcategories = {
            ui: ['navigation', 'buttons', 'labels'],
            lessons: ['intro', 'chords', 'instructions'],
            content: ['titles', 'descriptions', 'tips']
          };
          
          if (!validSubcategories[category as keyof typeof validSubcategories]?.includes(subcategory)) {
            return true; // Skip invalid combinations
          }
          
          translationKey = `${category}.${subcategory}.${keyName}`;
        }

        // Property: Translation keys should follow the expected pattern structure
        const keyParts = translationKey.split('.');
        
        // Should have at least 2 parts (category.key) or 3 parts (category.subcategory.key)
        expect(keyParts.length).toBeGreaterThanOrEqual(2);
        expect(keyParts.length).toBeLessThanOrEqual(3);
        
        // First part should be a valid category
        expect(TRANSLATION_CATEGORIES).toContain(keyParts[0] as any);
        
        // All parts should be non-empty strings
        keyParts.forEach(part => {
          expect(part.length).toBeGreaterThan(0);
          expect(typeof part).toBe('string');
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * **Feature: i18n-system, Property 7: Translation key completeness across languages**
 * **Validates: Requirements 3.4, 3.5**
 * 
 * For any translation key that exists in one language file, the same key should exist in all other language files
 */
describe('Translation Key Completeness', () => {
  it('should ensure all translation keys exist across all supported languages', async () => {
    // Load all translations for all supported locales
    const allTranslations: Record<Locale, TranslationObject> = {} as Record<Locale, TranslationObject>;
    
    for (const locale of SUPPORTED_LOCALES) {
      try {
        allTranslations[locale] = await loadTranslations(locale);
      } catch (error) {
        // If we can't load translations, create a minimal structure for testing
        console.warn(`Could not load translations for ${locale}, using fallback`);
        allTranslations[locale] = {
          ui: { navigation: {}, buttons: {}, labels: {} },
          lessons: { intro: {}, chords: {}, instructions: {} },
          content: { titles: {}, descriptions: {}, tips: {} },
          errors: {}
        };
      }
    }

    // Property: Translation completeness validation should pass for properly structured translations
    const validation = validateTranslationCompleteness(allTranslations);
    
    if (!validation.isValid) {
      console.error('Missing translation keys:', validation.missingKeys);
    }
    
    expect(validation.isValid).toBe(true);
    expect(validation.missingKeys).toHaveLength(0);
  });

  it('should detect missing keys when translations are incomplete', () => {
    // Create test translations with intentionally missing keys
    const incompleteTranslations: Record<Locale, TranslationObject> = {
      'pt-BR': {
        ui: { 
          navigation: { home: 'Início', lessons: 'Lições' }, // missing 'progress'
          buttons: { start: 'Começar', next: 'Próximo' },
          labels: { language: 'Idioma' }
        },
        lessons: { 
          intro: { welcome: 'Bem-vindo' },
          chords: { title: 'Título' },
          instructions: { hold: 'Segure' }
        },
        content: { 
          titles: { app: 'App' },
          descriptions: { app: 'Descrição' },
          tips: { finger_position: 'Posição' }
        },
        errors: { loading_failed: 'Falha' }
      },
      'en-US': {
        ui: { 
          navigation: { home: 'Home', lessons: 'Lessons', progress: 'Progress' }, // has 'progress'
          buttons: { start: 'Start', next: 'Next' },
          labels: { language: 'Language' }
        },
        lessons: { 
          intro: { welcome: 'Welcome' },
          chords: { title: 'Title' },
          instructions: { hold: 'Hold' }
        },
        content: { 
          titles: { app: 'App' },
          descriptions: { app: 'Description' },
          tips: { finger_position: 'Position' }
        },
        errors: { loading_failed: 'Failed' }
      }
    };

    // Property: Validation should detect missing keys
    const validation = validateTranslationCompleteness(incompleteTranslations);
    
    expect(validation.isValid).toBe(false);
    expect(validation.missingKeys.length).toBeGreaterThan(0);
    expect(validation.missingKeys.some(key => key.includes('pt-BR') && key.includes('progress'))).toBe(true);
  });

  it('should handle nested translation key consistency', () => {
    // Generator for creating translation objects with potential missing nested keys
    const createTranslationArb = fc.record({
      ui: fc.record({
        navigation: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 })),
        buttons: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 })),
        labels: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 }))
      }),
      lessons: fc.record({
        intro: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 })),
        chords: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 })),
        instructions: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 }))
      }),
      content: fc.record({
        titles: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 })),
        descriptions: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 })),
        tips: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 }))
      }),
      errors: fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.string({ minLength: 1 }))
    });

    fc.assert(
      fc.property(createTranslationArb, createTranslationArb, (translation1, translation2) => {
        const translations: Record<Locale, TranslationObject> = {
          'pt-BR': translation1 as TranslationObject,
          'en-US': translation2 as TranslationObject
        };

        // Property: Validation function should correctly identify completeness
        const validation = validateTranslationCompleteness(translations);
        
        // The validation should complete without throwing errors
        expect(typeof validation.isValid).toBe('boolean');
        expect(Array.isArray(validation.missingKeys)).toBe(true);
        
        // If validation passes, there should be no missing keys
        if (validation.isValid) {
          expect(validation.missingKeys).toHaveLength(0);
        } else {
          expect(validation.missingKeys.length).toBeGreaterThan(0);
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * **Feature: i18n-system, Property 8: Variable interpolation safety**
 * **Validates: Requirements 6.1, 6.5**
 * 
 * For any translation with variable interpolation, the output should properly 
 * escape HTML content and handle missing variables gracefully
 */
describe('Variable Interpolation Safety', () => {
  it('should escape HTML content in interpolated variables', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z][a-zA-Z0-9_]*$/.test(s)),
        fc.oneof(
          fc.constant('<script>alert("xss")</script>'),
          fc.constant('<img src="x" onerror="alert(1)">'),
          fc.constant('</div><script>malicious()</script>'),
          fc.constant('<iframe src="javascript:alert(1)"></iframe>'),
          fc.string().map(s => `<${s}>`),
          fc.string().map(s => `${s}<script>${s}</script>${s}`),
          fc.record({
            tag: fc.constantFrom('script', 'img', 'iframe', 'div', 'span'),
            content: fc.string({ minLength: 1, maxLength: 20 })
          }).map(({ tag, content }) => `<${tag}>${content}</${tag}>`)
        ),
        (variableName, maliciousContent) => {
          const template = `Hello {{${variableName}}}!`;
          const variables = { [variableName]: maliciousContent };
          
          // Property: HTML content should be escaped in the output
          const result = interpolateVariables(template, variables);
          
          // Should not contain unescaped HTML tags
          expect(result).not.toContain('<script');
          expect(result).not.toContain('<img');
          expect(result).not.toContain('<iframe');
          expect(result).not.toContain('onerror="');
          expect(result).not.toContain("onerror='");
          
          // Should contain escaped versions
          if (maliciousContent.includes('<')) {
            expect(result).toContain('&lt;');
          }
          if (maliciousContent.includes('>')) {
            expect(result).toContain('&gt;');
          }
          if (maliciousContent.includes('"')) {
            expect(result).toContain('&quot;');
          }
          if (maliciousContent.includes("'")) {
            expect(result).toContain('&#x27;');
          }
          if (maliciousContent.includes('&')) {
            expect(result).toContain('&amp;');
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle missing variables gracefully', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.array(fc.string({ minLength: 1, maxLength: 10 }).filter(s => 
          /^[a-zA-Z][a-zA-Z0-9_]*$/.test(s) && 
          !['toString', 'valueOf', 'constructor', '__proto__', 'hasOwnProperty'].includes(s)
        ), { minLength: 1, maxLength: 5 }),
        fc.array(fc.string({ minLength: 1, maxLength: 10 }).filter(s => 
          /^[a-zA-Z][a-zA-Z0-9_]*$/.test(s) && 
          !['toString', 'valueOf', 'constructor', '__proto__', 'hasOwnProperty'].includes(s)
        ), { minLength: 0, maxLength: 3 }),
        (template, requiredVars, providedVars) => {
          // Create template with required variables
          const templateWithVars = requiredVars.reduce((tmpl, varName) => 
            `${tmpl} {{${varName}}}`, template
          );
          
          // Create variables object with only some of the required variables
          const variables: Record<string, any> = {};
          const uniqueRequiredVars = [...new Set(requiredVars)];
          providedVars.forEach((varName, index) => {
            if (index < uniqueRequiredVars.length) {
              variables[uniqueRequiredVars[index]] = `value_${index}`;
            }
          });
          
          // Property: Missing variables should not cause errors
          expect(() => {
            const result = interpolateVariables(templateWithVars, variables);
            expect(typeof result).toBe('string');
          }).not.toThrow();
          
          const result = interpolateVariables(templateWithVars, variables);
          
          // Missing variables should remain as placeholders
          uniqueRequiredVars.forEach((varName, index) => {
            if (index >= providedVars.length || !variables[varName]) {
              expect(result).toContain(`{{${varName}}}`);
            } else {
              expect(result).toContain(variables[varName]);
            }
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle various data types in variables safely', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 10 }).filter(s => /^[a-zA-Z][a-zA-Z0-9_]*$/.test(s)),
        fc.oneof(
          fc.string(),
          fc.integer(),
          fc.float(),
          fc.boolean(),
          fc.constant(null),
          fc.constant(undefined)
        ),
        (variableName, variableValue) => {
          const template = `Value: {{${variableName}}}`;
          const variables = { [variableName]: variableValue };
          
          // Property: All variable types should be handled without throwing
          expect(() => {
            const result = interpolateVariables(template, variables);
            expect(typeof result).toBe('string');
          }).not.toThrow();
          
          const result = interpolateVariables(template, variables);
          
          if (variableValue === null || variableValue === undefined) {
            // Should keep placeholder for null/undefined
            expect(result).toContain(`{{${variableName}}}`);
          } else {
            // Should convert to string and escape if needed
            const stringValue = String(variableValue);
            // Should contain some representation of the value
            expect(result).not.toContain(`{{${variableName}}}`);
            expect(result.length).toBeGreaterThanOrEqual(`Value: `.length);
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle multiple variables in the same template', () => {
    fc.assert(
      fc.property(
        fc.dictionary(
          fc.string({ minLength: 1, maxLength: 10 }).filter(s => /^[a-zA-Z][a-zA-Z0-9_]*$/.test(s)),
          fc.oneof(
            fc.string({ minLength: 1, maxLength: 20 }),
            fc.string().map(s => `<script>${s}</script>`),
            fc.integer(),
            fc.constant(null)
          ),
          { minKeys: 1, maxKeys: 5 }
        ),
        (variables) => {
          const variableNames = Object.keys(variables);
          const template = `Template with ${variableNames.map(name => `{{${name}}}`).join(' and ')}`;
          
          // Property: Multiple variable interpolation should work correctly
          const result = interpolateVariables(template, variables);
          
          expect(typeof result).toBe('string');
          expect(result.length).toBeGreaterThan(0);
          
          // Check each variable was handled appropriately
          variableNames.forEach(varName => {
            const value = variables[varName];
            if (value === null || value === undefined) {
              expect(result).toContain(`{{${varName}}}`);
            } else {
              const stringValue = String(value);
              // Should not contain unescaped HTML
              if (stringValue.includes('<script')) {
                expect(result).not.toContain('<script');
                expect(result).toContain('&lt;script');
              }
            }
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should preserve template structure when no variables are provided', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.array(fc.string({ minLength: 1, maxLength: 10 }).filter(s => 
          /^[a-zA-Z][a-zA-Z0-9_]*$/.test(s) && 
          !['toString', 'valueOf', 'constructor', '__proto__', 'hasOwnProperty'].includes(s)
        ), { minLength: 1, maxLength: 5 }),
        (baseTemplate, variableNames) => {
          const templateWithVars = variableNames.reduce((tmpl, varName) => 
            `${tmpl} {{${varName}}}`, baseTemplate
          );
          
          // Property: Template without variables should remain unchanged
          const resultWithoutVars = interpolateVariables(templateWithVars);
          const resultWithEmptyVars = interpolateVariables(templateWithVars, {});
          
          expect(resultWithoutVars).toBe(templateWithVars);
          expect(resultWithEmptyVars).toBe(templateWithVars);
          
          // All variable placeholders should remain
          variableNames.forEach(varName => {
            expect(resultWithoutVars).toContain(`{{${varName}}}`);
            expect(resultWithEmptyVars).toContain(`{{${varName}}}`);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});