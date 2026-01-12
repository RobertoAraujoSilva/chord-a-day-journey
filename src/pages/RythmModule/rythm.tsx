import { Metronome } from "@/components/Metronome";
import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { NavigationPanel } from "@/components/NavigationPanel";

export default function RythmModule() {
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const { t } = useTranslation();

  return (
    <main>
      <NavigationPanel />
      <br />
      <section>
        <Metronome
          isActive={metronomeEnabled}
          onToggle={() => setMetronomeEnabled((prev) => !prev)}
          labels={{
            metronome_on: t("ui.slideshow.metronome_on"),
            metronome_off: t("ui.slideshow.metronome_off"),
            bpm: t("ui.slideshow.bpm"),
          }}
        />
      </section>
    </main>
  );
}
