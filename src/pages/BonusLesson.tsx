import { LoveMeDoLesson } from "@/components/LoveMeDoLesson";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";

export default function BonusLesson() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Bonus Lesson: Love Me Do — Chord a Day Journey"
        description="Apply the chords you learned with a guided play-along of The Beatles' Love Me Do."
        path="/bonus"
        type="article"
      />
      <LoveMeDoLesson onBack={() => navigate("/")} />
    </>
  );
}
