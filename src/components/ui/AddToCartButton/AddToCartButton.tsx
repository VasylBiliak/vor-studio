// components/ui/AddToCartButton/AddToCartButton.tsx
"use client";

import React from 'react';
import { Product } from '@/utils/productsApi';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useTranslation } from '@/hooks/useTranslation';

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: string | null;
  requireSize?: boolean;
  className?: string;
  label?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedSize,
  requireSize = true,
  className,
  label,
}) => {
  const { handleAddToCart } = useAddToCart();
  const { t } = useTranslation();

  // Use provided label or fallback to translation
  const buttonLabel = label || t("add_to_cart");

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (requireSize && !selectedSize && product.sizes.length > 0) {
      alert(t("select_size"));
      return;
    }

    handleAddToCart(product, selectedSize ?? undefined);
  };

  return (
    <button
      onClick={handleClick}
      className={className ?? 'w-full h-[50px] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-[11px] tracking-[3px] uppercase font-bold hover:opacity-75 transition-opacity'}
    >
      {buttonLabel}
    </button>
  );
};

export default AddToCartButton;