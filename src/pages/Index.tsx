
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Music, Target, Trophy, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChordDiagram } from '@/components/ChordDiagram';
import { DaySelector } from '@/components/DaySelector';
import { Header } from '@/components/Header';
import { AudioPlayer } from '@/components/AudioPlayer';
import { GuitarIntro } from '@/components/GuitarIntro';
import { chords } from '@/data/chords';
import { useTranslation } from '@/i18n/context';

const Index = () => {
  const { t } = useTranslation();
  const [currentDay, setCurrentDay] = useState(0); // Agora começa no 0 (Lição Introdutória)
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('completedDays');
    const savedIntro = localStorage.getItem('introCompleted');
    
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
  }, []);

  const markDayComplete = () => {
    if (currentDay === 0) {
      // Completar lição introdutória
      setIntroCompleted(true);
      localStorage.setItem('introCompleted', 'true');
      setShowIntro(false);
      setCurrentDay(1);
    } else {
      // Completar acorde do dia
      if (!completedDays.includes(currentDay)) {
        const newCompleted = [...completedDays, currentDay];
        setCompletedDays(newCompleted);
        localStorage.setItem('completedDays', JSON.stringify(newCompleted));
      }
    }
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
        
        <div className="container mx-auto px-4 py-8">
          {/* Navegação para lição introdutória */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-orange-600" />
              <span className="text-lg font-semibold text-gray-800">
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Botão para voltar à introdução */}
        <div className="mb-6 text-center">
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

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-600" />
              <span className="text-lg font-semibold text-gray-800">
                {t('ui.labels.progress')}: {completedDays.length}/30 {t('ui.labels.chords_progress')}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}{t('ui.labels.percent_complete')}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

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
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
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
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    {currentChord.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
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

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      {t('ui.labels.how_to_play')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t(`content.chords.${currentChord.name}.instructions`)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      {t('ui.labels.important_tip')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t(`content.chords.${currentChord.name}.tip`)}
                    </p>
                  </div>

                  {currentChord.commonSongs && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {t('ui.labels.famous_songs')}
                      </h3>
                      <ul className="text-gray-700 space-y-1">
                        {currentChord.commonSongs.map((song, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
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
            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
                  {t('ui.labels.chord_diagram')}
                </h2>
                <ChordDiagram chord={currentChord} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation and Actions */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('ui.buttons.previous')}
          </Button>

          <Button
            onClick={markDayComplete}
            disabled={completedDays.includes(currentDay)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-2"
          >
            {completedDays.includes(currentDay) ? t('ui.buttons.completed') : t('ui.buttons.complete')}
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
            disabled={currentDay === 30}
            className="flex items-center gap-2"
          >
            {t('ui.buttons.next')}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
