import { useParams } from "react-router-dom";
import { LessonContent } from "@/components/LessonContent";
import { NavigationPanel } from "@/components/NavigationPanel";

export default function Lesson() {
  const { day } = useParams();

  if (!day) return null;

  return (
    <>
      <NavigationPanel />
      <br />
      <LessonContent day={Number(day)} />
    </>
  );
}
