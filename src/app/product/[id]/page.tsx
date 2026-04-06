"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProductById, getRelatedProducts, Product, DEFAULT_IMG } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(productId);

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <button 
          onClick={() => router.push('/')}
          className="text-[11px] tracking-[2px] uppercase font-bold text-[#0a0a0a] border border-[#0a0a0a] px-6 py-3 hover:bg-[#0a0a0a] hover:text-white transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert('Оберіть розмір');
      return;
    }
    console.log('Add to cart:', product.name, selectedSize);
    // TODO: Implement cart functionality
  };

  const handleQuickAdd = (relatedProduct: Product) => {
    console.log('Quick add related product:', relatedProduct.name);
    // TODO: Implement cart functionality
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('uk-UA') + ' ₴';
  };

  return (
    <>
      {/* Product Details */}
      <div className="p-5 md:p-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 flex-wrap text-[11px] tracking-wide uppercase text-[#888] mb-9">
          <button 
            onClick={() => router.push('/')}
            className="text-[#888] bg-transparent border-none cursor-pointer transition-colors hover:text-[#0a0a0a]"
          >
            Головна
          </button>
          <span>/</span>
          <button 
            onClick={() => router.push('/')}
            className="text-[#888] bg-transparent border-none cursor-pointer transition-colors hover:text-[#0a0a0a]"
          >
            Каталог
          </button>
          <span>/</span>
          <span className="text-[#0a0a0a] font-semibold">{product.name}</span>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-start">
          {/* Gallery */}
          <div className="flex flex-col gap-2">
            <div className="aspect-[3/4] bg-[#f5f5f5] overflow-hidden">
              <img 
                src={product.img || DEFAULT_IMG} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = DEFAULT_IMG;
                }}
                alt={product.name}
              />
            </div>
            <div className="flex gap-2">
              {/* TODO: Add thumbnail images when available */}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-[Oswald] text-2xl md:text-3xl lg:text-[clamp(24px,3vw,40px)] font-bold uppercase tracking-wide leading-none mb-4">
              {product.name}
            </h1>
            <div className="text-[22px] font-semibold mb-6">
              {formatPrice(product.price)}
            </div>
            
            <div 
              className="text-sm leading-relaxed text-[#444] mb-8"
              dangerouslySetInnerHTML={{ __html: product.desc }} 
            />
            
            {/* Size Selection */}
            <div className="text-[10px] tracking-[2px] uppercase font-bold mb-3">
              ОБЕРІТЬ ВЛАСНИЙ РОЗМІР
            </div>
            <div className="flex gap-2 flex-wrap mb-8">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`min-w-[48px] h-12 border-[1.5px] bg-transparent text-xs font-semibold tracking-wide uppercase cursor-pointer transition-colors px-3 ${
                    selectedSize === size 
                      ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]' 
                      : 'border-[#e0e0e0] hover:border-[#0a0a0a]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#0a0a0a] text-white text-xs tracking-[3px] uppercase font-bold cursor-pointer transition-colors hover:bg-[#c0392b] mb-4"
            >
              ДОДАТИ В КОШИК
            </button>

            {/* Meta Info */}
            <div className="border-t border-[#e0e0e0] pt-6 flex flex-col gap-5">
              <div>
                <h4 className="text-[10px] tracking-[2px] uppercase font-bold mb-2">
                  📐 Допомога з розміром
                </h4>
                <p className="text-xs leading-relaxed text-[#555]">
                  Не впевнені у параметрах? Перегляньте нашу детальну таблицю замірів.
                </p>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[2px] uppercase font-bold mb-2">
                  🚚 Сервіс та логістика
                </h4>
                <p className="text-xs leading-relaxed text-[#555]">
                  Обробка та підготовка замовлення триває до 10-14 днів. Локальна доставка — Нова Пошта, міжнародна — Global Shipping. Обмін та повернення доступні протягом 14 діб.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="px-5 md:px-10 py-10 md:py-[60px]">
        <h3 className="font-[Oswald] text-xl md:text-2xl font-semibold uppercase tracking-wide mb-8">
          Схожі пропозиції
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard 
              key={relatedProduct.id} 
              product={relatedProduct}
              index={index}
              onQuickAdd={handleQuickAdd}
            />
          ))}
        </div>
      </section>
    </>
  );
}