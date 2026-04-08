// components/ui/AddToCartButton/AddToCartButton.tsx
"use client";

import React from 'react';
import { Product } from '@/data/products';
import { useAddToCart } from '@/hooks/useAddToCart';

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
  label = 'Add to Cart',
}) => {
  const { handleAddToCart } = useAddToCart();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (requireSize && !selectedSize && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }

    handleAddToCart(product, selectedSize ?? undefined);
  };

  return (
    <button
      onClick={handleClick}
      className={className ?? 'w-full h-[50px] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-[11px] tracking-[3px] uppercase font-bold hover:opacity-75 transition-opacity'}
    >
      {label}
    </button>
  );
};

export default AddToCartButton;