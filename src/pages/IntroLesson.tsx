import { GuitarIntro } from "@/components/GuitarIntro";
import { BookOpen } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useTranslation } from "@/i18n/context";
import { NavigationPanel } from "@/components/NavigationPanel";

export default function IntroLesson() {
  const { introCompleted, markIntroComplete } = useProgress();
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <NavigationPanel />
      <div className="text-center">
        <div className="flex justify-center gap-2 mb-4">
          <BookOpen className="h-6 w-6 text-orange-600" />
          <h1 className="text-2xl font-bold">
            {t("ui.navigation.intro_lesson")}
          </h1>
        </div>
      </div>

      <GuitarIntro
        onComplete={markIntroComplete}
        isCompleted={introCompleted}
      />
    </div>
  );
}
