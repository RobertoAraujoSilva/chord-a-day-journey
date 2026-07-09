import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle2, Lock } from 'lucide-react';
import { useTranslation } from '@/i18n/context';

interface DaySelectorProps {
  currentDay: number;
  completedDays: number[];
  onDaySelect: (day: number) => void;
  includeIntro?: boolean;
  introCompleted?: boolean;
}

export const DaySelector = ({
  currentDay,
  completedDays,
  onDaySelect,
  includeIntro = false,
  introCompleted = false
}: DaySelectorProps) => {
  const { t } = useTranslation();

  const highestAccessibleDay = completedDays.length > 0
    ? Math.max(...completedDays) + 1
    : 1;

  return (
    <div className="mb-8 2xl:mb-12">
      <h2 className="font-display text-2xl 2xl:text-3xl text-gold-light text-center mb-6">
        {t('ui.navigation.select_day')}
      </h2>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 2xl:gap-3 3xl:gap-4 px-2">
        {includeIntro && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDaySelect(0)}
            className={`
              col-span-2 min-h-[48px] h-14 2xl:h-16 rounded-2xl
              relative transition-all duration-300 flex items-center justify-center gap-2
              border
              ${currentDay === 0
                ? 'bg-gold-gradient text-background border-primary shadow-elegant scale-105'
                : introCompleted
                ? 'bg-primary/10 text-gold-light border-primary/40 hover:bg-primary/20'
                : 'bg-card text-foreground border-border hover:border-primary/50'
              }
            `}
            aria-label={`${t('ui.labels.intro')}${introCompleted ? ' - Completed' : ''}`}
            aria-current={currentDay === 0 ? 'true' : 'false'}
          >
            <BookOpen className="h-4 w-4" />
            <span className="text-xs 2xl:text-sm font-semibold uppercase tracking-wider">
              {t('ui.labels.intro')}
            </span>
            {introCompleted && currentDay !== 0 && (
              <CheckCircle2 className="absolute -top-2 -right-2 h-5 w-5 text-background bg-primary rounded-full p-0.5 shadow-soft" />
            )}
          </Button>
        )}

        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
          const isCompleted = completedDays.includes(day);
          const isCurrent = currentDay === day;
          const isLocked = day > highestAccessibleDay && !isCompleted;

          return (
            <Button
              key={day}
              variant="outline"
              size="sm"
              onClick={() => !isLocked && onDaySelect(day)}
              disabled={isLocked}
              className={`
                aspect-square min-h-[48px] h-14 w-14 2xl:h-16 2xl:w-16
                rounded-full font-display text-lg 2xl:text-xl
                relative transition-all duration-300 border
                ${isCurrent
                  ? 'bg-gold-gradient text-background border-primary shadow-elegant scale-110 ring-2 ring-primary/30 ring-offset-2 ring-offset-background'
                  : isCompleted
                  ? 'bg-primary/10 text-gold-light border-primary/40 hover:bg-primary/20 hover:scale-105'
                  : isLocked
                  ? 'bg-card/40 text-muted-foreground border-border/50 cursor-not-allowed opacity-50'
                  : 'bg-card text-foreground border-border hover:border-primary/60 hover:scale-105'
                }
              `}
              aria-label={`Day ${day}${isCompleted ? ' - Completed' : ''}${isCurrent ? ' - Current' : ''}${isLocked ? ' - Locked' : ''}`}
              aria-current={isCurrent ? 'true' : 'false'}
              aria-disabled={isLocked}
            >
              {isLocked ? <Lock className="h-4 w-4" /> : day}
              {isCompleted && !isCurrent && (
                <CheckCircle2 className="absolute -top-1.5 -right-1.5 h-5 w-5 text-background bg-primary rounded-full p-0.5 shadow-soft" />
              )}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-muted-foreground uppercase tracking-widest">
        <LegendDot className="bg-gold-gradient" label={t('ui.labels.current_day')} />
        <LegendDot className="bg-primary/20 border border-primary/40" label={t('ui.labels.completed')} />
        <LegendDot className="bg-card border border-border" label={t('ui.labels.locked')} icon={<Lock className="h-3 w-3 text-muted-foreground" />} />
      </div>
    </div>
  );
};

const LegendDot = ({ className, label, icon }: { className: string; label: string; icon?: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${className}`}>{icon}</div>
    <span>{label}</span>
  </div>
);
