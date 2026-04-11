'use client';


import Hero from '@/components/sections/Hero/Hero';
import ProductsGrid from '@/components/sections/ProductsGrid/ProductsGrid';

export default function HomeContent() {
  return (
    <main>
      {/* <Banner /> import Banner from '@/components/sections/Banner/Banner';*/}
      <Hero />
      <ProductsGrid />
    </main>
  );
}
