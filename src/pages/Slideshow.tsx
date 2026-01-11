import { Header } from "@/components/Header";
import { ChordSlideshow } from "@/components/ChordSlideshow";

export default function Slideshow() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ChordSlideshow onClose={() => history.back()} />
      </div>
    </div>
  );
}
