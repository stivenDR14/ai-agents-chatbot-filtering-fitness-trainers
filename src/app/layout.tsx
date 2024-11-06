import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

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
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
