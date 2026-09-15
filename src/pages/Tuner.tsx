import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationPanel } from "@/components/NavigationPanel";
import { PageHeader } from "@/components/PageHeader";
import { SEO } from "@/components/SEO";
import { PitchMeter } from "@/components/tuner/PitchMeter";
import { StringButtons } from "@/components/tuner/StringButtons";
import { useMicrophonePitch } from "@/hooks/useMicrophonePitch";
import { closestString } from "@/data/tuning";
import { useTranslation } from "@/i18n/context";

export default function Tuner() {
  const { t } = useTranslation();
  const { reading, frequency, listening, error, start, stop } = useMicrophonePitch();

  const highlightedString = frequency ? closestString(frequency).number : null;

  const tips = ["tip_1", "tip_2", "tip_3", "tip_4"];

  return (
    <div className="space-y-8">
      <SEO
        title={`${t("ui.tuner.title")} — Chord a Day Journey`}
        description={t("ui.tuner.subtitle")}
        path="/afinador"
      />

      <PageHeader
        eyebrow={t("ui.tuner.eyebrow")}
        title={t("ui.tuner.title")}
        subtitle={t("ui.tuner.subtitle")}
      />

      <NavigationPanel />

      <section className="surface-card rounded-3xl border border-border/60 p-5 sm:p-8 space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl text-gold-light text-center">
          {t("ui.tuner.mic_title")}
        </h2>

        <PitchMeter reading={reading} frequency={frequency} listening={listening} />

        <div className="flex justify-center">
          <Button
            onClick={() => (listening ? stop() : void start())}
            className="gap-2 rounded-full px-6 bg-gold-gradient text-background hover:opacity-90 uppercase tracking-widest text-xs"
          >
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {listening ? t("ui.tuner.stop_listening") : t("ui.tuner.start_listening")}
          </Button>
        </div>

        {error && (
          <p role="alert" className="text-center text-sm text-destructive">
            {error === "denied" ? t("ui.tuner.mic_denied") : t("ui.tuner.mic_unsupported")}
          </p>
        )}
      </section>

      <section className="surface-card rounded-3xl border border-border/60 p-5 sm:p-8 space-y-5">
        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl text-gold-light">
            {t("ui.tuner.reference_title")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("ui.tuner.reference_hint")}</p>
        </div>

        <StringButtons highlightedString={highlightedString} />
      </section>

      <section className="surface-card rounded-3xl border border-border/60 p-5 sm:p-8 space-y-4">
        <h2 className="font-display text-2xl sm:text-3xl text-gold-light text-center">
          {t("ui.tuner.how_title")}
        </h2>
        <ul className="mx-auto max-w-2xl space-y-3 text-foreground/90 text-sm sm:text-base">
          {tips.map((tip) => (
            <li key={tip} className="flex gap-3">
              <span className="text-primary">◆</span>
              <span>{t(`ui.tuner.${tip}`)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
