import { ProgressCircle } from "@/components/ProgressCircle";
import { DaySelector } from "@/components/DaySelector";
import { NavigationPanel } from "@/components/NavigationPanel";
import { SEO } from "@/components/SEO";

import { useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";

import { LessonContent } from "@/components/LessonContent";

export default function Home() {
  const navigate = useNavigate();
  const { currentDay, completedDays, introCompleted, streak, setCurrentDay } =
    useProgress();

  return (
    <div className="space-y-8">
      <SEO
        title="Chord a Day Journey — Learn 30 Guitar Chords in 30 Days"
        description="Daily guitar chord lessons for absolute beginners. Track your progress, practice 5–10 minutes a day, and master 30 essential chords."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "30 Chords in 30 Days",
          description: "A 30-day guitar journey teaching one essential chord per day with diagrams, audio, and short exercises.",
          provider: {
            "@type": "Organization",
            name: "Chord a Day Journey",
            sameAs: "https://chord-a-day-journey.lovable.app/",
          },
          educationalLevel: "Beginner",
          inLanguage: ["pt-BR", "en-US"],
        }}
      />
      <NavigationPanel />

      <ProgressCircle
        completedDays={completedDays.length}
        totalDays={30}
        currentDay={currentDay}
        streak={streak}
      />

      <DaySelector
        currentDay={currentDay}
        completedDays={completedDays}
        includeIntro
        introCompleted={introCompleted}
        onDaySelect={(day) => {
          if (day === 0) {
            navigate("/intro");
          } else {
            setCurrentDay(day);
          }
        }}
      />

      <LessonContent day={currentDay} />
    </div>
  );
}
