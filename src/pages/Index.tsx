
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Music, Target, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChordDiagram } from '@/components/ChordDiagram';
import { DaySelector } from '@/components/DaySelector';
import { Header } from '@/components/Header';
import { AudioPlayer } from '@/components/AudioPlayer';
import { chords } from '@/data/chords';

const Index = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completedDays');
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, []);

  const markDayComplete = () => {
    if (!completedDays.includes(currentDay)) {
      const newCompleted = [...completedDays, currentDay];
      setCompletedDays(newCompleted);
      localStorage.setItem('completedDays', JSON.stringify(newCompleted));
    }
  };

  const currentChord = chords[currentDay - 1];
  const progress = (completedDays.length / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-600" />
              <span className="text-lg font-semibold text-gray-800">
                Progresso: {completedDays.length}/30 acordes
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% concluído
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Day Selector */}
        <DaySelector 
          currentDay={currentDay} 
          completedDays={completedDays}
          onDaySelect={setCurrentDay}
        />

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Chord Information */}
          <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-600">
                    Dia {currentDay}
                  </span>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  {currentChord.name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {currentChord.fullName}
                </p>
                
                {/* Audio Player */}
                <div className="mb-4">
                  <AudioPlayer chordName={currentChord.name} className="justify-center" />
                </div>
                
                <div className="flex justify-center gap-2">
                  {currentChord.difficulty === 'Fácil' && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Fácil
                    </span>
                  )}
                  {currentChord.difficulty === 'Médio' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Médio
                    </span>
                  )}
                  {currentChord.difficulty === 'Difícil' && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      Difícil
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Como tocar:
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {currentChord.instructions}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    Dica importante:
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {currentChord.tip}
                  </p>
                </div>

                {currentChord.commonSongs && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Músicas famosas que usam este acorde:
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
                Diagrama do Acorde
              </h2>
              <ChordDiagram chord={currentChord} />
            </CardContent>
          </Card>
        </div>

        {/* Navigation and Actions */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <Button
            onClick={markDayComplete}
            disabled={completedDays.includes(currentDay)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-2"
          >
            {completedDays.includes(currentDay) ? '✓ Concluído' : 'Marcar como Aprendido'}
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
            disabled={currentDay === 30}
            className="flex items-center gap-2"
          >
            Próximo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
