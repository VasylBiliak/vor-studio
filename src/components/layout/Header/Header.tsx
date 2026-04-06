"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { scrollToSection } from '@/src/utils/scrollTo';
import { selectCartTotalItems } from '@/store/slices/cartSlice';
import CategoryList from '@/components/ui/CategoryList/CategoryList';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const cartItemsCount = useSelector(selectCartTotalItems);

  const navigateToHome = () => {
    router.push('/');
  };

  const navigateToAbout = () => {
    router.push('/about');
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Banner */}
      <div className="text-white text-center px-5 py-2.5 text-[11px] tracking-[2px] uppercase font-medium">
        ПРИВІТАЛЬНИЙ БОНУС: БЕЗКОШТОВНА ДОСТАВКА ВІД 250 ЄВРО
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-[900] bg-white border-b border-[#e0e0e0]">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16">
          {/* Logo */}
          <button 
            onClick={navigateToHome}
            className="font-[Oswald] text-[22px] font-bold tracking-[3px] text-[#0a0a0a] uppercase cursor-pointer bg-transparent border-none"
          >
            VOR<span className="text-[#c0392b]">WEAR</span>
          </button>

          {/* Mobile Burger */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
          >
            <span className="block w-6 h-0.5 bg-[#0a0a0a] transition-transform duration-300"></span>
            <span className="block w-6 h-0.5 bg-[#0a0a0a] transition-transform duration-300"></span>
            <span className="block w-6 h-0.5 bg-[#0a0a0a] transition-transform duration-300"></span>
          </button>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Button */}
            <button className="text-[11px] tracking-[2px] uppercase font-semibold text-[#888] border border-[#e0e0e0] px-2.5 py-1.5 cursor-pointer bg-transparent transition-colors duration-200 hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a]">
              UA
            </button>

            {/* Cart Button */}
            <button className="group flex items-center gap-2 text-xs tracking-[1.5px] font-semibold uppercase text-[#0a0a0a] px-4 py-2 border-[1.5px] border-[#0a0a0a] cursor-pointer bg-transparent transition-colors duration-200 hover:bg-[#0a0a0a] hover:text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="bg-[#0a0a0a] text-white rounded-full w-[18px] h-[18px] text-[10px] flex items-center justify-center transition-colors duration-200 group-hover:bg-white group-hover:text-[#0a0a0a]">
                {cartItemsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block border-t border-[#e0e0e0] overflow-x-auto scrollbar-none">
          <div className="flex items-center px-4 sm:px-6 lg:px-10 whitespace-nowrap">
            <CategoryList onClose={closeMobileMenu} />
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-[1500] pt-20 pb-10 px-6 sm:px-10 flex flex-col gap-1 transition-transform duration-[350ms] lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={closeMobileMenu}
          className="absolute top-5 right-6 bg-transparent border-none text-[28px] cursor-pointer text-[#0a0a0a]"
        >
          ✕
        </button>

        {/* About Button */}
        <button 
          onClick={navigateToAbout}
          className="font-[Oswald] text-[28px] font-semibold uppercase tracking-[2px] text-[#0a0a0a] bg-transparent border-b border-[#e0e0e0] py-2 text-left w-full cursor-pointer"
        >
          Про нас
        </button>

        {/* Category List */}
        <CategoryList onClose={closeMobileMenu} />
      </div>
    </>
  );
};

export default Header;