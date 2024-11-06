"use client";

import { Locale } from "app/i18n/config";
import { setUserLocale } from "app/services/locale";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

export default function Home() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div>
      <h1>{t("title")}</h1>
      <select value={locale} onChange={(e) => onChange(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="pt">Brazil</option>
      </select>
    </div>
  );
}
