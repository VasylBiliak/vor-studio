'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store';
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalItems,
  clearCart,
} from '@/store/slices/cartSlice';
import CartItemComponent from '@/components/ui/CartItem/CartItem';
import { AiOutlineShoppingCart, AiOutlineDelete } from 'react-icons/ai';
import { useTranslation } from '@/hooks/useTranslation';
import { formatPrice } from '@/utils/formatCurrency';

export default function CartContent() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalItems = useSelector(selectCartTotalItems);
  const { t, currency, lang } = useTranslation();

  const handleContinueShopping = () => {
    router.push('/#products');
  };

  const handleClearCart = () => {
    if (confirm(t('clear_cart_confirm'))) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <main className='min-h-screen bg-[var(--color-bg-primary)]'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <h1 className='font-[Oswald] text-3xl font-bold uppercase tracking-wide text-[var(--color-text-primary)] mb-8'>
            {t('cart_title')}
          </h1>

          <div className='text-center py-16'>
            <div className='mb-6'>
              <AiOutlineShoppingCart className='w-16 h-16 mx-auto text-[var(--color-border)]' />
            </div>
            <h2 className='text-xl font-semibold text-[var(--color-text-primary)] mb-2'>
              {t('cart_empty_title')}
            </h2>
            <p className='text-[var(--color-text-secondary)] mb-8'>
              {t('cart_empty_message')}
            </p>
            <button
              onClick={handleContinueShopping}
              className='text-[11px] tracking-[2px] uppercase font-bold text-[var(--color-text-primary)] border-[1.5px] border-[var(--color-text-primary)] px-10 py-3.5 bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]'
            >
              {t('continue_shopping')}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-[var(--color-bg-primary)]'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <h1 className='font-[Oswald] text-3xl font-bold uppercase tracking-wide text-[var(--color-text-primary)]'>
            {t('cart_title')} ({totalItems})
          </h1>
          <button
            onClick={handleClearCart}
            className='text-xs tracking-[1px] uppercase font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors flex items-center gap-2'
          >
            <AiOutlineDelete className='w-4 h-4' />
            {t('clear_cart')}
          </button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2'>
            <div className='bg-[var(--color-bg-primary)]'>
              {cartItems.map((item) => (
                <CartItemComponent key={item.uid} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='border border-[var(--color-border)] p-6 sticky top-24'>
              <h2 className='font-[Oswald] text-xl font-semibold uppercase tracking-wide text-[var(--color-text-primary)] mb-6'>
                {t('order_summary')}
              </h2>

              <div className='space-y-3 mb-6'>
                <div className='flex justify-between text-sm'>
                  <span className='text-[var(--color-text-secondary)]'>
                    {t('items_count')} ({totalItems})
                  </span>
                  <span className='text-[var(--color-text-primary)]'>
                    {formatPrice(totalAmount, currency, lang)}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-[var(--color-text-secondary)]'>
                    {t('shipping')}
                  </span>
                  <span className='text-[var(--color-text-primary)]'>
                    {t('shipping_calculated')}
                  </span>
                </div>
              </div>

              <div className='border-t border-[var(--color-border)] pt-4 mb-6'>
                <div className='flex justify-between'>
                  <span className='font-semibold text-[var(--color-text-primary)]'>
                    {t('total')}
                  </span>
                  <span className='font-semibold text-[var(--color-text-primary)]'>
                    {formatPrice(totalAmount, currency, lang)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className='w-full py-4 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-xs tracking-[3px] uppercase font-bold cursor-pointer transition-colors hover:bg-[var(--color-accent-primary)] mb-4'
              >
                {t('checkout')}
              </button>

              <button
                onClick={handleContinueShopping}
                className='w-full text-[11px] tracking-[2px] uppercase font-bold text-[var(--color-text-primary)] border-[1.5px] border-[var(--color-text-primary)] px-4 py-3 bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]'
              >
                {t('continue_shopping')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
