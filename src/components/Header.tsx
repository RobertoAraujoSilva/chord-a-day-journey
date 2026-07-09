import { Music, Guitar } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "../i18n/context";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="relative border-b border-border/60 bg-card/60 backdrop-blur-xl">
      {/* Subtle gold hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 3xl:px-32 py-6 2xl:py-8 3xl:py-12">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 2xl:gap-6">
            <div className="relative flex items-center justify-center h-12 w-12 2xl:h-14 2xl:w-14 rounded-full bg-gold-gradient shadow-elegant">
              <Guitar className="h-6 w-6 2xl:h-7 2xl:w-7 text-background" />
              <Music className="h-3 w-3 2xl:h-4 2xl:w-4 absolute -top-1 -right-1 text-gold-light bg-background rounded-full p-0.5" />
            </div>
            <div>
              <h1 className="font-display text-3xl 2xl:text-4xl 3xl:text-5xl leading-none text-gold-light">
                {t("ui.header.title")}
              </h1>
              <p className="mt-1 text-xs 2xl:text-sm 3xl:text-base uppercase tracking-[0.2em] text-muted-foreground">
                {t("ui.header.subtitle")}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
