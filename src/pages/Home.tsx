import { ProgressCircle } from "@/components/ProgressCircle";
import { DaySelector } from "@/components/DaySelector";
import { Button } from "@/components/ui/button";
import { BookOpen, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { useTranslation } from "@/i18n/context";

export default function Home() {
  const navigate = useNavigate();
  const { currentDay, completedDays, introCompleted, streak } = useProgress();
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/intro")}
          className="flex gap-2"
        >
          <BookOpen className="h-4 w-4" />
          {t("ui.navigation.review_intro")}
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate("/slideshow")}
          className="flex gap-2"
        >
          <Play className="h-4 w-4" />
          {t("ui.slideshow.open")}
        </Button>
      </div>

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
        onDaySelect={(day) =>
          day === 0 ? navigate("/intro") : navigate(`/lesson/${day}`)
        }
      />
    </div>
  );
}
