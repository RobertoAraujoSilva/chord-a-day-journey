import { useParams, useNavigate } from "react-router-dom";
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
import { useProgress } from "@/contexts/ProgressContext";
import { useTranslation } from "@/i18n/context";

export default function Lesson() {
  const { day } = useParams();
  const navigate = useNavigate();
  const currentDay = Number(day);
  const chord = chords[currentDay - 1];
  const { completedDays, markDayComplete } = useProgress();
  const { t } = useTranslation();

  if (!chord) return null;

  const handlePrevious = () => {
    if (currentDay > 1) {
      navigate(`/lesson/${currentDay - 1}`);
    }
  };

  const handleNext = () => {
    if (currentDay < 30) {
      navigate(`/lesson/${currentDay + 1}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="flex justify-center gap-2 text-gray-500">
                <Calendar className="h-4 w-4" />
                {t("ui.labels.day")} {currentDay}
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
                  {t("ui.labels.how_to_play")}
                </h3>
                <p>{t(`content.chords.${chord.name}.instructions`)}</p>
              </div>

              <div>
                <h3 className="flex gap-2 font-semibold">
                  <Music className="h-4 w-4" />
                  {t("ui.labels.important_tip")}
                </h3>
                <p>{t(`content.chords.${chord.name}.tip`)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="pt-6">
            <ChordDiagram chord={chord} />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          disabled={currentDay === 1}
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-4 w-4" /> {t("ui.buttons.previous")}
        </Button>

        <Button
          onClick={() => markDayComplete(currentDay)}
          disabled={completedDays.includes(currentDay)}
        >
          {completedDays.includes(currentDay) 
            ? t("ui.buttons.completed") 
            : t("ui.buttons.complete")}
        </Button>

        <Button 
          variant="outline" 
          disabled={currentDay === 30}
          onClick={handleNext}
        >
          {t("ui.buttons.next")} <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
