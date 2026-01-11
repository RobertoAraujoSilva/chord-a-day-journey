import { Header } from "@/components/Header";
import { GuitarIntro } from "@/components/GuitarIntro";
import { BookOpen } from "lucide-react";

interface IntroLessonProps {
  onComplete: () => void;
  introCompleted: boolean;
}

export default function IntroLesson({
  onComplete,
  introCompleted,
}: IntroLessonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-orange-600" />
            <h1 className="text-2xl font-bold">Lição Introdutória</h1>
          </div>
        </div>

        <GuitarIntro onComplete={onComplete} isCompleted={introCompleted} />
      </div>
    </div>
  );
}
