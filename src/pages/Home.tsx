import { Header } from "@/components/Header";
import { ProgressCircle } from "@/components/ProgressCircle";
import { DaySelector } from "@/components/DaySelector";
import { Button } from "@/components/ui/button";
import { BookOpen, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  currentDay: number;
  completedDays: number[];
  introCompleted: boolean;
  streak: number;
}

export default function Home({
  currentDay,
  completedDays,
  introCompleted,
  streak,
}: HomeProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/intro")}
            className="flex gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Introdução
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/slideshow")}
            className="flex gap-2"
          >
            <Play className="h-4 w-4" />
            Slideshow
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
    </div>
  );
}
