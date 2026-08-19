import { useParams } from "react-router-dom";
import { LessonContent } from "@/components/LessonContent";
import { NavigationPanel } from "@/components/NavigationPanel";
import { PageHeader } from "@/components/PageHeader";
import { SEO } from "@/components/SEO";
import { useTranslation } from "@/i18n/context";

export default function Lesson() {
  const { day } = useParams();
  const { t } = useTranslation();

  if (!day) return null;

  const dayNum = Number(day);

  return (
    <div className="space-y-8">
      <SEO
        title={`Day ${dayNum} — Chord a Day Journey`}
        description={`Day ${dayNum} of your 30-day guitar journey: today's chord, diagram, common mistake, and a 1–3 minute practical exercise.`}
        path={`/lesson/${dayNum}`}
        type="article"
      />

      <PageHeader
        eyebrow={`${t("ui.labels.day")} · ${dayNum} / 30`}
        title={`${t("ui.labels.day")} ${dayNum}`}
      />

      <NavigationPanel />

      <LessonContent day={dayNum} />
    </div>
  );
}
