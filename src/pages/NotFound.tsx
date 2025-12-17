import { useLocation } from "react-router-dom";
import { useEffect } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      <div className="flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{t('errors.not_found_title')}</h1>
          <p className="text-xl text-gray-600 mb-4">{t('errors.not_found_message')}</p>
          <a href="/" className="text-orange-600 hover:text-orange-700 underline font-medium">
            {t('errors.not_found_return')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
