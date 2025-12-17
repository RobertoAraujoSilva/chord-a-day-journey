import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('DaySelector Component i18n Migration', () => {
  it('should use translation keys instead of hardcoded text', () => {
    // Read the DaySelector component source code
    const daySelectorPath = join(process.cwd(), 'src/components/DaySelector.tsx');
    const daySelectorContent = readFileSync(daySelectorPath, 'utf-8');

    // Verify that the component uses translation keys
    expect(daySelectorContent).toContain("t('ui.navigation.select_day')");
    expect(daySelectorContent).toContain("t('ui.labels.intro')");
    
    // Verify that the component imports useTranslation
    expect(daySelectorContent).toContain("import { useTranslation }");
    
    // Verify no hardcoded Portuguese or English text remains
    expect(daySelectorContent).not.toContain('Selecione o Dia');
    expect(daySelectorContent).not.toContain('Select Day');
    expect(daySelectorContent).not.toContain('"Intro"');
  });

  it('should have corresponding translation keys in both language files', () => {
    // Read Portuguese translation file
    const ptPath = join(process.cwd(), 'src/i18n/locales/pt-BR/ui.json');
    const ptContent = JSON.parse(readFileSync(ptPath, 'utf-8'));

    // Read English translation file
    const enPath = join(process.cwd(), 'src/i18n/locales/en-US/ui.json');
    const enContent = JSON.parse(readFileSync(enPath, 'utf-8'));

    // Verify navigation translations exist in both files
    expect(ptContent.navigation).toBeDefined();
    expect(ptContent.navigation.select_day).toBeDefined();
    expect(ptContent.labels).toBeDefined();
    expect(ptContent.labels.intro).toBeDefined();

    expect(enContent.navigation).toBeDefined();
    expect(enContent.navigation.select_day).toBeDefined();
    expect(enContent.labels).toBeDefined();
    expect(enContent.labels.intro).toBeDefined();

    // Verify the translations are different (not just copied)
    expect(ptContent.navigation.select_day).not.toBe(enContent.navigation.select_day);
    // Note: intro is the same in both languages, which is acceptable
  });
});