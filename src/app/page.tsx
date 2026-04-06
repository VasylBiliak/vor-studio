"use client";

import Header from "@/components/layout/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import ProductsGrid from "@/components/sections/ProductsGrid/ProductsGrid";
import Footer from "@/components/layout/Footer/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <ProductsGrid />
    </main>
  );
}