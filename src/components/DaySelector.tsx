
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen } from 'lucide-react';
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

  return (
    <div className="mb-6 2xl:mb-8 3xl:mb-12">
      <h2 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-gray-800 mb-4 2xl:mb-6 3xl:mb-8 text-center">
        {t('ui.navigation.select_day')}
      </h2>
      <ScrollArea className="w-full">
        <div className="flex gap-2 2xl:gap-3 3xl:gap-4 pb-4 px-2">
          {/* Introductory Lesson (Day 0) */}
          {includeIntro && (
            <Button
              variant={currentDay === 0 ? "default" : "outline"}
              size="sm"
              onClick={() => onDaySelect(0)}
              className={`
                min-w-[60px] 2xl:min-w-[100px] 3xl:min-w-[140px] 
                h-12 2xl:h-16 3xl:h-20 
                relative transition-all duration-200 flex items-center gap-1 2xl:gap-2
                ${currentDay === 0 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                  : introCompleted
                  ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
                  : 'hover:bg-blue-50 hover:border-blue-300'
                }
              `}
            >
              <BookOpen className="h-3 w-3 2xl:h-4 2xl:w-4 3xl:h-5 3xl:w-5" />
              <span className="text-xs 2xl:text-sm 3xl:text-base">{t('ui.labels.intro')}</span>
              {introCompleted && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </Button>
          )}
          
          {/* Chord Days (1-30) */}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <Button
              key={day}
              variant={currentDay === day ? "default" : "outline"}
              size="sm"
              onClick={() => onDaySelect(day)}
              className={`
                min-w-[50px] 2xl:min-w-[80px] 3xl:min-w-[120px] 
                h-12 2xl:h-16 3xl:h-20 
                text-sm 2xl:text-base 3xl:text-lg
                relative transition-all duration-200
                ${currentDay === day 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105' 
                  : completedDays.includes(day)
                  ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
                  : 'hover:bg-orange-50 hover:border-orange-300'
                }
              `}
            >
              {day}
              {completedDays.includes(day) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
