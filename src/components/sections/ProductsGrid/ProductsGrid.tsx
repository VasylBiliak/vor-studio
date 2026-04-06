"use client";

import React, { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import { PRODUCTS, Product } from '@/data/products';

interface ProductsGridProps {
  onQuickAdd?: (product: Product) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ onQuickAdd }) => {
  const [shownCount, setShownCount] = useState(8);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = PRODUCTS.filter(product => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'sale') return product.badgeType === 'sale';
    if (activeCategory === 'new') return product.badgeType === 'new';
    return product.category === activeCategory;
  });
  const displayedProducts = filteredProducts.slice(0, shownCount);

  const handleLoadMore = () => {
    setShownCount(prev => prev + 4);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setShownCount(8);
  };

  return (
    <>
      <section className="section" id="products-section">
        <div className="section-header">
          <h2 className="section-title">Свіжі релізи</h2>
          <button className="all-link">Всі позиції →</button>
        </div>
        <div className="products-grid">
          {displayedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
        {filteredProducts.length > shownCount && (
          <div className="load-more-wrap">
            <button className="load-more-btn" onClick={handleLoadMore}>
              Дивитись більше
            </button>
          </div>
        )}
      </section>

      <section className="cats-strip">
        <div className="cat-card">
          <div className="cat-bg">
            <div className="cat-label">HOODIES</div>
          </div>
        </div>
        <div className="cat-card">
          <div className="cat-bg">
            <div className="cat-label">TEES</div>
          </div>
        </div>
        <div className="cat-card">
          <div className="cat-bg">
            <div className="cat-label">ДЕТАЛІ</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsGrid;