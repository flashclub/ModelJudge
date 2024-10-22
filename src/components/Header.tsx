"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "./ui/button";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import LoginDialog from "./LoginDialog";
import { useState, useEffect } from "react";
import { Brain, BarChart2 } from "lucide-react";

const Header = ({ locale }: { locale: string }) => {
  const t = useTranslations("Header");
  const { data: session, status } = useSession();
  // console.log("Session status:", status, "Session data:", session);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLAnchorElement;
      const targetId = target.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const element = document.getElementById(targetId.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // 更新 URL
          history.pushState(null, "", targetId);
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  return (
    <header className="sticky top-0  left-0 right-0 bg-white shadow-md z-40 font-mono">
      <div className="container mx-auto h-16 px-4 py-2 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={60}
            height={60}
            className="mr-2"
          />
          {/* <Brain className="mr-2" /> */}
          {t("home")}
        </Link>

        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8">
          {/* <Link href="#features" className="hover:text-primary">
            {t("features")}
          </Link>
          <Link href="#faq" className="hover:text-primary">
            {t("faq")}
          </Link> */}
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          {/* {status === "loading" ? (
            <span>Loading...</span>
          ) : session ? (
            <div className="flex items-center space-x-2">
              <span>{session.user?.name}</span>
              <Button onClick={() => signOut()}>{t("logout")}</Button>
            </div>
          ) : (
            <Button onClick={() => setIsLoginDialogOpen(true)}>
              {t("login")}
            </Button>
          )} */}
        </div>
      </div>
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
      />
    </header>
  );
};

export default Header;
