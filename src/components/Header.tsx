import { Music, Guitar } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "../i18n/context";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-6 2xl:py-8 3xl:py-12 shadow-lg">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 3xl:px-32">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 2xl:gap-4 3xl:gap-6">
            <div className="relative">
              <Guitar className="h-8 w-8 2xl:h-10 2xl:w-10 3xl:h-14 3xl:w-14" />
              <Music className="h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-7 3xl:w-7 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl 2xl:text-4xl 3xl:text-5xl font-bold">
                {t("ui.header.title")}
              </h1>
              <p className="text-orange-100 mt-1 2xl:mt-2 text-sm 2xl:text-base 3xl:text-lg">
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
