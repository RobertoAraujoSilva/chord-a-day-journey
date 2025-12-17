import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from '../i18n/context';
import { Locale, SUPPORTED_LOCALES } from '../i18n/types';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function LanguageSwitcher() {
  const { t, currentLanguage, changeLanguage } = useTranslation();

  const handleLanguageChange = (locale: Locale) => {
    changeLanguage(locale);
  };

  const getCurrentLanguageLabel = () => {
    return t(`ui.languages.${currentLanguage}` as const);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-white hover:bg-white/10"
          aria-label={t('ui.languages.switch_language')}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{getCurrentLanguageLabel()}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {SUPPORTED_LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={`cursor-pointer ${
              currentLanguage === locale ? 'bg-accent' : ''
            }`}
          >
            <span className="flex items-center gap-2">
              {t(`ui.languages.${locale}` as const)}
              {currentLanguage === locale && (
                <span className="text-xs text-muted-foreground">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}