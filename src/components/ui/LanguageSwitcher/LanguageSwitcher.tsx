"use client";

import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageCode } from "@/utils/i18n";

const LanguageSwitcher: React.FC = () => {
  const { lang, setLang, availableLanguages, isLoaded } = useTranslation();

  const handleLanguageChange = () => {
    if (availableLanguages.length <= 1) return;

    const currentIndex = availableLanguages.indexOf(lang);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    const nextLang = availableLanguages[nextIndex] as LanguageCode;

    setLang(nextLang);
  };

  if (!isLoaded) {
    return (
      <button
        disabled
        className="
          px-6 py-2 rounded-lg font-semibold
          bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)]
          opacity-70 cursor-default
        "
      >
        {lang.toUpperCase()}
      </button>
    );
  }

  return (
    <button
      onClick={handleLanguageChange}
      className="
        px-6 py-2 rounded-lg font-semibold transition-all duration-200
        bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)]
        shadow-[0_0_10px_var(--color-accent-primary)]
        hover:opacity-90
      "
    >
      {lang.toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;