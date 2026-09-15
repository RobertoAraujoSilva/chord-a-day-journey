import { useState } from "react";
import { Music2 } from "lucide-react";
import clsx from "clsx";
import { STANDARD_TUNING } from "@/data/tuning";
import { playNote } from "@/utils/audioGenerator";
import { useTranslation } from "@/i18n/context";

interface StringButtonsProps {
  /** Corda destacada por estar sendo ouvida no microfone */
  highlightedString?: number | null;
}

export function StringButtons({ highlightedString = null }: StringButtonsProps) {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState<number | null>(null);

  const handlePlay = async (stringNumber: number, frequency: number) => {
    setPlaying(stringNumber);
    try {
      await playNote(frequency, 2.5);
    } finally {
      setPlaying(null);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {STANDARD_TUNING.map((string) => {
        const isPlaying = playing === string.number;
        const isHighlighted = highlightedString === string.number;

        return (
          <button
            key={string.number}
            type="button"
            onClick={() => handlePlay(string.number, string.frequency)}
            aria-label={`${t("ui.tuner.play_string")} ${string.number} — ${string.note}`}
            className={clsx(
              "flex flex-col items-center justify-center gap-1 rounded-2xl border p-4 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isPlaying || isHighlighted
                ? "bg-gold-gradient text-background border-primary shadow-elegant"
                : "bg-card/60 text-foreground border-border hover:border-primary/60 hover:text-gold-light",
            )}
          >
            <span className="text-[10px] uppercase tracking-[0.25em] opacity-80">
              {t("ui.tuner.string")} {string.number}
            </span>
            <span className="font-display text-3xl leading-none">{string.note}</span>
            <span className="text-xs opacity-80">{t(`ui.tuner.${string.i18nKey}`)}</span>
            <span className="flex items-center gap-1 text-[10px] opacity-70">
              <Music2 className="h-3 w-3" />
              {string.frequency.toFixed(2)} Hz
            </span>
          </button>
        );
      })}
    </div>
  );
}
