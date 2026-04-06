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
      <div className="prod-page">
        <h1>Product not found</h1>
        <button onClick={() => router.push('/')}>Back to Home</button>
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
      <div className="prod-page">
        <div className="breadcrumb">
          <button onClick={() => router.push('/')}>Головна</button> /
          <button onClick={() => router.push('/')}>Каталог</button> /
          <span>{product.name}</span>
        </div>
        <div className="prod-layout">
          <div className="prod-gallery">
            <div className="prod-main-img">
              <img 
                src={product.img || DEFAULT_IMG} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = DEFAULT_IMG;
                }}
                alt={product.name}
              />
            </div>
            <div className="prod-thumbs">
              {/* TODO: Add thumbnail images when available */}
            </div>
          </div>
          <div>
            <h1 className="prod-title">{product.name}</h1>
            <div className="prod-price-el">{formatPrice(product.price)}</div>
            <div className="prod-desc" dangerouslySetInnerHTML={{ __html: product.desc }} />
            <div className="size-label">ОБЕРІТЬ ВЛАСНИЙ РОЗМІР</div>
            <div className="size-grid">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="add-btn" onClick={handleAddToCart}>
              ДОДАТИ В КОШИК
            </button>
            <div className="prod-meta">
              <div className="prod-meta-block">
                <h4>📐 Допомога з розміром</h4>
                <p>Не впевнені у параметрах? Перегляньте нашу детальну таблицю замірів.</p>
              </div>
              <div className="prod-meta-block">
                <h4>🚚 Сервіс та логістика</h4>
                <p>Обробка та підготовка замовлення триває до 10-14 днів. Локальна доставка — Нова Пошта, міжнародна — Global Shipping. Обмін та повернення доступні протягом 14 діб.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="related-section">
        <h3>Схожі пропозиції</h3>
        <div className="related-grid">
          {relatedProducts.map(relatedProduct => (
            <ProductCard 
              key={relatedProduct.id} 
              product={relatedProduct} 
              onQuickAdd={handleQuickAdd}
            />
          ))}
        </div>
      </section>
    </>
  );
}