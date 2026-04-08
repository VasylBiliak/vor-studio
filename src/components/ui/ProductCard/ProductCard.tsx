"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAddToCart } from '@/hooks/useAddToCart';
import { Product } from '@/utils/productsApi';

import { DEFAULT_IMG } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onQuickAdd, index = 0 }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const formatPrice = (price: number) => price.toLocaleString('uk-UA') + ' ₴';

  const animationDelay = Math.min(index * 40, 320);

  return (
    <div
      className="group relative bg-[var(--color-bg-primary)] cursor-pointer overflow-hidden animate-fade-up"
      onClick={handleCardClick}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-[var(--color-bg-secondary)]">
        <img
          src={(product.img && product.img[0]) || DEFAULT_IMG}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMG; }}
          alt={product.name}
        />

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
        <div className="text-sm font-semibold text-[var(--color-text-primary)]">
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;