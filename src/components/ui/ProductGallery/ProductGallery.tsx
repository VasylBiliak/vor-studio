"use client";

import React, { useState } from "react";
import { DEFAULT_IMG } from "@/data/products";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState(images[0] || DEFAULT_IMG);

  const handleThumbnailClick = (src: string) => {
    setMainImage(src);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ── Main Image ── */}
      <div className="w-full aspect-[4/5] bg-[var(--color-bg-secondary)] overflow-hidden rounded-md">
        <img
          src={mainImage || DEFAULT_IMG}
          alt={productName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_IMG;
          }}
        />
      </div>

      {/* ── Thumbnails ── */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <div
            key={i}
            className={`flex-none w-[80px] aspect-[4/5] rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
              mainImage === src
                ? "border-[var(--color-text-primary)]"
                : "border-transparent hover:border-[var(--color-text-primary)]"
            }`}
            onClick={() => handleThumbnailClick(src)}
          >
            <img
              src={src || DEFAULT_IMG}
              alt={`${productName} ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_IMG;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;