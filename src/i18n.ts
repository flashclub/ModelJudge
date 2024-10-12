import { getRequestConfig } from "next-intl/server";
import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
  timeZone: "Europe/Vienna",
}));

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "zh", "fr", "de", "es", "it", "pt", "ja", "ko", "ru"],
  // locales: ["en", "zh"],

  // Used when no locale matches
  defaultLocale: "en",
});
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
