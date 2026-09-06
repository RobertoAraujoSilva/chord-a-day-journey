import { GuitarIntro } from "@/components/GuitarIntro";
import { useProgress } from "@/contexts/ProgressContext";
import { useTranslation } from "@/i18n/context";
import { NavigationPanel } from "@/components/NavigationPanel";
import { PageHeader } from "@/components/PageHeader";
import { SEO } from "@/components/SEO";

export default function IntroLesson() {
  const { introCompleted, markIntroComplete } = useProgress();
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <SEO
        title="Intro Lesson — Guitar Anatomy & Posture for Beginners"
        description="Start here: learn the parts of the guitar, finger naming, and proper posture before your first chord."
        path="/intro"
      />

      <PageHeader
        eyebrow={t("ui.hero.day_zero")}
        title={t("ui.navigation.intro_lesson")}
      />

      <NavigationPanel />

      <GuitarIntro
        onComplete={markIntroComplete}
        isCompleted={introCompleted}
      />
    </div>
  );
}
