import { LoveMeDoLesson } from "@/components/LoveMeDoLesson";
import { useNavigate } from "react-router-dom";

export default function BonusLesson() {
  const navigate = useNavigate();

  return <LoveMeDoLesson onBack={() => navigate("/")} />;
}
