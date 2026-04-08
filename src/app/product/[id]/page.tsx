"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import AddToCartButton from '@/components/ui/AddToCartButton/AddToCartButton';
import SizeSelector from '@/components/ui/SizeSelector/SizeSelector';
import ProductGallery from '@/components/ui/ProductGallery/ProductGallery';
import { getProductById, getRelatedProducts, Product } from '@/utils/productsApi';

const DEFAULT_IMG = '/placeholder-product.png';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const fetchedProduct = await getProductById(productId);
      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        // Встановлюємо перший доступний розмір як дефолтний
        if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }
        
        const related = await getRelatedProducts(productId);
        setRelatedProducts(related);
      }
      setIsLoading(false);
    }
    
    loadData();
  }, [productId]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  }, []);

  const formatPrice = (price: number) => price.toLocaleString('uk-UA') + ' ₴';

  if (isLoading) {
    return <div className="p-10 text-center uppercase tracking-widest text-xs">Завантаження...</div>;
  }

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Товар не знайдено</h1>
        <button
          onClick={() => router.push('/')}
          className="text-[11px] tracking-[2px] uppercase font-bold text-[var(--color-text-primary)] border border-[var(--color-text-primary)] px-6 py-3 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-colors"
        >
          Назад до головної
        </button>
      </div>
    );
  }

  const images: string[] = Array.isArray(product.img)
    ? product.img.length > 0 ? product.img : [DEFAULT_IMG]
    : [product.img || DEFAULT_IMG];

  const infoSections = [
    {
      key: 'sizes',
      label: 'Розмірна сітка',
      content: 'Вагаєтесь з вибором розміру? Скористайтеся нашою детальною таблицею замірів або зверніться до нас.',
    },
    {
      key: 'delivery',
      label: 'Доставка та повернення',
      content: 'Відправка — протягом 10-14 робочих днів після оплати. По Україні — Нова Пошта, за кордон — Global Shipping. Повернення можливе протягом 14 днів після отримання за умови збереження належного стану.',
    },
  ];

  return (
    <main>
      <div className="px-4 sm:px-6 md:px-10 pt-5 pb-12">
        <div className="flex items-center gap-2 flex-wrap text-[10px] tracking-[1.5px] uppercase text-[var(--color-text-secondary)] mb-6">
          <button onClick={() => router.push('/')} className="bg-transparent border-none cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            Магазин
          </button>
          <span>/</span>
          <button onClick={() => router.push('/')} className="bg-transparent border-none cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            Каталог
          </button>
          <span>/</span>
          <span className="text-[var(--color-text-primary)]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-8 items-start xl:grid-cols-[1fr_1fr]">
          <ProductGallery images={images} productName={product.name} />
          
          <div className="lg:sticky lg:top-6">
            <h1 className="font-[Oswald] text-[clamp(20px,3.5vw,32px)] font-bold uppercase tracking-wide leading-tight mb-3">
              {product.name}
            </h1>

            <div className="text-[18px] font-semibold mb-5">
              {formatPrice(product.price)}
            </div>

            <div
              className="text-[13px] leading-[1.9] text-[var(--color-text-secondary)] mb-7 [&_p]:mb-2 [&_ul]:list-none [&_ul]:p-0 [&_ul]:m-0 [&_li]:mb-0.5"
              dangerouslySetInnerHTML={{ __html: product.desc }}
            />

            {product.sizes && product.sizes.length > 0 && (
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelect={setSelectedSize}
              />
            )}

            <AddToCartButton product={product} selectedSize={selectedSize} />

            <div className="border-t border-[var(--color-text-primary)] mt-8">
              {infoSections.map(({ key, label, content }) => (
                <div key={key} className="border-b border-[var(--color-text-primary)]">
                  <button
                    onClick={() => toggleSection(key)}
                    className="w-full flex items-center justify-between py-4 text-left bg-transparent border-none cursor-pointer"
                  >
                    <span className="text-[11px] tracking-[2px] uppercase font-bold text-[var(--color-text-primary)]">
                      {label}
                    </span>
                    <span className="text-[18px] leading-none text-[var(--color-text-primary)] ml-4 select-none">
                      {expandedSection === key ? '↑' : '↓'}
                    </span>
                  </button>
                  {expandedSection === key && (
                    <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)] pb-4">
                      {content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="px-4 sm:px-6 md:px-10 py-10 border-t border-[var(--color-border)]">
          <h3 className="font-[Oswald] text-base font-semibold uppercase tracking-[3px] mb-7 text-[var(--color-text-primary)]">
            Вам може сподобатись
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                index={index}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}