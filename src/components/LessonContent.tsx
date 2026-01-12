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

interface LessonContentProps {
  day: number;
}

export function LessonContent({ day }: LessonContentProps) {
  const chord = chords[day - 1];
  const { completedDays, markDayComplete } = useProgress();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!chord) return null;

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* CARD TEXTO */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="flex justify-center gap-2 text-gray-500">
                <Calendar className="h-4 w-4" />
                {t("ui.labels.day")} {day}
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

        {/* CARD DIAGRAMA */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="pt-6">
            <ChordDiagram chord={chord} />
          </CardContent>
        </Card>
      </div>

      {/* NAVEGAÇÃO */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={day === 1}
          onClick={() => navigate(`/lesson/${day - 1}`)}
        >
          <ChevronLeft className="h-4 w-4" />
          {t("ui.buttons.previous")}
        </Button>

        <Button
          onClick={() => markDayComplete(day)}
          disabled={completedDays.includes(day)}
        >
          {completedDays.includes(day)
            ? t("ui.buttons.completed")
            : t("ui.buttons.complete")}
        </Button>

        <Button
          variant="outline"
          disabled={day === 30}
          onClick={() => navigate(`/lesson/${day + 1}`)}
        >
          {t("ui.buttons.next")}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
