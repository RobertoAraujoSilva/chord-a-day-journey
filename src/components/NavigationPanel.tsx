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

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {/* INTRO */}
      <Button
        variant={isActive("/intro") ? "default" : "outline"}
        onClick={() => navigate("/intro")}
        className={clsx(
          "flex gap-2",
          isActive("/intro") && "bg-blue-500 text-white"
        )}
      >
        <BookOpen className="h-4 w-4" />
        {t("ui.navigation.review_intro")}
      </Button>
      {/* HOME */}
      <Button
        variant={isActive("/") ? "default" : "outline"}
        onClick={() => navigate("/")}
        className={clsx(
          "flex gap-2",
          isActive("/") && "bg-blue-500 text-white"
        )}
      >
        <Music4 className="h-4 w-4" />
        {t("ui.navigation.home")}
      </Button>

      {/* SLIDESHOW */}
      <Button
        variant={isActive("/slideshow") ? "default" : "outline"}
        onClick={() => navigate("/slideshow")}
        className={clsx(
          "flex gap-2",
          isActive("/slideshow") && "bg-blue-500 text-white"
        )}
      >
        <Play className="h-4 w-4" />
        {t("ui.slideshow.open")}
      </Button>
    </div>
  );
}
