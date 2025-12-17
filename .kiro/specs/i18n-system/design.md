# Design Document

## Overview

The i18n system will be implemented using a custom React Context-based solution with TypeScript support, providing a scalable architecture for managing translations in the Chord-a-Day Journey application. The system will support Portuguese-Brazilian and English initially, with the capability to add new languages without code modifications.

## Architecture

The i18n system follows a layered architecture:

1. **Translation Layer**: JSON files organized by categories and locales
2. **Context Layer**: React Context providing translation state and functions
3. **Hook Layer**: Custom hooks for accessing translations in components
4. **Type Layer**: TypeScript definitions ensuring type safety
5. **Storage Layer**: localStorage for persisting user language preferences

### Core Components

- `I18nProvider`: React Context Provider managing translation state
- `useTranslation`: Hook for accessing translations in components
- `LanguageSwitcher`: UI component for changing languages
- `TranslationLoader`: Utility for loading and validating translation files
- `TypeGenerator`: Build-time utility for generating TypeScript types

## Components and Interfaces

### I18nProvider Interface
```typescript
interface I18nContextType {
  currentLanguage: Locale;
  translations: TranslationObject;
  changeLanguage: (locale: Locale) => void;
  t: (key: TranslationKey, variables?: Record<string, any>) => string;
  isLoading: boolean;
}
```

### Translation File Structure
```typescript
interface TranslationObject {
  ui: {
    navigation: Record<string, string>;
    buttons: Record<string, string>;
    labels: Record<string, string>;
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
  };
  errors: Record<string, string>;
}
```

### File Organization
```
src/
├── i18n/
│   ├── locales/
│   │   ├── pt-BR/
│   │   │   ├── ui.json
│   │   │   ├── lessons.json
│   │   │   ├── content.json
│   │   │   └── errors.json
│   │   └── en-US/
│   │       ├── ui.json
│   │       ├── lessons.json
│   │       ├── content.json
│   │       └── errors.json
│   ├── types.ts
│   ├── context.tsx
│   ├── hooks.ts
│   └── utils.ts
```

## Data Models

### Locale Type
```typescript
type Locale = 'pt-BR' | 'en-US';
```

### Translation Key Type
```typescript
type TranslationKey = 
  | `ui.navigation.${string}`
  | `ui.buttons.${string}`
  | `ui.labels.${string}`
  | `lessons.intro.${string}`
  | `lessons.chords.${string}`
  | `lessons.instructions.${string}`
  | `content.titles.${string}`
  | `content.descriptions.${string}`
  | `content.tips.${string}`
  | `errors.${string}`;
```

### Translation Function Type
```typescript
type TranslationFunction = (
  key: TranslationKey, 
  variables?: Record<string, any>
) => string;
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Browser language detection consistency
*For any* supported browser language setting, the system should correctly detect and set it as the default language
**Validates: Requirements 1.1**

### Property 2: Language switching immediacy
*For any* language change operation, all visible text content should update to the new language without requiring page refresh
**Validates: Requirements 1.2, 8.2**

### Property 3: Language persistence round-trip
*For any* language selection, storing in localStorage and retrieving after page refresh should return the same language value
**Validates: Requirements 1.3, 1.5**

### Property 4: Unsupported language fallback
*For any* unsupported browser language code, the system should default to Portuguese-Brazilian (pt-BR)
**Validates: Requirements 1.4**

### Property 5: Translation key fallback behavior
*For any* missing translation key, the system should display the key name as fallback text rather than throwing errors
**Validates: Requirements 2.5**

### Property 6: Component text sourcing compliance
*For any* rendered text content in components, the text should originate from translation keys and contain no hardcoded strings
**Validates: Requirements 7.1, 7.2**

### Property 7: Translation key completeness across languages
*For any* translation key that exists in one language file, the same key should exist in all other language files
**Validates: Requirements 3.4, 3.5**

### Property 8: Variable interpolation safety
*For any* translation with variable interpolation, the output should properly escape HTML content and handle missing variables gracefully
**Validates: Requirements 6.1, 6.5**

### Property 9: Locale formatting consistency
*For any* numeric or date value, formatting should match the conventions of the currently selected locale
**Validates: Requirements 6.2, 6.3**

### Property 10: Pluralization correctness
*For any* count value and language, the system should apply correct plural forms according to language-specific rules
**Validates: Requirements 6.4**

### Property 11: Language consistency across navigation
*For any* page navigation or component loading, the selected language should remain consistent throughout the application
**Validates: Requirements 8.1, 8.3, 8.4**

### Property 12: Content category translation completeness
*For any* content category (chord information, UI elements, progress indicators, error messages), all text should be properly translated
**Validates: Requirements 4.1, 4.3, 4.4, 4.5**

## Error Handling

### Missing Translation Keys
- Display the translation key as fallback text
- Log warning to console in development mode
- Track missing keys for reporting

### Failed Language Loading
- Fall back to default language (pt-BR)
- Show user-friendly error message
- Retry mechanism for network failures

### Invalid Locale Detection
- Default to pt-BR for unsupported browser languages
- Validate locale format before setting
- Graceful degradation for malformed locale data

### Type Safety Violations
- Compile-time errors for invalid translation keys
- Runtime warnings for type mismatches
- Development-time validation of translation files

## Testing Strategy

The testing approach combines unit tests for specific functionality and property-based tests for universal behaviors:

### Unit Testing
- Test specific translation key lookups
- Verify language switching functionality
- Test localStorage persistence
- Validate error handling scenarios
- Test component integration points

### Property-Based Testing
Property-based tests will use the `fast-check` library for JavaScript/TypeScript, configured to run a minimum of 100 iterations per test. Each property-based test will be tagged with comments referencing the corresponding correctness property from this design document using the format: `**Feature: i18n-system, Property {number}: {property_text}**`

Key property tests include:
- Translation key consistency across language files
- Language persistence round-trip behavior
- Variable interpolation safety and correctness
- Locale formatting consistency
- Fallback behavior reliability

### Integration Testing
- End-to-end language switching workflows
- Component rendering with different languages
- Browser language detection scenarios
- URL-based language preference handling

The dual testing approach ensures both concrete functionality works correctly (unit tests) and universal properties hold across all possible inputs (property tests), providing comprehensive coverage for the i18n system.