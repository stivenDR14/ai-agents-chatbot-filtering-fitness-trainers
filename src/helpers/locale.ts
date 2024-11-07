import { Locale, locales } from "app/i18n/config";

export function getDefaultLocale(): Locale {
  const browserLocale = navigator.language.split("-")[0]; // Get the language part only
  return locales.includes(browserLocale as Locale)
    ? (browserLocale as Locale)
    : "en";
}
