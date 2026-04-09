"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import {
  selectSelectedCategory,
  fetchCategories
} from '@/store/slices/categoriesSlice';
import { getAllProducts, Product } from '@/utils/productsApi';
import { useTranslation } from '@/hooks/useTranslation';

const ProductsGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [shownCount, setShownCount] = useState(8);
  const [products, setProducts] = useState<Product[]>([]);
  const selectedCategory = useSelector(selectSelectedCategory);
  const { t, lang, defaultLanguage } = useTranslation();

  useEffect(() => {
    getAllProducts(lang, defaultLanguage).then((data) => {
      setProducts(data);
    });
  }, [lang, defaultLanguage]);

  useEffect(() => {
    setShownCount(8);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter(product => {
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'sale') return product.badgeType === 'sale';
      if (selectedCategory === 'new') return product.badgeType === 'new';
      
      return product.category.toLowerCase() === selectedCategory.toLowerCase();
    });
  }, [products, selectedCategory]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, shownCount);
  }, [filteredProducts, shownCount]);

  const handleLoadMore = useCallback(() => {
    setShownCount(prev => prev + 4);
  }, []);

  return (
    <section id="products">
      <div className="gap-1 grid grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Show message only when products are loaded but filter returns empty */}
      {filteredProducts.length === 0 && products.length > 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-secondary)]">{t("no_products_found")}</p>
        </div>
      )}

      {filteredProducts.length > shownCount && (
        <div className="text-center py-10">
          <button
            onClick={handleLoadMore}
            className="text-[11px] tracking-[2px] uppercase font-bold text-[var(--color-text-primary)] border-[1.5px] border-[var(--color-text-primary)] px-10 py-3.5 bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]"
          >
            {t("see_more")}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductsGrid;