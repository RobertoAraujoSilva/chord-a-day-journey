import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('ProgressCircle Component i18n Migration', () => {
  it('should use translation keys for motivation messages', () => {
    const progressCirclePath = join(process.cwd(), 'src/components/ProgressCircle.tsx');
    const progressCircleContent = readFileSync(progressCirclePath, 'utf-8');

    // Verify that the component uses translation keys
    expect(progressCircleContent).toContain("t('ui.motivation.start'");
    expect(progressCircleContent).toContain("t('ui.motivation.first_steps'");
    expect(progressCircleContent).toContain("t('ui.motivation.milestone_10'");
    expect(progressCircleContent).toContain("t('ui.motivation.milestone_20'");
    expect(progressCircleContent).toContain("t('ui.motivation.complete'");
    expect(progressCircleContent).toContain("t('ui.motivation.remaining'");
    
    // Verify that the component imports useTranslation
    expect(progressCircleContent).toContain("import { useTranslation }");
    
    // Verify no hardcoded motivational text
    expect(progressCircleContent).not.toContain('Comece sua jornada');
    expect(progressCircleContent).not.toContain('Start your musical');
  });

  it('should display circular progress indicator', () => {
    const progressCirclePath = join(process.cwd(), 'src/components/ProgressCircle.tsx');
    const progressCircleContent = readFileSync(progressCirclePath, 'utf-8');

    // Verify SVG circle elements for progress
    expect(progressCircleContent).toContain('<svg');
    expect(progressCircleContent).toContain('<circle');
    expect(progressCircleContent).toContain('strokeDashoffset');
  });

  it('should display streak counter', () => {
    const progressCirclePath = join(process.cwd(), 'src/components/ProgressCircle.tsx');
    const progressCircleContent = readFileSync(progressCirclePath, 'utf-8');

    // Verify streak display
    expect(progressCircleContent).toContain("t('ui.labels.streak')");
    expect(progressCircleContent).toContain('Flame');
  });
});
