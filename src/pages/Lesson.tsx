import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { chords } from "@/data/chords";
import {
  Calendar,
  Music,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChordDiagram } from "@/components/ChordDiagram";
import { AudioPlayer } from "@/components/AudioPlayer";

interface LessonProps {
  completedDays: number[];
  onComplete: (day: number) => void;
}

export default function Lesson({ completedDays, onComplete }: LessonProps) {
  const { day } = useParams();
  const currentDay = Number(day);
  const chord = chords[currentDay - 1];

  if (!chord) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent>
              <div className="text-center mb-6">
                <div className="flex justify-center gap-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Dia {currentDay}
                </div>

                <h1 className="text-4xl font-bold text-orange-600">
                  {chord.name}
                </h1>

                <AudioPlayer chordName={chord.name} className="mt-4" />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="flex gap-2 font-semibold">
                    <Target className="h-4 w-4" />
                    Como tocar
                  </h3>
                  <p>{chord.instructions}</p>
                </div>

                <div>
                  <h3 className="flex gap-2 font-semibold">
                    <Music className="h-4 w-4" />
                    Dica
                  </h3>
                  <p>{chord.tip}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent>
              <ChordDiagram chord={chord} />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" disabled={currentDay === 1}>
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>

          <Button
            onClick={() => onComplete(currentDay)}
            disabled={completedDays.includes(currentDay)}
          >
            Concluir
          </Button>

          <Button variant="outline" disabled={currentDay === 30}>
            Próximo <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
