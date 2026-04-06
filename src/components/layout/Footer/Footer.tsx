"use client";

import React from "react";
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <footer className="text-white px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 lg:pt-[60px] pb-6 sm:pb-8 lg:pb-[30px]">
      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[60px] mb-10 lg:mb-[60px]">
        {/* Brand Column */}
        <div>
          <div className="font-[Oswald] text-xl sm:text-2xl font-bold tracking-[3px] uppercase mb-4">
            VOR<span className="text-[#c0392b]">WEAR</span>
          </div>
          <p className="text-xs sm:text-sm text-white/40 leading-[1.7] max-w-[280px]">
            Концептуальний бренд одягу. Ми створюємо речі для людей, які обирають якість та самовираження.
          </p>
          {/* Social Links */}
          <div className="flex gap-3 mt-5">
            <a 
              href="#" 
              target="_blank" 
              className="w-9 h-9 border border-white/20 flex items-center justify-center text-xs font-bold text-white cursor-pointer transition-colors duration-200 hover:bg-white hover:text-[#0a0a0a]"
            >
              INSTA
            </a>
            <a 
              href="#" 
              target="_blank" 
              className="w-9 h-9 border border-white/20 flex items-center justify-center text-xs font-bold text-white cursor-pointer transition-colors duration-200 hover:bg-white hover:text-[#0a0a0a]"
            >
              VIBE
            </a>
            <a 
              href="#" 
              target="_blank" 
              className="w-9 h-9 border border-white/20 flex items-center justify-center text-xs font-bold text-white cursor-pointer transition-colors duration-200 hover:bg-white hover:text-[#0a0a0a]"
            >
              NEWS
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white/40 mb-5">
            Навігація
          </h4>
          <button 
            onClick={navigateToHome}
            className="block text-xs sm:text-sm text-white/70 bg-transparent border-none cursor-pointer mb-2.5 transition-colors duration-200 hover:text-white py-0 px-0 tracking-[0.5px]"
          >
            Знижки
          </button>
          <button 
            onClick={navigateToHome}
            className="block text-xs sm:text-sm text-white/70 bg-transparent border-none cursor-pointer mb-2.5 transition-colors duration-200 hover:text-white py-0 px-0 tracking-[0.5px]"
          >
            Верх
          </button>
          <button 
            onClick={navigateToHome}
            className="block text-xs sm:text-sm text-white/70 bg-transparent border-none cursor-pointer mb-2.5 transition-colors duration-200 hover:text-white py-0 px-0 tracking-[0.5px]"
          >
            Футболки
          </button>
          <button 
            onClick={navigateToHome}
            className="block text-xs sm:text-sm text-white/70 bg-transparent border-none cursor-pointer mb-2.5 transition-colors duration-200 hover:text-white py-0 px-0 tracking-[0.5px]"
          >
            Штани
          </button>
          <button 
            onClick={navigateToHome}
            className="block text-xs sm:text-sm text-white/70 bg-transparent border-none cursor-pointer mb-2.5 transition-colors duration-200 hover:text-white py-0 px-0 tracking-[0.5px]"
          >
            Аксесуари
          </button>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-[10px] tracking-[3px] uppercase font-bold text-white/40 mb-5">
            Підтримка
          </h4>
          <button className="block text-xs sm:text-sm text-white/70 bg-transparent border-none cursor-pointer mb-2.5 transition-colors duration-200 hover:text-white py-0 px-0 tracking-[0.5px]">
            Зворотній зв'язок
          </button>
          <button className="block text-xs sm:text-sm text-white/70 bg-transparent border-none cursor-pointer mb-2.5 transition-colors duration-200 hover:text-white py-0 px-0 tracking-[0.5px]">
            Умови користування
          </button>
          <button className="block text-xs sm:text-sm text-white/70 bg-transparent border-none cursor-pointer mb-2.5 transition-colors duration-200 hover:text-white py-0 px-0 tracking-[0.5px]">
            Доставка
          </button>
          <button className="block text-xs sm:text-sm text-white/70 bg-transparent border-none cursor-pointer mb-2.5 transition-colors duration-200 hover:text-white py-0 px-0 tracking-[0.5px]">
            Гарантія повернення
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <span className="text-[11px] text-white/30 tracking-[1px]">
          VOR CONCEPT © 2026
        </span>
        <div className="flex gap-2.5">
          <span className="bg-white/10 text-white text-[9px] font-bold tracking-[1px] px-2 py-1 rounded-[3px]">
            SECURE PAY
          </span>
          <span className="bg-white/10 text-white text-[9px] font-bold tracking-[1px] px-2 py-1 rounded-[3px]">
            CARD
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;