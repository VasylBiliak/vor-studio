'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { selectCartTotalItems } from '@/store/slices/cartSlice';
import { Product } from '@/utils/productsApi';
import { useTranslation } from '@/hooks/useTranslation';
import { formatPrice } from '@/utils/formatCurrency';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  size?: string;
  quantity?: number;
  productCategory?: string;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isOpen,
  onClose,
  product,
  size,
  quantity = 1,
  productCategory,
}) => {
  const router = useRouter();
  const { t, currency, lang } = useTranslation();
  const totalItems = useSelector(selectCartTotalItems);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleViewCart = () => {
    onClose();
    router.push('/cart');
  };

  const handleContinueShopping = () => {
    onClose();

    // Build URL with category if exists
    const categoryParam = productCategory ? `?category=${encodeURIComponent(productCategory)}` : '';
    const targetUrl = `/#products${categoryParam}`;

    router.push(targetUrl);

    // Smooth scroll to products section after navigation
    setTimeout(() => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const productImage = product.images.length > 0 ? product.images[0] : '/placeholder-product.png';
  const displayPrice = product.hasDiscount ? product.finalPrice : product.price;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          style={{ background: 'var(--color-bg-primary)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <AiOutlineShoppingCart className="w-5 h-5 text-[var(--color-accent-primary)]" />
                <h3 className="font-[Oswald] text-sm font-semibold uppercase tracking-[2px] text-[var(--color-text-primary)]">
                  {t('just_added_to_cart') || 'Just added to cart'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 bg-transparent border-none cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label={t('close') || 'Close'}
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              {/* Product Info */}
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 flex-shrink-0 border border-[var(--color-border)] overflow-hidden">
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-[Oswald] text-sm font-semibold uppercase tracking-wide text-[var(--color-text-primary)] truncate">
                    {product.name}
                  </h4>
                  <p className="text-lg font-semibold text-[var(--color-accent-primary)] mt-1">
                    {formatPrice(displayPrice, currency, lang)}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-secondary)]">
                    {size && (
                      <span>
                        {t('size') || 'Size'}: <span className="text-[var(--color-text-primary)]">{size}</span>
                      </span>
                    )}
                    <span>
                      {t('qty') || 'Qty'}: <span className="text-[var(--color-text-primary)]">{quantity}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[var(--color-border)] my-4" />

              {/* Cart Summary */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  {t('total_items_in_cart') || 'Total items in cart'}
                </span>
                <span className="font-semibold text-[var(--color-text-primary)]">{totalItems}</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 pb-6 space-y-3">
              <button
                onClick={handleViewCart}
                className="w-full py-3.5 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-[11px] tracking-[3px] uppercase font-bold cursor-pointer transition-colors hover:bg-[var(--color-accent-primary)]"
              >
                {t('view_cart') || 'View Cart'}
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full py-3.5 text-[11px] tracking-[3px] uppercase font-bold text-[var(--color-text-primary)] border border-[var(--color-text-primary)] bg-transparent cursor-pointer transition-colors hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]"
              >
                {t('continue_shopping') || 'Continue Shopping'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartModal;
