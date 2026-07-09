import { Trophy, Flame, Target } from 'lucide-react';
import { useTranslation } from '@/i18n/context';

interface ProgressCircleProps {
  completedDays: number;
  totalDays: number;
  currentDay: number;
  streak: number;
}

export const ProgressCircle = ({
  completedDays,
  totalDays,
  currentDay,
  streak
}: ProgressCircleProps) => {
  const { t } = useTranslation();
  const percentage = Math.round((completedDays / totalDays) * 100);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getMotivationalMessage = () => {
    if (completedDays === 0) return t('ui.motivation.start');
    if (completedDays < 5) return t('ui.motivation.first_steps');
    if (completedDays === 10) return t('ui.motivation.milestone_10');
    if (completedDays === 20) return t('ui.motivation.milestone_20');
    if (completedDays === 30) return t('ui.motivation.complete');
    if (completedDays < 15) return t('ui.motivation.keep_going');
    return t('ui.motivation.almost_there');
  };

  return (
    <section className="relative overflow-hidden surface-card p-6 2xl:p-10 mb-8 2xl:mb-12">
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 2xl:gap-12">
        {/* Circular Progress */}
        <div className="flex items-center gap-6 2xl:gap-8">
          <div className="relative">
            <svg className="transform -rotate-90 w-32 h-32 2xl:w-40 2xl:h-40 3xl:w-48 3xl:h-48">
              <circle cx="64" cy="64" r="54" strokeWidth="8" fill="none" stroke="hsl(var(--border))" />
              <circle
                cx="64" cy="64" r="54"
                strokeWidth="8" fill="none"
                stroke="url(#goldGradient)"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl 2xl:text-5xl text-gold-light">
                {percentage}%
              </span>
              <span className="text-[10px] 2xl:text-xs uppercase tracking-widest text-muted-foreground">
                {t('ui.labels.complete')}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Stat icon={<Trophy className="h-5 w-5 text-primary" />}
                  label={t('ui.labels.progress')}
                  value={`${completedDays}/${totalDays} ${t('ui.labels.chords')}`} />
            <Stat icon={<Flame className="h-5 w-5 text-primary" />}
                  label={t('ui.labels.streak')}
                  value={`${streak} ${t('ui.labels.days')}`} accent />
            <Stat icon={<Target className="h-5 w-5 text-primary" />}
                  label={t('ui.labels.current_day')}
                  value={`${t('ui.labels.day')} ${currentDay}`} />
          </div>
        </div>

        {/* Motivational Message */}
        <div className="flex-1 max-w-md">
          <div className="rounded-xl border border-primary/25 bg-primary/[0.04] p-5 2xl:p-6">
            <p className="font-display text-xl 2xl:text-2xl text-gold-light leading-snug">
              {getMotivationalMessage()}
            </p>
            {completedDays < totalDays && (
              <p className="mt-2 text-sm text-muted-foreground">
                {t('ui.motivation.remaining', { count: totalDays - completedDays })}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ icon, label, value, accent = false }: {
  icon: React.ReactNode; label: string; value: string; accent?: boolean;
}) => (
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
      {icon}
    </div>
    <div>
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`font-display text-xl 2xl:text-2xl ${accent ? 'text-gold' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  </div>
);
