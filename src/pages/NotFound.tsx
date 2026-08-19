import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "@/i18n/context";
import { Header } from "@/components/Header";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-noir text-foreground">
      <Helmet>
        <title>Page not found — Chord a Day Journey</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <div className="flex items-center justify-center px-4 pt-24">
        <div className="surface-card max-w-lg w-full p-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary">404</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl text-gold-light leading-tight">
            {t("errors.not_found_title")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("errors.not_found_message")}
          </p>
          <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <a
            href="/"
            className="mt-8 inline-flex items-center rounded-full bg-gold-gradient px-6 py-2.5 text-xs uppercase tracking-widest text-background shadow-elegant hover:opacity-90"
          >
            {t("errors.not_found_return")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
