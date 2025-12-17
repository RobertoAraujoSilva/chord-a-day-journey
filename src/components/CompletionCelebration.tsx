import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Music, Sparkles, X } from 'lucide-react';
import { useTranslation } from '@/i18n/context';

interface CompletionCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompletionCelebration = ({ isOpen, onClose }: CompletionCelebrationProps) => {
  const { t } = useTranslation();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Auto-hide confetti after animation
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'][
                      Math.floor(Math.random() * 5)
                    ],
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Modal Card */}
        <Card className="max-w-2xl w-full relative animate-scale-in shadow-2xl border-4 border-orange-400">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
          >
            <X className="h-5 w-5" />
          </Button>

          <CardContent className="p-8 md:p-12 text-center">
            {/* Trophy Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Trophy className="h-24 w-24 text-yellow-500 animate-bounce" />
                <Sparkles className="h-8 w-8 text-orange-500 absolute -top-2 -right-2 animate-pulse" />
                <Sparkles className="h-6 w-6 text-red-500 absolute -bottom-1 -left-1 animate-pulse" />
              </div>
            </div>

            {/* Congratulations Message */}
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              🎉 {t('ui.celebration.title')} 🎉
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
              {t('ui.celebration.message')}
            </p>

            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl">
              <div>
                <div className="text-3xl font-bold text-orange-600">30</div>
                <div className="text-sm text-gray-600">{t('ui.celebration.chords_learned')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">30</div>
                <div className="text-sm text-gray-600">{t('ui.celebration.days_completed')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">{t('ui.celebration.progress')}</div>
              </div>
            </div>

            {/* Motivational Message */}
            <div className="bg-white p-6 rounded-xl border-2 border-orange-200 mb-6">
              <Music className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('ui.celebration.next_steps')}
              </p>
            </div>

            {/* Close Button */}
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 text-lg"
            >
              {t('ui.celebration.continue')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-confetti {
          animation: confetti linear forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
