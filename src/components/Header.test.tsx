import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Header Component i18n Migration', () => {
  it('should use translation keys instead of hardcoded text', () => {
    // Read the Header component source code
    const headerPath = join(process.cwd(), 'src/components/Header.tsx');
    const headerContent = readFileSync(headerPath, 'utf-8');

    // Verify that the component uses translation keys
    expect(headerContent).toContain("t('ui.header.title')");
    expect(headerContent).toContain("t('ui.header.subtitle')");
    
    // Verify that the component imports useTranslation
    expect(headerContent).toContain("import { useTranslation }");
    
    // Verify no hardcoded Portuguese or English text remains
    expect(headerContent).not.toContain('30 Acordes em 30 Dias');
    expect(headerContent).not.toContain('30 Chords in 30 Days');
    expect(headerContent).not.toContain('Aprenda violão');
    expect(headerContent).not.toContain('Learn guitar');
  });

  it('should have corresponding translation keys in both language files', () => {
    // Read Portuguese translation file
    const ptPath = join(process.cwd(), 'src/i18n/locales/pt-BR/ui.json');
    const ptContent = JSON.parse(readFileSync(ptPath, 'utf-8'));

    // Read English translation file
    const enPath = join(process.cwd(), 'src/i18n/locales/en-US/ui.json');
    const enContent = JSON.parse(readFileSync(enPath, 'utf-8'));

    // Verify header translations exist in both files
    expect(ptContent.header).toBeDefined();
    expect(ptContent.header.title).toBeDefined();
    expect(ptContent.header.subtitle).toBeDefined();

    expect(enContent.header).toBeDefined();
    expect(enContent.header.title).toBeDefined();
    expect(enContent.header.subtitle).toBeDefined();

    // Verify the translations are different (not just copied)
    expect(ptContent.header.title).not.toBe(enContent.header.title);
    expect(ptContent.header.subtitle).not.toBe(enContent.header.subtitle);
  });
});