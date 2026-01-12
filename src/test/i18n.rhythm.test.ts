import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadTranslations } from '@/i18n/utils';
import { Locale } from '@/i18n/types';

describe('Rhythm Translations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load Portuguese rhythm translations', async () => {
    const translations = await loadTranslations('pt-BR');
    
    expect(translations.rythm).toBeDefined();
    expect(translations.rythm.introduction).toBeDefined();
    expect(translations.rythm.introduction.title).toBe('Batidas Rítmicas');
    expect(translations.rythm.introduction['concept-1']).toContain('dominou a mão esquerda');
    expect(translations.rythm['get-start']).toBeDefined();
    expect(translations.rythm['get-start'].title).toContain('Antes de começarmos');
  });

  it('should load English rhythm translations', async () => {
    const translations = await loadTranslations('en-US');
    
    expect(translations.rythm).toBeDefined();
    expect(translations.rythm.introduction).toBeDefined();
    expect(translations.rythm.introduction.title).toBe('Rhythmic Strumming');
    expect(translations.rythm.introduction['concept-1']).toContain("you've mastered the left hand");
    expect(translations.rythm['get-start']).toBeDefined();
    expect(translations.rythm['get-start'].title).toContain('Before we begin');
  });

  it('should have matching structure between locales', async () => {
    const ptTranslations = await loadTranslations('pt-BR');
    const enTranslations = await loadTranslations('en-US');
    
    // Check that both have the same structure
    expect(ptTranslations.rythm.introduction).toBeDefined();
    expect(enTranslations.rythm.introduction).toBeDefined();
    
    expect(Object.keys(ptTranslations.rythm.introduction)).toEqual(
      Object.keys(enTranslations.rythm.introduction)
    );
    
    expect(Object.keys(ptTranslations.rythm['get-start'])).toEqual(
      Object.keys(enTranslations.rythm['get-start'])
    );
  });
});