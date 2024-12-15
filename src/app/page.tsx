"use client";

import { ThemeProvider } from "@emotion/react";
import Landing from "app/components/landing";
import SmartChatbotComponent from "app/components/smart-chatbot.component";
import { customThemeGeneral, customThemeYounnger } from "app/utils/theme";

export default function Home() {
  return (
    <>
      <ThemeProvider theme={customThemeGeneral}>
        <Landing />
      </ThemeProvider>
      <ThemeProvider theme={customThemeYounnger}>
        <SmartChatbotComponent />
      </ThemeProvider>
    </>
  );
}
