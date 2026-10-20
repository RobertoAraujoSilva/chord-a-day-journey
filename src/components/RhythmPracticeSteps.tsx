import { Ear, Hand, Music2, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/i18n/context';

const STEPS = [
  { key: 'step_1', Icon: Hand },
  { key: 'step_2', Icon: Ear },
  { key: 'step_3', Icon: Music2 },
  { key: 'step_4', Icon: RotateCcw },
] as const;

export const RhythmPracticeSteps = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-6">
      <h2 className="font-display text-2xl text-gold-light">{t('rythm.sync-steps.title')}</h2>
      <ol className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STEPS.map(({ key, Icon }, index) => (
          <li key={key} className="flex flex-col gap-3 rounded-lg border border-border/60 bg-muted/40 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
                {index + 1}
              </span>
              <Icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <p className="text-sm text-foreground/90">{t(`rythm.sync-steps.${key}`)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};
