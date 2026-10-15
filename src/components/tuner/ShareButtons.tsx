import { useEffect, useRef, useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "@/i18n/context";
import { copyToClipboard, tunerShareUrl, whatsappShareUrl } from "@/lib/share";

type CopyState = "idle" | "copied" | "failed";

const RESET_AFTER_MS = 2500;

export function ShareButtons() {
  const { t } = useTranslation();
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<number | null>(null);

  const url = tunerShareUrl();
  const whatsappHref = whatsappShareUrl(t("ui.tuner.share_message"), url);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const copied = await copyToClipboard(url);
    setCopyState(copied ? "copied" : "failed");

    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }
    if (copied) {
      resetTimer.current = window.setTimeout(
        () => setCopyState("idle"),
        RESET_AFTER_MS,
      );
    }
  };

  const feedback =
    copyState === "copied"
      ? t("ui.tuner.share_copied")
      : copyState === "failed"
        ? t("ui.tuner.share_failed")
        : null;

  return (
    <div className="space-y-4 text-center">
      <div className="space-y-1">
        <h2 className="font-display text-2xl sm:text-3xl text-gold-light">
          {t("ui.tuner.share_title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("ui.tuner.share_hint")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center gap-2 rounded-full px-6 py-3 uppercase tracking-widest text-xs",
            "bg-gold-gradient text-background hover:opacity-90 transition-opacity",
          )}
        >
          <MessageCircle className="h-4 w-4" />
          {t("ui.tuner.share_whatsapp")}
        </a>

        <button
          type="button"
          onClick={() => void handleCopy()}
          className={clsx(
            "inline-flex items-center gap-2 rounded-full border px-6 py-3 uppercase tracking-widest text-xs",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            copyState === "copied"
              ? "bg-gold-gradient text-background border-primary shadow-elegant"
              : "bg-card/60 text-foreground border-border hover:border-primary/60 hover:text-gold-light",
          )}
        >
          {copyState === "copied" ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copyState === "copied"
            ? t("ui.tuner.share_copied")
            : t("ui.tuner.share_copy")}
        </button>
      </div>

      <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
        {feedback}
      </p>
    </div>
  );
}
