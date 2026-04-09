"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AppDispatch } from "@/store";
import {
  selectLastAddedItem,
  selectCartTotalItems,
  clearLastAddedItem,
} from "@/store/slices/cartSlice";
import { DEFAULT_IMG } from "@/data/products";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPrice } from "@/utils/formatCurrency";

const CartPopup: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const lastAddedItem = useSelector(selectLastAddedItem);
  const totalItems = useSelector(selectCartTotalItems);
  const [isVisible, setIsVisible] = useState(false);
  const { t, currency, lang } = useTranslation();

  useEffect(() => {
    if (lastAddedItem) {
      setIsVisible(true);

      const autoCloseTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      const clearTimer = setTimeout(() => {
        dispatch(clearLastAddedItem());
      }, 3300);

      return () => {
        clearTimeout(autoCloseTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [lastAddedItem, dispatch]);

  const closeWithDelay = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(clearLastAddedItem());
    }, 300);
  }, [dispatch]);

  const handleViewCart = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(clearLastAddedItem());
      router.push("/cart");
    }, 300);
  }, [dispatch, router]);

  const productImage = useMemo(() => {
    const images = lastAddedItem?.product?.images;
    return Array.isArray(images) && images.length > 0 ? images[0] : DEFAULT_IMG;
  }, [lastAddedItem?.product?.id, lastAddedItem?.product?.images]);

  const formattedPrice = useMemo(() => {
    if (!lastAddedItem?.product) return "";
    const price = lastAddedItem.product.hasDiscount 
      ? lastAddedItem.product.finalPrice 
      : lastAddedItem.product.price;
    return formatPrice(price, currency, lang);
  }, [lastAddedItem?.product, currency, lang]);

  if (!lastAddedItem) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 z-[950] w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-semibold text-gray-800">{t("just_added")}</span>
            </div>
            <button
              onClick={closeWithDelay}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-200"
              aria-label={t("close")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4">
            <div className="flex gap-3 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={productImage}
                  alt={lastAddedItem.product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{lastAddedItem.product.name}</h3>
                <p className="text-sm text-gray-600 mt-0.5">{formattedPrice}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span>{t("qty")}: {lastAddedItem.quantity}</span>
                  {lastAddedItem.size && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span>{t("size")}: {lastAddedItem.size}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg mb-4">
              <span className="text-xs text-gray-500">{t("items_in_cart")}</span>
              <span className="text-sm font-semibold text-gray-900">{totalItems}</span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleViewCart}
                className="w-full py-2.5 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors"
              >
                {t("view_cart")}
              </button>
              <button
                onClick={closeWithDelay}
                className="w-full py-2.5 bg-white text-gray-900 text-xs font-semibold uppercase tracking-wider rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {t("continue_shopping")}
              </button>
            </div>
          </div>

          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            className="h-1 bg-green-500"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(CartPopup);