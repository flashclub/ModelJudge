import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const INTL_NAMESPACE = "AllModel";
const Footer = ({ locale }: { locale: string }) => {
  const t = useTranslations(INTL_NAMESPACE);

  const commonLinks = [
    { href: `/${locale}`, label: t("home") },
    // { href: "/about", label: t("about") },
    // { href: "/contact", label: t("contact") },
    // { href: "/privacy-policy", label: t("privacyPolicy") },
    // { href: "/terms-of-service", label: t("termsOfService") },
  ];

  const projectLinks = [
    { href: `/${locale}/info`, label: t("infoCard") },
    { href: `/${locale}/ppt`, label: t("ppt") },
    { href: `/${locale}/new-word`, label: t("newWord") },
    { href: `/${locale}/all-model`, label: t("allModel") },
    // { href: "/image-themes", label: t("imageThemes") },
  ];

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <p className="mb-2">
          {t("projectSource")}
          <a
            href="https://awesomeprompt.net/zh/all-model"
            className="text-blue-600 hover:underline"
          >
            AwesomePrompt
          </a>
          {t("projectSupport")}
          <a
            href="https://cloud.siliconflow.cn/i/h5JiyFm0"
            className="text-blue-600 hover:underline"
          >
            SiliconCloud
          </a>
          {t("projectFreeApi")}
        </p>
        <p>
          {t("projectOpenSource")}
          <a
            href="https://github.com/flashclub/ModelJudge"
            className="text-blue-600 hover:underline"
          >
            Github
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
