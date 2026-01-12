import { ProgressCircle } from "@/components/ProgressCircle";
import { DaySelector } from "@/components/DaySelector";
import { NavigationPanel } from "@/components/NavigationPanel";

import { useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";

import { LessonContent } from "@/components/LessonContent";

export default function Home() {
  const navigate = useNavigate();
  const { currentDay, completedDays, introCompleted, streak, setCurrentDay } =
    useProgress();

  return (
    <div className="space-y-8">
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
