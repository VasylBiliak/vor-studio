"use client";

import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const CartButton = ({ count = 0, onClick }) => {
  return (
    <button onClick={onClick} className="relative flex items-center justify-center">
      <HiOutlineShoppingBag className="text-3xl hover:text-[var(--color-accent-primary)]" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded-full bg-[var(--color-accent-primary)] text-[var(--color-text-primary)]">
          {count}
        </span>
      )}
    </button>
  );
};

export default CartButton;