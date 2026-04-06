"use client";

import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import { PRODUCTS } from '@/data/products';
import { 
  selectSelectedCategory, 
  selectCategories, 
  setSelectedCategory, 
  initializeCategories 
} from '@/store/slices/categoriesSlice';

interface ProductsGridProps {
  // No props needed since cart is handled by Redux
}

const ProductsGrid: React.FC<ProductsGridProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [shownCount, setShownCount] = useState(8);
  
  const selectedCategory = useSelector(selectSelectedCategory);
  const categories = useSelector(selectCategories);

  React.useEffect(() => {
    dispatch(initializeCategories());
  }, [dispatch]);

  // Filter products based on selected category from Redux
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'sale') return product.badgeType === 'sale';
      if (selectedCategory === 'new') return product.badgeType === 'new';
      return product.category === selectedCategory;
    });
  }, [selectedCategory]);

  const displayedProducts = filteredProducts.slice(0, shownCount);

  const handleLoadMore = () => {
    setShownCount(prev => prev + 4);
  };

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    setShownCount(8); // Reset shown count when category changes
  };

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.label || categoryId;
  };

  return (
    <>
      <section id="products-section">
        {/* Category Filter Buttons */}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0.5">
          {displayedProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product}
              index={index}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#888]">Продуктів у цій категорії не знайдено</p>
          </div>
        )}
        
        {filteredProducts.length > shownCount && (
          <div className="text-center py-10">
            <button 
              onClick={handleLoadMore}
              className="text-[11px] tracking-[2px] uppercase font-bold text-[#0a0a0a] border-[1.5px] border-[#0a0a0a] px-10 py-3.5 bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[#0a0a0a] hover:text-white"
            >
              Дивитись більше
            </button>
          </div>
        )}
      </section>

      {/* Category Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-0.5 px-5 md:px-10 pb-16">
        {/* HOODIES */}
        <div className="overflow-hidden aspect-square md:aspect-auto md:h-64 cursor-pointer group">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-400 group-hover:scale-[1.06] bg-gradient-to-br from-[#1a1a1a] to-[#333]">
            <span className="font-[Oswald] text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-[2px] text-white text-center">
              HOODIES
            </span>
          </div>
        </div>

        {/* TEES */}
        <div className="overflow-hidden aspect-square md:aspect-auto md:h-64 cursor-pointer group">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-400 group-hover:scale-[1.06] bg-gradient-to-br from-[#2c1a1a] to-[#5a2020]">
            <span className="font-[Oswald] text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-[2px] text-white text-center">
              TEES
            </span>
          </div>
        </div>

        {/* ДЕТАЛІ */}
        <div className="overflow-hidden aspect-square md:aspect-auto md:h-64 cursor-pointer group">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-400 group-hover:scale-[1.06] bg-gradient-to-br from-[#1a1a2a] to-[#2a2a4a]">
            <span className="font-[Oswald] text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-[2px] text-white text-center">
              ДЕТАЛІ
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsGrid;