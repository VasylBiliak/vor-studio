"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { CartItem } from "@/store/slices/cartSlice";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  updateSize,
} from "@/store/slices/cartSlice";
import { DEFAULT_IMG } from "@/data/products";
import SizeSelector from "@/components/ui/SizeSelector/SizeSelector";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete, AiOutlineDown } from "react-icons/ai";

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  const handleIncrease = () => {
    dispatch(increaseQuantity({ id: item.product.id, size: item.size }));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity({ id: item.product.id, size: item.size }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ id: item.product.id, size: item.size }));
  };

  const handleSizeChange = (newSize: string) => {
    dispatch(
      updateSize({
        id: item.product.id,
        oldSize: item.size,
        newSize,
      })
    );
    setIsSizeDropdownOpen(false);
  };

  const formatPrice = (price: number) => price.toLocaleString("uk-UA") + " ₴";
  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-[var(--color-border)]">
      {/* Product Image */}
      <div className="w-24 h-32 flex-shrink-0 bg-[var(--color-bg-secondary)] overflow-hidden">
        <img
          src={item.product.img?.[0] || DEFAULT_IMG}
          alt={item.product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_IMG;
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-[Oswald] text-sm font-semibold uppercase tracking-wide text-[var(--color-text-primary)] mb-1">
            {item.product.name}
          </h3>
          <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            {formatPrice(item.product.price)}
          </p>

          {/* Size Selector */}
          <SizeSelector
            sizes={item.product.sizes}
            selectedSize={item.size || "S"}
            onSelect={handleSizeChange}
          />
        </div>

        {/* Quantity Controls and Remove */}
        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[var(--color-border)]">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
              aria-label="Decrease quantity"
            >
              <AiOutlineMinus />
            </button>
            <span className="w-10 text-center text-sm font-medium text-[var(--color-text-primary)]">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="w-8 h-8 flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
              aria-label="Increase quantity"
            >
              <AiOutlinePlus />
            </button>
          </div>

          {/* Item Total and Remove */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              {formatPrice(itemTotal)}
            </span>
            <button
              onClick={handleRemove}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
              aria-label="Remove from cart"
            >
              <AiOutlineDelete className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;