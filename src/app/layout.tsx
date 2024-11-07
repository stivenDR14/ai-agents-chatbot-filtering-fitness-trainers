import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CopilotKit } from "@copilotkit/react-core";
import { customThemeYounnger } from "app/utils/theme";

const lexendRegular = localFont({
  src: "./fonts/Lexend-Regular.ttf",
  variable: "--font-lexend",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Conversational Filter Fitness",
  description: "Conversational Filter Fitness",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={lexendRegular.variable}>
        <CopilotKit
          runtimeUrl="/api/copilotkit"
          /* properties={{
          current_data: JSON.parse(
            sessionStorage.getItem("currentData") || "{}"
          ),
        }} */
        >
          <AppRouterCacheProvider options={{ key: "css" }}>
            <ThemeProvider theme={customThemeYounnger}>
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </CopilotKit>
      </body>
    </html>
  );
}
