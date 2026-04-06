"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store';
import { Product, DEFAULT_IMG } from '@/data/products';
import { addToCart, openCart } from '@/store/slices/cartSlice';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd, index = 0 }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Add to cart using Redux
    dispatch(addToCart({ 
      product, 
      size: product.sizes.length > 0 ? product.sizes[0] : undefined 
    }));
    
    // Open cart sidebar
    dispatch(openCart());
    
    // Optional: Call the original onQuickAdd if provided
    if (onQuickAdd) {
      onQuickAdd(product);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('uk-UA') + ' ₴';
  };

  // Animation delay based on index
  const animationDelay = Math.min(index * 40, 320); // Max 320ms delay

  return (
    <div 
      className="group relative bg-white cursor-pointer overflow-hidden animate-fade-up"
      onClick={handleCardClick}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#f5f5f5]">
        <img 
          src={product.img || DEFAULT_IMG} 
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
          loading="lazy" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_IMG;
          }}
          alt={product.name}
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3.5 left-3.5 text-[9px] tracking-[2px] uppercase font-bold px-2.5 py-1.5 text-white ${
            product.badgeType === 'sale' ? 'bg-[#c0392b]' : 
            product.badgeType === 'new' ? 'bg-[#2c7a4b]' : 'bg-[#0a0a0a]'
          }`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="px-1 pt-4 pb-5">
        <div className="text-xs font-semibold tracking-wide uppercase text-[#0a0a0a] mb-2 leading-tight">
          {product.name}
        </div>
        <div className="text-sm font-semibold text-[#0a0a0a]">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Quick Add Button */}
      <button 
        onClick={handleQuickAdd}
        className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a] text-white text-[10px] tracking-[2px] uppercase font-bold px-3 py-3 text-center cursor-pointer w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      >
        + До кошика
      </button>
    </div>
  );
};

export default ProductCard;