import { getMessages } from "next-intl/server";
import { NextAuthProvider } from "@/context/next-auth-context";
import Layout from "@/components/Layout";
import { LocaleProvider } from "@/components/LocaleProvider";

import type { Metadata, Viewport } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://awesomeprompt.net"),
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  // 如果你有谷歌登陆
  return (
    <html lang={locale}>
      <body>
        <NextAuthProvider>
          <LocaleProvider locale={locale} messages={messages}>
            <Layout locale={locale}>{children}</Layout>
          </LocaleProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale} messages={messages}>
          <Layout locale={locale}>{children}</Layout>
        </LocaleProvider>
      </body>
    </html>
  );
}
