"use client";

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { loadTranslations } from '@/store/slices/i18nSlice';
// CartPopup disabled - replaced by AddToCartModal on product page
// import CartPopup from '@/components/ui/CartPopup/CartPopup';
import Loader from '@/components/ui/Loader/Loader';
import { useTranslation } from '@/hooks/useTranslation';
import { initializeTokens } from '@/utils/designTokens';
import { AnimatePresence, motion } from 'framer-motion';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Inner component that handles i18n initialization
 * Must be inside Redux Provider to access store
 */
const I18nInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { initLang, isLoaded } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [tokensLoaded, setTokensLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize design tokens first
    initializeTokens().then(() => {
      setTokensLoaded(true);
    });
    // Initialize language from localStorage
    initLang();
  }, [initLang]);

  useEffect(() => {
    // Load translations if not already loaded
    if (!isLoaded) {
      store.dispatch(loadTranslations());
    }
  }, [isLoaded]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return <Loader />;
  }

  // Show loader while design tokens or translations are loading
  if (!tokensLoaded || !isLoaded) {
    return <Loader />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loaded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <I18nInitializer>
        {children}
        {/* CartPopup disabled - replaced by AddToCartModal */}
      </I18nInitializer>
    </Provider>
  );
};

export default Providers;
