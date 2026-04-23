"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCartTotalItems } from '@/store/slices/cartSlice';
import CategoryList from '@/components/ui/CategoryList/CategoryList';
import CartButton from '@/components/ui/cartButton/CartButton';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const cartItemsCount = useSelector(selectCartTotalItems);
  const { t } = useTranslation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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

  const navigateToContact = () => {
    router.push('/contact');
    closeMobileMenu();
  };

  return (
    <>
      {/* Announcement Banner */}
      <div className="text-[var(--color-dark-text)] text-center 
      px-5 py-2.5 text-[11px] tracking-[2px] uppercase font-medium">
        {t("welcome_bonus")} {t("currency")}
      </div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-[900] border-b 
        border-[var(--color-border)]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-8 md:px-14 h-16">

          {/* Logo */}
          <button
            onClick={navigateToHome}
            className="font-[Oswald] text-xl font-bold tracking-[3px] text-[var(--color-text-primary)] uppercase cursor-pointer bg-transparent transition-all duration-300 hover:scale-105 hover:text-[var(--color-accent-primary)]"
          >
            {t("logo_text_first_part")}<span className="text-[var(--color-accent-primary)]">{t("logo_text_second_part")}</span>
          </button>

          <div className="flex items-center gap-3 md:hidden">
            <CartButton count={cartItemsCount} onClick={navigateToCart} />
          </div>

          {/* RIGHT */}
          <div className="flex items-center">

            <div className="hidden md:flex items-center  gap-6 md:gap-8 lg:gap-12">
              <div className="flex items-center gap-3 md:hidden">
              </div>

              <button
                onClick={navigateToAbout}
                className="relative font-[Oswald] text-xs font-semibold uppercase tracking-[2px]
                bg-transparent py-2 text-left w-full cursor-pointer
                text-[var(--color-text-primary)] transition-colors duration-300
                hover:text-[var(--color-accent-primary)]
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                after:bg-[var(--color-accent-primary)] after:transition-all after:duration-300
                hover:after:w-full"
              >
                {t("about")}
              </button>
              <button
                onClick={navigateToContact}
                className="relative font-[Oswald] text-xs font-semibold uppercase tracking-[2px]
                bg-transparent py-2 text-left w-full cursor-pointer
                text-[var(--color-text-primary)] transition-colors duration-300
                hover:text-[var(--color-accent-primary)]
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                after:bg-[var(--color-accent-primary)] after:transition-all after:duration-300
                hover:after:w-full"
              >
                {t("contact_nav")}
              </button>
              <LanguageSwitcher />
              <CartButton count={cartItemsCount} onClick={navigateToCart} />
            </div>

            {/* Burger */}
            <button
              onClick={toggleMobileMenu}
              className="flex flex-col gap-[5px] p-1 bg-transparent md:hidden lg:hidden group"
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 group-hover:bg-[var(--color-accent-primary)]" />
              <span className="block w-6 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 group-hover:bg-[var(--color-accent-primary)]" />
              <span className="block w-6 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 group-hover:bg-[var(--color-accent-primary)]" />
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
            className="fixed inset-0 z-[1500] flex flex-col 
            justify-center bg-[var(--color-bg-primary)] items-center px-8 md:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Close */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-5 right-6 bg-transparent text-[28px] cursor-pointer text-[var(--color-text-primary)] leading-none transition-colors hover:text-[var(--color-accent-primary)]"
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Links */}
            <nav className="flex flex-col justify-center items-center gap-4 w-full h-full text-center">
              {/* About Button */}
              <motion.button
                onClick={navigateToAbout}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative font-[Oswald] text-[28px] font-semibold uppercase tracking-[2px]
                text-[var(--color-text-primary)] bg-transparent py-2 cursor-pointer
                transition-all duration-300 hover:text-[var(--color-accent-primary)] hover:scale-105
                after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:w-0
                after:bg-[var(--color-accent-primary)] after:transition-all after:duration-300
                hover:after:w-full"
              >
                {t("about")}
              </motion.button>

              {/* Contact Button */}
              <motion.button
                onClick={navigateToContact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative font-[Oswald] text-[28px] font-semibold uppercase tracking-[2px]
                text-[var(--color-text-primary)] bg-transparent py-2 cursor-pointer
                transition-all duration-300 hover:text-[var(--color-accent-primary)] hover:scale-105
                after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:w-0
                after:bg-[var(--color-accent-primary)] after:transition-all after:duration-300
                hover:after:w-full"
              >
                {t("contact_nav")}
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full flex flex-col items-center"
              >
                <CategoryList onClose={closeMobileMenu} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <LanguageSwitcher />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;