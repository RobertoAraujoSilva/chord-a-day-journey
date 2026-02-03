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
  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Motivational messages based on progress
  const getMotivationalMessage = () => {
    if (completedDays === 0) {
      return t('ui.motivation.start');
    } else if (completedDays < 5) {
      return t('ui.motivation.first_steps');
    } else if (completedDays === 10) {
      return t('ui.motivation.milestone_10');
    } else if (completedDays === 20) {
      return t('ui.motivation.milestone_20');
    } else if (completedDays === 30) {
      return t('ui.motivation.complete');
    } else if (completedDays < 15) {
      return t('ui.motivation.keep_going');
    } else {
      return t('ui.motivation.almost_there');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 2xl:gap-8 3xl:gap-12 mb-8 2xl:mb-12 3xl:mb-16 p-6 2xl:p-8 3xl:p-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
      {/* Circular Progress */}
      <div className="flex items-center gap-6 2xl:gap-8">
        <div className="relative">
          <svg className="transform -rotate-90 w-32 h-32 2xl:w-40 2xl:h-40 3xl:w-48 3xl:h-48">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-orange-500 transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-gray-800">
              {percentage}%
            </span>
            <span className="text-xs 2xl:text-sm 3xl:text-base text-gray-600">
              {t('ui.labels.complete')}
            </span>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="space-y-3 2xl:space-y-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 text-amber-600" />
            <div>
              <p className="text-sm 2xl:text-base 3xl:text-lg text-gray-600">
                {t('ui.labels.progress')}
              </p>
              <p className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-gray-800">
                {completedDays}/{totalDays} {t('ui.labels.chords')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Flame className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 text-orange-600" />
            <div>
              <p className="text-sm 2xl:text-base 3xl:text-lg text-gray-600">
                {t('ui.labels.streak')}
              </p>
              <p className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-orange-600">
                {streak} {t('ui.labels.days')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 text-blue-600" />
            <div>
              <p className="text-sm 2xl:text-base 3xl:text-lg text-gray-600">
                {t('ui.labels.current_day')}
              </p>
              <p className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-blue-600">
                {t('ui.labels.day')} {currentDay}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="flex-1 text-center lg:text-left">
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4 2xl:p-6 3xl:p-8">
          <p className="text-base 2xl:text-lg 3xl:text-xl font-semibold text-gray-800 mb-2">
            {getMotivationalMessage()}
          </p>
          {completedDays < totalDays && (
            <p className="text-sm 2xl:text-base 3xl:text-lg text-gray-600">
              {t('ui.motivation.remaining', { count: totalDays - completedDays })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
