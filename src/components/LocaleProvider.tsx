"use client";

import { useState, useEffect } from "react";
import { NextIntlClientProvider } from "next-intl";

export function LocaleProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  const [currentLocale, setCurrentLocale] = useState(locale);

  useEffect(() => {
    const savedLocale = localStorage.getItem("preferredLanguage");
    if (savedLocale && savedLocale !== locale) {
      const newPathname = window.location.pathname.replace(
        /^\/[^\/]+/,
        `/${savedLocale}`
      );
      window.location.href = newPathname + window.location.search;
    } else {
      setCurrentLocale(locale);
    }
  }, [locale]);

  return (
    <NextIntlClientProvider
      locale={currentLocale}
      timeZone="Europe/Vienna"
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}
