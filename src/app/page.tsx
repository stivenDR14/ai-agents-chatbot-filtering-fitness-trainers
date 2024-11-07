"use client";

import { getDefaultLocale } from "app/helpers/locale";
import { Locale } from "app/i18n/config";
import { setUserLocale } from "app/services/locale";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useTransition } from "react";
import { Typography } from "@mui/material";
import SmartChatbotComponent from "app/components/smart-chatbot.component";

export default function Home() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setUserLocale(getDefaultLocale());
  }, []);

  function onChange(value: string) {
    const newLocale = value as Locale;
    startTransition(() => {
      setUserLocale(newLocale);
    });
  }

  return (
    <div>
      <SmartChatbotComponent />
      <Typography>{t("title")}</Typography>
      <select value={locale} onChange={(e) => onChange(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="pt">Brazil</option>
      </select>
    </div>
  );
}
