"use client";

import React from 'react';
import { scrollToSection } from '@/src/utils/scrollTo';
import { useTranslation } from '@/hooks/useTranslation';

const Hero = () => {
  const { t } = useTranslation();

  return (
    // === Hero Section ===
    <section
      className="relative flex justify-center items-center
  pr-0! pl-0!"

    >
      {/* === Left Content === */}
      <div
        className="text-center flex flex-col justify-center items-center m-4 gap-16"
      >
        <h1
          className="font-bold text-5xl leading-tight text-[var(--color-accent-primary)] capitalize tracking-wide
        sm:text-6xl
        md:text-8xl
        2xl:text-9xl"
        >
          {t("welcome_to")}
        </h1>

        <p>
          {t("end_season_sale")}
          {t("sale_description")}
        </p>


          <button
            type="button"
            className="group relative text-2xl 
            cursor-pointer overflow-hidden 
            border-2 px-2 py-2   tracking-[0.2em] 
            text-[var(--color-dark-text)] transition-all 
            hover:bg-[var(--color-accent-primary)]
            active:scale-95 min-[2000px]:text-[1.8rem]"
            onClick={() => scrollToSection('products')}
          >
            {t("shop_deals")}
          </button>
      </div>
    </section>
  );
};

export default Hero;