import { Header } from "@/components/Header";
import { LoveMeDoLesson } from "@/components/LoveMeDoLesson";

export default function BonusLesson() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      <LoveMeDoLesson onBack={() => history.back()} />
    </div>
  );
}
