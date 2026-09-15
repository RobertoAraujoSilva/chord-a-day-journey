import clsx from "clsx";
import { tuneStatus, CLOSE_CENTS, type PitchReading } from "@/data/tuning";
import { useTranslation } from "@/i18n/context";

interface PitchMeterProps {
  reading: PitchReading | null;
  frequency: number | null;
  listening: boolean;
}

export function PitchMeter({ reading, frequency, listening }: PitchMeterProps) {
  const { t } = useTranslation();

  const cents = reading?.cents ?? 0;
  const status = reading ? tuneStatus(cents) : "off";
  const clamped = Math.max(-50, Math.min(50, cents));
  const needlePercent = 50 + clamped;

  const statusColor =
    status === "in_tune"
      ? "text-primary"
      : status === "close"
        ? "text-gold-light"
        : "text-muted-foreground";

  const instruction = !listening
    ? t("ui.tuner.idle_hint")
    : !reading
      ? t("ui.tuner.waiting")
      : status === "in_tune"
        ? t("ui.tuner.in_tune")
        : cents < 0
          ? t("ui.tuner.too_low")
          : t("ui.tuner.too_high");

  return (
    <div className="w-full space-y-5">
      <div className="text-center">
        <p className={clsx("font-display text-5xl sm:text-6xl leading-none", statusColor)}>
          {reading ? reading.note : "—"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {frequency ? `${frequency.toFixed(1)} Hz` : t("ui.tuner.no_signal")}
        </p>
      </div>

      <div className="relative h-16 rounded-2xl border border-border bg-card/60 overflow-hidden">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-primary/70" />
        <div
          className={clsx(
            "absolute inset-y-0 left-1/2 -translate-x-1/2 bg-primary/10",
            status === "in_tune" && "bg-primary/25",
          )}
          style={{ width: `${(CLOSE_CENTS / 50) * 100}%` }}
        />
        {reading && (
          <div
            className={clsx(
              "absolute inset-y-2 w-1 rounded-full transition-all duration-150",
              status === "in_tune" ? "bg-primary" : "bg-gold-light",
            )}
            style={{ left: `${needlePercent}%` }}
          />
        )}
        <span className="absolute bottom-1 left-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {t("ui.tuner.flat")}
        </span>
        <span className="absolute bottom-1 right-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {t("ui.tuner.sharp")}
        </span>
      </div>

      <p
        className={clsx(
          "text-center text-base sm:text-lg",
          status === "in_tune" && reading ? "text-primary" : "text-foreground/90",
        )}
      >
        {instruction}
      </p>
    </div>
  );
}
