"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/utils/productsApi';
import { getDiscountBadgeText } from '@/utils/normalizeProduct';
import { formatPrice } from '@/utils/formatCurrency';
import { useTranslation } from '@/hooks/useTranslation';

import { DEFAULT_IMG } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onQuickAdd, index = 0 }) => {
  const router = useRouter();
  const { currency, lang } = useTranslation();

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const animationDelay = Math.min(index * 40, 320);
  const discountBadge = getDiscountBadgeText(product.discount);

  // Format prices with dynamic currency
  const formattedPrice = formatPrice(product.price, currency, lang);
  const formattedFinalPrice = formatPrice(product.finalPrice, currency, lang);

  return (
    <div
      className="group relative bg-[var(--color-bg-primary)] cursor-pointer overflow-hidden animate-fade-up"
      onClick={handleCardClick}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-[var(--color-bg-secondary)]">
        <img
          src={(product.images && product.images[0]) || DEFAULT_IMG}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMG; }}
          alt={product.name}
        />

        {/* Discount badge */}
        {product.hasDiscount && discountBadge && (
          <span className="absolute top-3.5 right-3.5 text-[9px] tracking-[2px] uppercase font-bold px-2.5 py-1.5 text-white bg-[var(--color-accent-primary)]">
            {discountBadge}
          </span>
        )}

        {/* Product badge (New, Best, etc.) */}
        {product.badge && (
          <span className={`absolute top-3.5 left-3.5 text-[9px] tracking-[2px] uppercase font-bold px-2.5 py-1.5 text-[var(--color-bg-primary)] ${
            product.badgeType === 'sale' ? 'bg-[var(--color-accent-primary)]' :
            product.badgeType === 'new' ? 'bg-[var(--color-accent-secondary)]' : 'bg-[var(--color-text-primary)]'
          }`}>
            {product.badge}
          </span>
        )}
      </div>

      <div className="px-1 pt-4 pb-5">
        <div className="text-xs font-semibold tracking-wide uppercase text-[var(--color-text-primary)] mb-2 leading-tight">
          {product.name}
        </div>
        <div className="flex items-center gap-2">
          {product.hasDiscount ? (
            <>
              <span className="text-sm font-semibold text-[var(--color-accent-primary)]">
                {formattedFinalPrice}
              </span>
              <span className="text-xs text-[var(--color-text-secondary)] line-through">
                {formattedPrice}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              {formattedPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;