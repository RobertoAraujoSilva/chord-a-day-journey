import { ChordSlideshow } from "@/components/ChordSlideshow";
import { useNavigate } from "react-router-dom";

export default function Slideshow() {
  const navigate = useNavigate();

  return <ChordSlideshow onClose={() => navigate("/")} />;
}
