import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Minus, Plus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChordDiagram } from '@/components/ChordDiagram';
import { chords } from '@/data/chords';
import { useTranslation } from '@/i18n/context';

const SPEED_OPTIONS = [1000, 2000, 3000, 5000, 7000, 10000];

interface ChordSlideshowProps {
  onClose?: () => void;
}

export const ChordSlideshow = ({ onClose }: ChordSlideshowProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(2); // Default: 3000ms (3s)
  
  const speed = SPEED_OPTIONS[speedIndex];
  const currentChord = chords[currentIndex];
  const totalChords = chords.length;

  // Auto-advance effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalChords);
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, totalChords]);

  // Keyboard controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case ' ':
        e.preventDefault();
        setIsPlaying((prev) => !prev);
        break;
      case 'ArrowLeft':
        setCurrentIndex((prev) => (prev - 1 + totalChords) % totalChords);
        break;
      case 'ArrowRight':
        setCurrentIndex((prev) => (prev + 1) % totalChords);
        break;
      case '+':
      case '=':
        setSpeedIndex((prev) => Math.max(0, prev - 1)); // Faster = lower index
        break;
      case '-':
        setSpeedIndex((prev) => Math.min(SPEED_OPTIONS.length - 1, prev + 1)); // Slower = higher index
        break;
    }
  }, [totalChords]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalChords) % totalChords);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalChords);
  };

  const decreaseSpeed = () => {
    setSpeedIndex((prev) => Math.min(SPEED_OPTIONS.length - 1, prev + 1));
  };

  const increaseSpeed = () => {
    setSpeedIndex((prev) => Math.max(0, prev - 1));
  };

  const resetSlideshow = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-6 md:p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {t('ui.slideshow.title')}
            </h2>
            <p className="text-muted-foreground mt-2">
              {t('ui.slideshow.chord_of', { current: currentIndex + 1, total: totalChords })}
            </p>
          </div>

          {/* Chord Display */}
          <div className="text-center mb-6">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              {currentChord.name}
            </h3>
            <div className="max-w-md mx-auto">
              <ChordDiagram chord={currentChord} />
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-1 mb-6 flex-wrap max-w-lg mx-auto">
            {chords.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-orange-500 scale-125'
                    : index < currentIndex
                    ? 'bg-orange-300'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to chord ${index + 1}`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="h-12 w-12"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`h-14 w-14 rounded-full ${
                  isPlaying
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                }`}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="h-12 w-12"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={resetSlideshow}
                className="h-10 w-10"
                title={t('ui.slideshow.reset')}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>

            {/* Speed Controls */}
            <div className="flex items-center gap-3 bg-secondary/50 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t('ui.slideshow.speed')}:
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={decreaseSpeed}
                disabled={speedIndex === SPEED_OPTIONS.length - 1}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-bold text-foreground">
                {speed / 1000}s
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={increaseSpeed}
                disabled={speedIndex === 0}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            {t('ui.slideshow.keyboard_hint')}
          </p>

          {/* Close Button */}
          {onClose && (
            <div className="text-center mt-6">
              <Button variant="outline" onClick={onClose}>
                {t('ui.slideshow.close')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
