


"use client";

import Hero from "@/components/sections/Hero/Hero";
import ProductsGrid from "@/components/sections/ProductsGrid/ProductsGrid";

import { Product } from "@/data/products";

export default function Page() {
  const handleQuickAdd = (product: Product) => {
    console.log('Quick add product:', product.name);
    // TODO: Implement cart functionality
  };

  return (
    <main>
      <Hero />
      <ProductsGrid onQuickAdd={handleQuickAdd} />
    </main>
  );
}