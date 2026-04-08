"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { scrollToSection } from '@/src/utils/scrollTo';
import { AppDispatch } from '@/store';

import {
  selectCategories,
  selectSelectedCategory,
  setSelectedCategory,
  initializeCategories
} from '@/store/slices/categoriesSlice';

interface CategoryListProps {
  onClose?: () => void;
  className?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const router = useRouter();

  const [lang, setLang] = useState<'en' | 'ua'>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'en' | 'ua';
    if (savedLang) setLang(savedLang);
  }, [dispatch]);

  const handleCategoryClick = (categoryId: string) => {
    router.push("/#products");
    scrollToSection('products');
    dispatch(setSelectedCategory(categoryId));
    onClose?.();
  };

  return (
    <div className="flex flex-wrap justify-center text-4xl text-[var(--color-text-primary)] gap-0.5 md:gap-1">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`
            bg-transparent border-none cursor-pointer transition-colors duration-200 text-left
            font-[Oswald] text-[28px] font-semibold uppercase tracking-[2px] border-b border-[var(--color-border)] py-2 w-full
            md:font-sans md:text-[11px] md:tracking-[1.5px] md:border-b-2 md:px-3.5 md:py-3 md:w-auto md:border-[var(--color-border)]
            ${selectedCategory === category.id
              ? 'text-[var(--color-accent-primary)] md:border-b-[var(--color-accent-primary)]'
              : 'text-[var(--color-text-primary)] md:border-b-transparent hover:text-[var(--color-accent-primary)] md:hover:text-[var(--color-text-primary)] md:hover:border-b-[var(--color-text-primary)]'
            }
          `}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;