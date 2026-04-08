"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import CartPopup from '@/components/ui/CartPopup/CartPopup';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <CartPopup />
    </Provider>
  );
};

export default Providers;
