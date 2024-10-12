"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "ru", name: "Русский" },
];

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1];

  const changeLanguage = (locale: string) => {
    localStorage.setItem("preferredLanguage", locale);
    const currentPathname = pathname.split("/").slice(2).join("/");
    const newPath = `/${locale}/${currentPathname}`;
    router.push(newPath);
  };

  return (
    <Select onValueChange={changeLanguage} defaultValue={currentLang}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">
              {languages.find((lang) => lang.code === currentLang)?.name}
            </span>
            <span className="sm:hidden">{currentLang.toUpperCase()}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
