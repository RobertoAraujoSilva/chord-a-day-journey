import { useParams } from "react-router-dom";
import { LessonContent } from "@/components/LessonContent";
import { NavigationPanel } from "@/components/NavigationPanel";
import { SEO } from "@/components/SEO";

export default function Lesson() {
  const { day } = useParams();

  if (!day) return null;

  const dayNum = Number(day);

  return (
    <>
      <SEO
        title={`Day ${dayNum} — Chord a Day Journey`}
        description={`Day ${dayNum} of your 30-day guitar journey: today's chord, diagram, common mistake, and a 1–3 minute practical exercise.`}
        path={`/lesson/${dayNum}`}
        type="article"
      />
      <NavigationPanel />
      <br />
      <LessonContent day={dayNum} />
    </>
  );
}
