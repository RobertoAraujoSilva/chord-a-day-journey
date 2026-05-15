import { ChordSlideshow } from "@/components/ChordSlideshow";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";

export default function Slideshow() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Chord Slideshow — Visual Review of All 30 Chords"
        description="Quick visual review of every chord covered in the 30-day journey. Cycle through diagrams to reinforce memory."
        path="/slideshow"
      />
      <ChordSlideshow onClose={() => navigate("/")} />
    </>
  );
}
