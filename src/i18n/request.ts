import { getUserLocale } from "app/services/locale";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  console.log("Getting user locale...");

  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
