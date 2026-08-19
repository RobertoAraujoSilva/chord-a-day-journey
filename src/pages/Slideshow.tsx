import { ChordSlideshow } from "@/components/ChordSlideshow";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { NavigationPanel } from "@/components/NavigationPanel";
import { SEO } from "@/components/SEO";
import { useTranslation } from "@/i18n/context";

export default function Slideshow() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <SEO
        title="Chord Slideshow — Visual Review of All 30 Chords"
        description="Quick visual review of every chord covered in the 30-day journey. Cycle through diagrams to reinforce memory."
        path="/slideshow"
      />

      <PageHeader eyebrow="30 · Chords" title={t("ui.slideshow.open")} />

      <NavigationPanel />

      <ChordSlideshow onClose={() => navigate("/")} />
    </div>
  );
}
