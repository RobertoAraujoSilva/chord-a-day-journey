
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Music, Target, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChordDiagram } from '@/components/ChordDiagram';
import { DaySelector } from '@/components/DaySelector';
import { ProgressCircle } from '@/components/ProgressCircle';
import { Header } from '@/components/Header';
import { AudioPlayer } from '@/components/AudioPlayer';
import { GuitarIntro } from '@/components/GuitarIntro';
import { CompletionCelebration } from '@/components/CompletionCelebration';
import { chords } from '@/data/chords';
import { useTranslation } from '@/i18n/context';

const Index = () => {
  const { t } = useTranslation();
  const [currentDay, setCurrentDay] = useState(0); // Agora começa no 0 (Lição Introdutória)
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('completedDays');
    const savedIntro = localStorage.getItem('introCompleted');
    const savedStreak = localStorage.getItem('streak');
    const savedLastDate = localStorage.getItem('lastCompletedDate');
    
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
    
    if (savedIntro) {
      const introComplete = JSON.parse(savedIntro);
      setIntroCompleted(introComplete);
      if (introComplete) {
        setShowIntro(false);
        setCurrentDay(1);
      }
    }

    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }

    if (savedLastDate) {
      setLastCompletedDate(savedLastDate);
      // Check if streak should be reset (more than 1 day gap)
      const today = new Date().toDateString();
      const lastDate = new Date(savedLastDate).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (lastDate !== today && lastDate !== yesterday) {
        // Reset streak if more than 1 day has passed
        setStreak(0);
        localStorage.setItem('streak', '0');
      }
    }
  }, []);

  const markDayComplete = () => {
    const today = new Date().toDateString();
    
    if (currentDay === 0) {
      // Completar lição introdutória
      setIntroCompleted(true);
      localStorage.setItem('introCompleted', 'true');
      setShowIntro(false);
      setCurrentDay(1);
      updateStreak(today);
    } else {
      // Completar acorde do dia
      if (!completedDays.includes(currentDay)) {
        const newCompleted = [...completedDays, currentDay];
        setCompletedDays(newCompleted);
        localStorage.setItem('completedDays', JSON.stringify(newCompleted));
        updateStreak(today);
        
        // Show celebration if completing Day 30
        if (currentDay === 30) {
          setTimeout(() => setShowCelebration(true), 500);
        }
      }
    }
  };

  const updateStreak = (today: string) => {
    // Check if user already completed something today
    if (lastCompletedDate === today) {
      return; // Don't increment streak if already completed today
    }

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let newStreak = streak;

    if (lastCompletedDate === yesterday || lastCompletedDate === null) {
      // Continue or start streak
      newStreak = streak + 1;
    } else if (lastCompletedDate !== today) {
      // Reset streak if more than 1 day gap
      newStreak = 1;
    }

    setStreak(newStreak);
    setLastCompletedDate(today);
    localStorage.setItem('streak', newStreak.toString());
    localStorage.setItem('lastCompletedDate', today);
  };

  const handleDaySelect = (day: number) => {
    if (day === 0) {
      setShowIntro(true);
      setCurrentDay(0);
    } else {
      if (!introCompleted) {
        alert(t('errors.intro_required'));
        return;
      }
      setShowIntro(false);
      setCurrentDay(day);
    }
  };

  const currentChord = currentDay > 0 ? chords[currentDay - 1] : null;
  const progress = (completedDays.length / 30) * 100;

  // Se estamos mostrando a introdução
  if (showIntro || currentDay === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <Header />
        
        <div className="container mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 3xl:px-32 py-8 2xl:py-12 3xl:py-16">
          {/* Navegação para lição introdutória */}
          <div className="mb-8 2xl:mb-12 3xl:mb-16">
            <div className="flex items-center justify-center gap-2 2xl:gap-3 mb-4 2xl:mb-6">
              <BookOpen className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-8 3xl:w-8 text-orange-600" />
              <span className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-gray-800">
                {t('content.titles.intro_lesson')}
              </span>
            </div>
            
            {introCompleted && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowIntro(false);
                    setCurrentDay(1);
                  }}
                  className="mb-4"
                >
                  {t('ui.navigation.go_to_chords')} →
                </Button>
              </div>
            )}
          </div>

          <GuitarIntro onComplete={markDayComplete} isCompleted={introCompleted} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      
      {/* Completion Celebration Modal */}
      <CompletionCelebration 
        isOpen={showCelebration} 
        onClose={() => setShowCelebration(false)} 
      />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 3xl:px-32 py-8 2xl:py-12 3xl:py-16">
        {/* Botão para voltar à introdução */}
        <div className="mb-6 2xl:mb-8 3xl:mb-12 text-center">
          <Button
            variant="outline"
            onClick={() => {
              setShowIntro(true);
              setCurrentDay(0);
            }}
            className="flex items-center gap-2 mx-auto"
          >
            <BookOpen className="h-4 w-4" />
            {t('ui.navigation.review_intro')}
          </Button>
        </div>

        {/* Progress Section with Circular Indicator */}
        <ProgressCircle 
          completedDays={completedDays.length}
          totalDays={30}
          currentDay={currentDay}
          streak={streak}
        />

        {/* Day Selector - agora inclui Dia 0 */}
        <DaySelector 
          currentDay={currentDay} 
          completedDays={completedDays}
          onDaySelect={handleDaySelect}
          includeIntro={true}
          introCompleted={introCompleted}
        />

        {/* Main Content */}
        {currentChord && (
          <div className="grid lg:grid-cols-2 gap-8 2xl:gap-12 3xl:gap-16 mt-8 2xl:mt-12 3xl:mt-16">
            {/* Chord Information */}
            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-gray-600">
                      {t('ui.labels.day')} {currentDay}
                    </span>
                  </div>
                  <h1 className="text-4xl 2xl:text-5xl 3xl:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 2xl:mb-3 3xl:mb-4">
                    {currentChord.name}
                  </h1>
                  <p className="text-lg 2xl:text-xl 3xl:text-2xl text-gray-600 mb-4 2xl:mb-6">
                    {t(`content.chords.${currentChord.name}.fullName`)}
                  </p>
                  
                  {/* Audio Player */}
                  <div className="mb-4">
                    <AudioPlayer chordName={currentChord.name} className="justify-center" />
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    {(() => {
                      const difficulty = t(`content.chords.${currentChord.name}.difficulty`);
                      const difficultyLower = difficulty.toLowerCase();
                      if (difficultyLower === 'fácil' || difficultyLower === 'easy') {
                        return (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {difficulty}
                          </span>
                        );
                      } else if (difficultyLower === 'médio' || difficultyLower === 'medium') {
                        return (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                            {difficulty}
                          </span>
                        );
                      } else {
                        return (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                            {difficulty}
                          </span>
                        );
                      }
                    })()}
                  </div>
                </div>

                <div className="space-y-4 2xl:space-y-6 3xl:space-y-8">
                  <div>
                    <h3 className="font-semibold text-base 2xl:text-lg 3xl:text-xl text-gray-800 mb-2 2xl:mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" />
                      {t('ui.labels.how_to_play')}
                    </h3>
                    <p className="text-sm 2xl:text-base 3xl:text-lg text-gray-700 leading-relaxed">
                      {t(`content.chords.${currentChord.name}.instructions`)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base 2xl:text-lg 3xl:text-xl text-gray-800 mb-2 2xl:mb-3 flex items-center gap-2">
                      <Music className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" />
                      {t('ui.labels.important_tip')}
                    </h3>
                    <p className="text-sm 2xl:text-base 3xl:text-lg text-gray-700 leading-relaxed">
                      {t(`content.chords.${currentChord.name}.tip`)}
                    </p>
                  </div>

                  {currentChord.commonSongs && (
                    <div>
                      <h3 className="font-semibold text-base 2xl:text-lg 3xl:text-xl text-gray-800 mb-2 2xl:mb-3">
                        {t('ui.labels.famous_songs')}
                      </h3>
                      <ul className="text-sm 2xl:text-base 3xl:text-lg text-gray-700 space-y-1 2xl:space-y-2">
                        {currentChord.commonSongs.map((song, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 3xl:w-3 3xl:h-3 bg-orange-400 rounded-full"></div>
                            {song}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chord Diagram */}
            <Card className="p-6 2xl:p-8 3xl:p-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <h2 className="text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-center mb-6 2xl:mb-8 3xl:mb-12 text-gray-800">
                  {t('ui.labels.chord_diagram')}
                </h2>
                <ChordDiagram chord={currentChord} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation and Actions */}
        <div className="flex justify-between items-center mt-8 2xl:mt-12 3xl:mt-16">
          <Button
            variant="outline"
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className="flex items-center gap-2 h-10 2xl:h-14 3xl:h-16 px-4 2xl:px-6 3xl:px-8 text-sm 2xl:text-base 3xl:text-lg"
          >
            <ChevronLeft className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" />
            {t('ui.buttons.previous')}
          </Button>

          <Button
            onClick={markDayComplete}
            disabled={completedDays.includes(currentDay)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-10 2xl:h-14 3xl:h-16 px-8 2xl:px-12 3xl:px-16 text-sm 2xl:text-base 3xl:text-lg"
          >
            {completedDays.includes(currentDay) ? t('ui.buttons.completed') : t('ui.buttons.complete')}
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
            disabled={currentDay === 30}
            className="flex items-center gap-2 h-10 2xl:h-14 3xl:h-16 px-4 2xl:px-6 3xl:px-8 text-sm 2xl:text-base 3xl:text-lg"
          >
            {t('ui.buttons.next')}
            <ChevronRight className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
