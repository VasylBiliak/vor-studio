"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCartTotalItems } from '@/store/slices/cartSlice';
import CategoryList from '@/components/ui/CategoryList/CategoryList';
import CartButton from '@/components/ui/cartButton/CartButton';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher/LanguageSwitcher';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const cartItemsCount = useSelector(selectCartTotalItems);

  const navigateToHome = () => router.push('/');
  const navigateToCart = () => {
    router.push('/cart');
    closeMobileMenu();
  };
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const navigateToAbout = () => {
    router.push('/about');
    closeMobileMenu();
  };

  return (
    <>
      {/* Announcement Banner */}
      <div className="text-[var(--color-dark-text)] text-center px-5 py-2.5 text-[11px] tracking-[2px] uppercase font-medium bg-[var(--color-dark-bg)]">
        ПРИВІТАЛЬНИЙ БОНУС: БЕЗКОШТОВНА ДОСТАВКА ВІД 250 ЄВРО
      </div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-[900] bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Top Bar */}
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-8 md:px-14 h-16">

          {/* Logo */}
          <button
            onClick={navigateToHome}
            className="font-[Oswald] text-[22px] font-bold tracking-[3px] text-[var(--color-text-primary)] uppercase cursor-pointer bg-transparent border-none"
          >
            VOR<span className="text-[var(--color-accent-primary)]">WEAR</span>
          </button>

          <div className="flex items-center gap-3 md:hidden">
            <CartButton count={cartItemsCount} onClick={navigateToCart} />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">


            <div className="hidden md:flex items-center gap-4">
              <CartButton count={cartItemsCount} onClick={navigateToCart} />
              <LanguageSwitcher />
            </div>

            {/* Burger */}
            <button
              onClick={toggleMobileMenu}
              className=" flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer md:hidden lg:hidden"
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 bg-[var(--color-text-primary)]" />
              <span className="block w-6 h-0.5 bg-[var(--color-text-primary)]" />
              <span className="block w-6 h-0.5 bg-[var(--color-text-primary)]" />
            </button>

          </div>

        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block border-t border-[var(--color-border)] overflow-x-auto scrollbar-none">
          <div className="flex items-center px-4 sm:px-8 md:px-14 whitespace-nowrap">
            <CategoryList onClose={closeMobileMenu} />
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu — fullscreen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[var(--color-bg-primary)] z-[1500] flex flex-col justify-center items-center px-8 md:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Close */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-5 right-6 bg-transparent border-none text-[28px] cursor-pointer text-[var(--color-text-primary)] leading-none"
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Links */}
            <nav className="flex flex-col items-center gap-1 w-full">
              <CategoryList onClose={closeMobileMenu} />
              <LanguageSwitcher />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;