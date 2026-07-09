import { Button } from "@/components/ui/button";
import { BookOpen, Play, Music4 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "@/i18n/context";
import clsx from "clsx";

export function NavigationPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const baseClass =
    "flex gap-2 rounded-full px-5 border transition-all duration-300 uppercase tracking-widest text-xs";
  const activeClass =
    "bg-gold-gradient text-background border-primary shadow-elegant hover:opacity-90";
  const idleClass =
    "bg-card/60 text-foreground border-border hover:border-primary/60 hover:text-gold-light";

  const items = [
    { path: "/intro", icon: BookOpen, label: t("ui.navigation.review_intro") },
    { path: "/", icon: Music4, label: t("ui.navigation.home") },
    { path: "/slideshow", icon: Play, label: t("ui.slideshow.open") },
    { path: "/RythmModule/rythm", icon: Play, label: t("ui.navigation.go_to_rythm") },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {items.map(({ path, icon: Icon, label }) => (
        <Button
          key={path}
          variant="ghost"
          onClick={() => navigate(path)}
          className={clsx(baseClass, isActive(path) ? activeClass : idleClass)}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
