import { useNavigate } from "react-router-dom";
import { chords } from "@/data/chords";
import { useI18n } from "@/i18n/context";
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

  const isDone = completedDays.includes(day);

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* CARD TEXTO */}
        <Card className="surface-card border-0 overflow-hidden">
          <CardContent className="pt-8 pb-8 relative">
            <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative text-center mb-8">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {t("ui.labels.day")} {day}
              </div>

              <h1 className="mt-3 font-display text-6xl 2xl:text-7xl text-gold-light leading-none">
                {chord.name}
              </h1>

              <div className="mt-4 flex justify-center">
                <AudioPlayer chordName={chord.name} />
              </div>
            </div>

            <div className="space-y-6">
              <Section
                icon={<Target className="h-4 w-4 text-primary" />}
                title={t("ui.labels.how_to_play")}
              >
                {t(`content.chords.${chord.name}.instructions`)}
              </Section>

              <Section
                icon={<Music className="h-4 w-4 text-primary" />}
                title={t("ui.labels.important_tip")}
              >
                {t(`content.chords.${chord.name}.tip`)}
              </Section>
            </div>
          </CardContent>
        </Card>

        {/* CARD DIAGRAMA */}
        <Card className="surface-card border-0">
          <CardContent className="pt-8 pb-8">
            <ChordDiagram chord={chord} />
          </CardContent>
        </Card>
      </div>

      {/* NAVEGAÇÃO */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <Button
          variant="outline"
          disabled={day === 1}
          onClick={() => navigate(`/lesson/${day - 1}`)}
          className="rounded-full border-border bg-card/60 hover:border-primary/60 hover:text-gold-light uppercase tracking-widest text-xs"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("ui.buttons.previous")}
        </Button>

        <Button
          onClick={() => markDayComplete(day)}
          disabled={isDone}
          className={`rounded-full uppercase tracking-widest text-xs px-6 ${
            isDone
              ? "bg-primary/10 text-gold-light border border-primary/40"
              : "bg-gold-gradient text-background hover:opacity-90 shadow-elegant"
          }`}
        >
          {isDone ? t("ui.buttons.completed") : t("ui.buttons.complete")}
        </Button>

        <Button
          variant="outline"
          disabled={day === 30}
          onClick={() => navigate(`/lesson/${day + 1}`)}
          className="rounded-full border-border bg-card/60 hover:border-primary/60 hover:text-gold-light uppercase tracking-widest text-xs"
        >
          {t("ui.buttons.next")}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

const Section = ({ icon, title, children }: {
  icon: React.ReactNode; title: string; children: React.ReactNode;
}) => (
  <div>
    <h3 className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-2">
      {icon}
      {title}
    </h3>
    <p className="text-foreground/90 leading-relaxed">{children}</p>
  </div>
);
