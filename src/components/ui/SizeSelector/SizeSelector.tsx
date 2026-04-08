"use client";

import React from "react";

type SizeSelectorProps = {
  sizes: string[];
  selectedSize?: string;
  onSelect: (size: string) => void;
};

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize = "S",
  onSelect,
}) => {
  if (!sizes.length) return null;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-[6px]">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`h-[42px] min-w-[42px] px-3 border text-[11px] tracking-[1px] uppercase font-semibold transition-colors ${
              selectedSize === size
                ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] border-[var(--color-text-primary)]"
                : "bg-transparent border-[var(--color-border)] hover:border-[var(--color-text-primary)] text-[var(--color-text-primary)]"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;