"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Product, DEFAULT_IMG } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(product);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('uk-UA') + ' ₴';
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="pimg-wrap">
        <img 
          src={product.img || DEFAULT_IMG} 
          className="pimg" 
          loading="lazy" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_IMG;
          }}
          alt={product.name}
        />
        {product.badge && (
          <span className={`pbadge ${product.badgeType || ''}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="pinfo">
        <div className="pname">{product.name}</div>
        <div className="pprice">{formatPrice(product.price)}</div>
      </div>
      <button className="quick-add" onClick={handleQuickAdd}>
        + До кошика
      </button>
    </div>
  );
};

export default ProductCard;