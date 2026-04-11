"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { scrollToSection } from '@/src/utils/scrollTo';
import { AppDispatch } from '@/store';

import {
  selectCategories,
  selectSelectedCategory,
  setSelectedCategory,
  fetchCategories
} from '@/store/slices/categoriesSlice';
import { selectLanguage } from '@/store/slices/i18nSlice';

interface CategoryListProps {
  onClose?: () => void;
  className?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const lang = useSelector(selectLanguage);
  const router = useRouter();

  // Fetch categories when language changes
  useEffect(() => {
    dispatch(fetchCategories(lang));
  }, [dispatch, lang]);

  const handleCategoryClick = (categoryId: string) => {
    router.push("/#products");
    scrollToSection('products');
    dispatch(setSelectedCategory(categoryId));
    onClose?.();
  };

  return (
    <div className="flex flex-wrap justify-center items-center text-4xl 
    text-[var(--color-text-primary)] gap-0.4 md:gap-1">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`
  relative bg-transparent border-none cursor-pointer
  font-[Oswald] uppercase tracking-[2px]
  transition-all duration-300

  text-[24px] py-2 w-full text-center
  md:text-[12px] md:w-auto md:px-4 md:py-3 md:tracking-[1.5px]

  after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0
  after:bg-[var(--color-accent-primary)] after:transition-all after:duration-300

  ${selectedCategory === category.id
              ? 'text-[var(--color-accent-primary)] after:w-full'
              : `
      text-[var(--color-text-primary)]
      md:hover:text-[var(--color-accent-primary)]
      md:hover:after:w-full
    `
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