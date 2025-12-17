
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
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        {t('ui.navigation.select_day')}
      </h2>
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-4 px-2">
          {/* Introductory Lesson (Day 0) */}
          {includeIntro && (
            <Button
              variant={currentDay === 0 ? "default" : "outline"}
              size="sm"
              onClick={() => onDaySelect(0)}
              className={`
                min-w-[60px] h-12 relative transition-all duration-200 flex items-center gap-1
                ${currentDay === 0 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                  : introCompleted
                  ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
                  : 'hover:bg-blue-50 hover:border-blue-300'
                }
              `}
            >
              <BookOpen className="h-3 w-3" />
              <span className="text-xs">{t('ui.labels.intro')}</span>
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
                min-w-[50px] h-12 relative transition-all duration-200
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
