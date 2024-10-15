import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import BuyMeACoffee from "./BuyMeACoffee";
import { Github } from "lucide-react";
const INTL_NAMESPACE = "Footer";
const Footer = ({ locale }: { locale: string }) => {
  const t = useTranslations(INTL_NAMESPACE);

  const projectLinks = [
    { href: `/${locale}/model-judge`, label: t("infoCard") },
    { href: "https://github.com/flashclub/ModelJudge", label: "Github" },
  ];
  const friendLinks = [
    { href: "https://awesomeprompt.net/zh/all-model", label: "AwesomePrompt" },
    { href: "https://cloud.siliconflow.cn/i/h5JiyFm0", label: "SiliconCloud" },
  ];
  return (
    <footer className="bg-gray-100 pt-8">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4  ">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("projectLinks")}</h3>
            <ul className="space-y-2">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("friendLinks")}</h3>
            <ul className="space-y-2">
              {friendLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-blue-500">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("connectLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <div className="relative group">
                  <a href="#" className="hover:text-blue-500">
                    {t("wechat")}
                  </a>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                    <img
                      src="/qrcode.png"
                      alt="微信二维码"
                      className="min-w-32 h-32"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4  ">
          <BuyMeACoffee />
        </div>

        <p className="mt-10 mb-2">
          {t("projectSource")}
          <a
            href="https://awesomeprompt.net/zh/all-model"
            className="text-blue-600 hover:underline"
          >
            AwesomePrompt.
          </a>
          &nbsp;&nbsp;
          {t("projectSupport")}
          <a
            href="https://cloud.siliconflow.cn/i/h5JiyFm0"
            className="text-blue-600 hover:underline"
          >
            SiliconCloud
          </a>
          {t("projectFreeApi")}目前注册即送2000万token
        </p>
      </div>
    </footer>
  );
};

export default Footer;
