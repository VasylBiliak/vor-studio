'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CheckoutForm from '@/components/sections/CheckoutForm/CheckoutForm';
import { selectCartTotalAmount, selectCartTotalItems } from '@/store/slices/cartSlice';
import { useTranslation } from '@/hooks/useTranslation';
import { formatPrice } from '@/utils/formatCurrency';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function CheckoutPage() {
  const router = useRouter();
  const { t, currency, lang } = useTranslation();
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalItems = useSelector(selectCartTotalItems);

  // Redirect to cart if empty
  if (totalItems === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-[Oswald] text-3xl font-bold uppercase tracking-wide text-[var(--color-text-primary)] mb-8">
            {t('checkout') || 'Checkout'}
          </h1>

          <div className="text-center py-16">
            <div className="mb-6">
              <AiOutlineShoppingCart className="w-16 h-16 mx-auto text-[var(--color-border)]" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              {t('cart_empty_title') || 'Your cart is empty'}
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              {t('cart_empty_message') || 'Add items to your cart to continue shopping'}
            </p>
            <button
              onClick={() => router.push('/#products')}
              className="text-[11px] tracking-[2px] uppercase font-bold text-[var(--color-text-primary)] border-[1.5px] border-[var(--color-text-primary)] px-10 py-3.5 bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]"
            >
              {t('continue_shopping') || 'Continue Shopping'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-[Oswald] text-3xl font-bold uppercase tracking-wide text-[var(--color-text-primary)] mb-8">
          {t('checkout') || 'Checkout'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="border border-[var(--color-border)] p-6">
              <CheckoutForm />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-[var(--color-border)] p-6 sticky top-24">
              <h2 className="font-[Oswald] text-xl font-semibold uppercase tracking-wide text-[var(--color-text-primary)] mb-6">
                {t('order_summary') || 'Order Summary'}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">
                    {t('items_count') || 'Items'} ({totalItems})
                  </span>
                  <span className="text-[var(--color-text-primary)]">
                    {formatPrice(totalAmount, currency, lang)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">
                    {t('shipping') || 'Shipping'}
                  </span>
                  <span className="text-[var(--color-text-primary)]">
                    {t('calculated_at_checkout') || 'Calculated at checkout'}
                  </span>
                </div>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {t('total') || 'Total'}
                  </span>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {formatPrice(totalAmount, currency, lang)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push('/cart')}
                className="w-full mt-6 text-[11px] tracking-[2px] uppercase font-bold text-[var(--color-text-primary)] border-[1.5px] border-[var(--color-text-primary)] px-4 py-3 bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]"
              >
                {t('back_to_cart') || 'Back to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
