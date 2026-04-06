"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  variant?: 'desktop' | 'mobile';
}

const CategoryList: React.FC<CategoryListProps> = ({ onClose, className = '', variant = 'desktop' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);

  useEffect(() => {
    dispatch(initializeCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: string) => {
    scrollToSection('products-section');
    dispatch(setSelectedCategory(categoryId));
    if (onClose) {
      onClose();
    }
  };

  // Desktop variant - horizontal nav buttons
  if (variant === 'desktop') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`text-[11px] tracking-[1.5px] uppercase font-semibold bg-transparent border-none border-b-2 px-3.5 py-3 cursor-pointer transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'text-[#c0392b] border-b-[#c0392b]'
                : 'text-[#0a0a0a] border-b-transparent hover:border-b-[#0a0a0a]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    );
  }

  // Mobile variant - vertical list
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`font-[Oswald] text-[28px] font-semibold uppercase tracking-[2px] bg-transparent border-b border-[#e0e0e0] py-2 text-left w-full cursor-pointer transition-colors duration-200 ${
            selectedCategory === category.id
              ? 'text-[#c0392b]'
              : 'text-[#0a0a0a] hover:text-[#c0392b]'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
