"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
export default function Language() {
  const t = useTranslations("HomePage");

  const router = useRouter();
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState("🇺🇸 English");

  useEffect(() => {
    const langcode = pathname.split("/")[1];
    languages.forEach((lang) => {
      if (lang.code == langcode) {
        setSelectedLang(lang.label);
      }
    });
  }, [pathname]);

  const languages = [
    { code: "en", label: "🇺🇸 English" },
    { code: "hi", label: "🇮🇳 हिन्दी" },
    { code: "zh", label: "🇨🇳 中文" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "es", label: "🇪🇸 Español" },
    { code: "de", label: "🇩🇪 Deutsch" },
  ];

  const changeLanguage = (lang) => {
    setSelectedLang(lang.label);
    router.push(`/${lang.code}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{selectedLang}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
