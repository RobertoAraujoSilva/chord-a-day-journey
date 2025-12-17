# Implementation Plan

- [x] 1. Set up i18n project structure and core types





  - Create i18n directory structure with locales folders
  - Define TypeScript types for locales, translation keys, and translation objects
  - Set up base configuration for supported languages
  - _Requirements: 2.2, 3.1, 3.2_

- [x] 1.1 Write property test for translation key type safety


  - **Property 6: Component text sourcing compliance**
  - **Validates: Requirements 7.1, 7.2**

- [x] 2. Create translation files and content structure





  - Create JSON translation files for pt-BR locale (ui.json, lessons.json, content.json, errors.json)
  - Create corresponding JSON translation files for en-US locale
  - Implement nested object structure for hierarchical organization
  - _Requirements: 3.3, 4.1, 4.3, 4.4, 4.5_

- [x] 2.1 Write property test for translation key completeness

  - **Property 7: Translation key completeness across languages**
  - **Validates: Requirements 3.4, 3.5**

- [x] 3. Implement core i18n context and provider





  - Create I18nContext with state management for current language and translations
  - Implement I18nProvider component with language loading and switching logic
  - Add browser language detection functionality
  - Implement localStorage persistence for language preferences
  - _Requirements: 1.1, 1.3, 1.4, 1.5_

- [x] 3.1 Write property test for browser language detection


  - **Property 1: Browser language detection consistency**
  - **Validates: Requirements 1.1**



- [x] 3.2 Write property test for language persistence

  - **Property 3: Language persistence round-trip**


  - **Validates: Requirements 1.3, 1.5**

- [x] 3.3 Write property test for unsupported language fallback

  - **Property 4: Unsupported language fallback**
  - **Validates: Requirements 1.4**

- [x] 4. Create translation hook and utility functions





  - Implement useTranslation hook for accessing translations in components
  - Create translation function with variable interpolation support
  - Add HTML escaping for security in variable interpolation
  - Implement fallback behavior for missing translation keys
  - _Requirements: 2.5, 6.1, 6.5_

- [x] 4.1 Write property test for translation key fallback

  - **Property 5: Translation key fallback behavior**
  - **Validates: Requirements 2.5**

- [x] 4.2 Write property test for variable interpolation safety

  - **Property 8: Variable interpolation safety**
  - **Validates: Requirements 6.1, 6.5**

- [x] 5. Implement locale-specific formatting utilities




  - Create number formatting functions for different locales
  - Implement date formatting according to locale conventions
  - Add pluralization support for different languages
  - _Requirements: 6.2, 6.3, 6.4_

- [x] 5.1 Write property test for locale formatting


  - **Property 9: Locale formatting consistency**
  - **Validates: Requirements 6.2, 6.3**

- [x] 5.2 Write property test for pluralization


  - **Property 10: Pluralization correctness**
  - **Validates: Requirements 6.4**

- [x] 6. Create language switcher component




  - Implement LanguageSwitcher UI component with dropdown or toggle
  - Add immediate language switching functionality
  - Ensure component integrates with i18n context
  - Style component to match application design
  - _Requirements: 1.2, 8.2_

- [x] 6.1 Write property test for language switching immediacy

  - **Property 2: Language switching immediacy**
  - **Validates: Requirements 1.2, 8.2**

- [x] 7. Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Migrate Header component to use i18n







  - Replace hardcoded text in Header component with translation keys
  - Add translation keys for header title and subtitle
  - Test component renders correctly in both languages
  - _Requirements: 7.1, 7.2, 4.3_

- [x] 9. Migrate Index page to use i18n




  - Replace all hardcoded text in Index component with translation keys
  - Add translation keys for progress indicators, buttons, and labels
  - Ensure dynamic content (day numbers, progress percentages) displays correctly
  - _Requirements: 7.1, 7.2, 4.4_

- [x] 10. Migrate GuitarIntro component to use i18n





  - Replace hardcoded lesson content with translation keys
  - Add translation keys for all educational text while preserving technical accuracy
  - Ensure component maintains proper formatting and structure
  - _Requirements: 7.1, 7.2, 4.1, 4.2_

- [x] 11. Migrate DaySelector component to use i18n




  - Replace hardcoded text in DaySelector with translation keys
  - Add translation keys for day selection labels and tooltips
  - Test component functionality with different languages
  - _Requirements: 7.1, 7.2, 4.3_

- [x] 12. Migrate chord data and related components to use i18n





  - Move chord names, instructions, and tips to translation files
  - Update ChordDiagram and AudioPlayer components to use translation keys
  - Ensure chord information displays correctly in both languages
  - _Requirements: 7.1, 7.2, 4.1_

- [x] 12.1 Write property test for content category translation


  - **Property 12: Content category translation completeness**
  - **Validates: Requirements 4.1, 4.3, 4.4, 4.5**

- [x] 13. Integrate language switcher into application





  - Add LanguageSwitcher component to Header or appropriate location
  - Ensure language selection persists across page navigation
  - Test language consistency throughout application usage
  - _Requirements: 8.1, 8.3, 8.4_

- [x] 13.1 Write property test for language consistency


  - **Property 11: Language consistency across navigation**
  - **Validates: Requirements 8.1, 8.3, 8.4**

- [x] 14. Add error handling and validation





  - Implement error handling for failed language loading
  - Add validation for translation file completeness
  - Create user-friendly error messages for i18n failures
  - _Requirements: 4.5, 3.5_

- [x] 14.1 Write unit tests for error handling scenarios


  - Test failed language loading fallback behavior
  - Test missing translation file handling
  - Test malformed translation data handling
  - _Requirements: 4.5, 3.5_

- [x] 15. Final integration and testing





  - Verify no hardcoded text remains in any components
  - Test complete application functionality in both languages
  - Ensure all translation keys are properly defined and used
  - Validate type safety and build process
  - _Requirements: 7.1, 7.2, 5.3_

- [x] 16. Final Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.