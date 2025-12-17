
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

  // Calculate the highest accessible day (last completed + 1, or 1 if none completed)
  const highestAccessibleDay = completedDays.length > 0 
    ? Math.max(...completedDays) + 1 
    : 1;

  return (
    <div className="mb-6 2xl:mb-8 3xl:mb-12">
      <h2 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-gray-800 mb-4 2xl:mb-6 3xl:mb-8 text-center">
        {t('ui.navigation.select_day')}
      </h2>
      
      {/* Responsive Grid Layout with Circular Buttons */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 2xl:gap-3 3xl:gap-4 px-2">
        {/* Introductory Lesson (Day 0) */}
        {includeIntro && (
          <Button
            variant={currentDay === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => onDaySelect(0)}
            className={`
              col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2
              min-h-[48px] h-14 2xl:h-18 3xl:h-22
              rounded-2xl
              relative transition-all duration-300 flex items-center justify-center gap-1 2xl:gap-2
              ${currentDay === 0 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl scale-105 border-2 border-blue-400 ring-4 ring-blue-200' 
                : introCompleted
                ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-2 border-green-400 hover:scale-105 hover:shadow-lg'
                : 'bg-white hover:bg-blue-50 border-2 border-gray-300 hover:border-blue-400 hover:scale-105'
              }
            `}
            aria-label={`${t('ui.labels.intro')}${introCompleted ? ' - Completed' : ''}`}
            aria-current={currentDay === 0 ? 'true' : 'false'}
          >
            <BookOpen className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6 flex-shrink-0" />
            <span className="text-xs 2xl:text-sm 3xl:text-base font-bold truncate">{t('ui.labels.intro')}</span>
            {introCompleted && (
              <CheckCircle2 className="absolute -top-2 -right-2 h-6 w-6 2xl:h-7 2xl:w-7 text-white bg-green-500 rounded-full p-1 shadow-lg" />
            )}
          </Button>
        )}
        
        {/* Chord Days (1-30) - Circular Buttons */}
        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
          const isCompleted = completedDays.includes(day);
          const isCurrent = currentDay === day;
          const isLocked = day > highestAccessibleDay && !isCompleted;
          
          return (
            <Button
              key={day}
              variant={isCurrent ? "default" : "outline"}
              size="sm"
              onClick={() => !isLocked && onDaySelect(day)}
              disabled={isLocked}
              className={`
                aspect-square min-h-[48px] h-14 w-14 2xl:h-18 2xl:w-18 3xl:h-22 3xl:w-22
                rounded-full
                text-sm 2xl:text-lg 3xl:text-xl font-bold
                relative transition-all duration-300
                ${isCurrent 
                  ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl scale-110 border-2 border-orange-400 ring-4 ring-orange-200' 
                  : isCompleted
                  ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-2 border-green-400 hover:scale-110 hover:shadow-lg'
                  : isLocked
                  ? 'bg-gray-100 text-gray-400 border-2 border-gray-300 cursor-not-allowed opacity-60'
                  : 'bg-white hover:bg-orange-50 border-2 border-gray-300 hover:border-orange-400 hover:scale-110 hover:shadow-lg'
                }
              `}
              aria-label={`Day ${day}${isCompleted ? ' - Completed' : ''}${isCurrent ? ' - Current' : ''}${isLocked ? ' - Locked' : ''}`}
              aria-current={isCurrent ? 'true' : 'false'}
              aria-disabled={isLocked}
            >
              {isLocked ? (
                <Lock className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" />
              ) : (
                day
              )}
              {isCompleted && !isCurrent && (
                <CheckCircle2 className="absolute -top-2 -right-2 h-6 w-6 2xl:h-7 2xl:w-7 text-white bg-green-500 rounded-full p-1 shadow-lg" />
              )}
            </Button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs 2xl:text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-2 border-orange-400"></div>
          <span>{t('ui.labels.current_day')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-400"></div>
          <span>{t('ui.labels.completed')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
            <Lock className="h-3 w-3 text-gray-400" />
          </div>
          <span>{t('ui.labels.locked')}</span>
        </div>
      </div>
    </div>
  );
};
