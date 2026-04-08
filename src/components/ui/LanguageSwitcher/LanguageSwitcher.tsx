"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchCategories } from "@/store/slices/categoriesSlice";

const LanguageSwitcher: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const languages: ("en" | "ua" | "ru")[] = ["en", "ua", "ru"];
  const [langIndex, setLangIndex] = useState(0);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as "en" | "ua" | "ru";
    if (savedLang) {
      const index = languages.indexOf(savedLang);
      if (index !== -1) setLangIndex(index);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCategories(languages[langIndex]));
    localStorage.setItem("lang", languages[langIndex]);
  }, [langIndex, dispatch]);

  const handleClick = () => {
    setLangIndex((prev) => (prev + 1) % languages.length);
  };

  return (
    <button
      onClick={handleClick}
      className="
        px-6 py-2 rounded-lg font-semibold transition-all duration-200
        bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)]
        shadow-[0_0_10px_var(--color-accent-primary)]
        hover:bg-[var(--color-accent-primary-hover)]
      "
    >
      {languages[langIndex].toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;