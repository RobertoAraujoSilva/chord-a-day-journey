import { describe, it, expect } from 'vitest';
import { loadTranslations } from '@/i18n/utils';

describe('Translation Loading Test', () => {
  it('should load all translation categories including content', async () => {
    const translations = await loadTranslations('en-US');
    
    // Test UI translations
    expect(translations.ui).toBeDefined();
    expect(translations.ui.header).toBeDefined();
    expect(translations.ui.header.title).toBe('30 Chords in 30 Days');
    expect(translations.ui.header.subtitle).toBe('Learn guitar gradually and consistently');
    
    // Test content translations
    expect(translations.content).toBeDefined();
    expect(translations.content.chords).toBeDefined();
    expect(translations.content.chords.Em).toBeDefined();
    expect(translations.content.chords.Em.instructions).toBeDefined();
    expect(translations.content.chords.Em.tip).toBeDefined();
    
    // Test that keys match between locales
    const ptTranslations = await loadTranslations('pt-BR');
    expect(ptTranslations.ui.header.title).toBe('30 Acordes em 30 Dias');
    expect(ptTranslations.content.chords.Em.instructions).toBeDefined();
  });
});