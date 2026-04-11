'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { AppDispatch } from '@/store';
import { clearCart } from '@/store/slices/cartSlice';
import { useTranslation } from '@/hooks/useTranslation';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  deliveryType: 'pickup' | 'delivery';
  pickupAddress: string;
  deliveryAddress: string;
  paymentType: 'online' | 'cash';
}

const STORE_ADDRESSES = [
  { id: 'store1', label: '159 King St, Toronto, ON M5V 1M1' },
  { id: 'store2', label: '100 Queen St W, Toronto, ON M5H 2N2' },
];

const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    deliveryType: 'pickup',
    pickupAddress: STORE_ADDRESSES[0].label,
    deliveryAddress: '',
    paymentType: 'online',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('required_field') || 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('required_field') || 'Last name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('required_field') || 'Phone is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = t('invalid_phone') || 'Please enter a valid phone number';
    }

    if (formData.deliveryType === 'delivery' && !formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = t('required_field') || 'Delivery address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    dispatch(clearCart());
    router.push('/');
  };

  const inputClasses =
    'w-full px-4 py-3 bg-transparent border border-[var(--color-border)] ' +
    'text-[var(--color-text-primary)] text-sm ' +
    'focus:outline-none focus:border-[var(--color-accent-primary)] ' +
    'transition-colors placeholder:text-[var(--color-text-tertiary)]';

  const labelClasses = 'block text-xs uppercase tracking-[2px] text-[var(--color-text-secondary)] mb-2';

  const errorClasses = 'text-[var(--color-accent-primary)] text-xs mt-1';

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="font-[Oswald] text-lg font-semibold uppercase tracking-[2px] text-[var(--color-text-primary)]">
            {t('personal_info') || 'Personal Information'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>{t('first_name') || 'First Name'} *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClasses}
                placeholder={t('enter_first_name') || 'Enter first name'}
              />
              {errors.firstName && <p className={errorClasses}>{errors.firstName}</p>}
            </div>

            <div>
              <label className={labelClasses}>{t('last_name') || 'Last Name'} *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClasses}
                placeholder={t('enter_last_name') || 'Enter last name'}
              />
              {errors.lastName && <p className={errorClasses}>{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className={labelClasses}>{t('phone') || 'Phone'} *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="+1 (416) 555-0198"
            />
            {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
          </div>
        </div>

        {/* Delivery Method */}
        <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
          <h3 className="font-[Oswald] text-lg font-semibold uppercase tracking-[2px] text-[var(--color-text-primary)]">
            {t('delivery_method') || 'Delivery Method'}
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="deliveryType"
                value="pickup"
                checked={formData.deliveryType === 'pickup'}
                onChange={handleChange}
                className="w-4 h-4 accent-[var(--color-accent-primary)]"
              />
              <span className="text-sm text-[var(--color-text-primary)]">
                {t('pickup') || 'Pickup from store'}
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="deliveryType"
                value="delivery"
                checked={formData.deliveryType === 'delivery'}
                onChange={handleChange}
                className="w-4 h-4 accent-[var(--color-accent-primary)]"
              />
              <span className="text-sm text-[var(--color-text-primary)]">
                {t('delivery') || 'Delivery by post'}
              </span>
            </label>
          </div>

          {/* Pickup Addresses */}
          {formData.deliveryType === 'pickup' && (
            <div className="space-y-3">
              <label className={labelClasses}>{t('select_store') || 'Select Store'}</label>
              <select
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                className={inputClasses + ' cursor-pointer'}
              >
                {STORE_ADDRESSES.map((store) => (
                  <option key={store.id} value={store.label} className="bg-[var(--color-bg-secondary)]">
                    {store.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Delivery Address */}
          {formData.deliveryType === 'delivery' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <label className={labelClasses}>{t('delivery_address') || 'Delivery Address'} *</label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className={inputClasses}
                placeholder={t('enter_address') || 'Enter full address'}
              />
              {errors.deliveryAddress && <p className={errorClasses}>{errors.deliveryAddress}</p>}
            </motion.div>
          )}
        </div>

        {/* Payment Method */}
        <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
          <h3 className="font-[Oswald] text-lg font-semibold uppercase tracking-[2px] text-[var(--color-text-primary)]">
            {t('payment_method') || 'Payment Method'}
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="online"
                checked={formData.paymentType === 'online'}
                onChange={handleChange}
                className="w-4 h-4 accent-[var(--color-accent-primary)]"
              />
              <span className="text-sm text-[var(--color-text-primary)]">
                {t('online_payment') || 'Online payment'}
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="cash"
                checked={formData.paymentType === 'cash'}
                onChange={handleChange}
                className="w-4 h-4 accent-[var(--color-accent-primary)]"
              />
              <span className="text-sm text-[var(--color-text-primary)]">
                {t('cash_on_delivery') || 'Cash on delivery'}
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-xs tracking-[3px] uppercase font-bold cursor-pointer transition-colors hover:bg-[var(--color-accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? t('processing') || 'Processing...'
              : t('place_order') || 'Place Order'}
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
            style={{ background: 'var(--modal_bg)' }}
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-[Oswald] text-xl font-semibold uppercase tracking-[2px] text-[var(--color-text-primary)] mb-4 text-center">
                {t('order_confirmed') || 'Order Confirmed!'}
              </h3>

              <div className="space-y-3 text-sm text-[var(--color-text-secondary)] mb-6">
                <p>
                  <span className="text-[var(--color-text-primary)]">{t('name') || 'Name'}:</span>{' '}
                  {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <span className="text-[var(--color-text-primary)]">{t('phone') || 'Phone'}:</span>{' '}
                  {formData.phone}
                </p>
                <p>
                  <span className="text-[var(--color-text-primary)]">{t('delivery') || 'Delivery'}:</span>{' '}
                  {formData.deliveryType === 'pickup'
                    ? `${t('pickup_from') || 'Pickup from'}: ${formData.pickupAddress}`
                    : `${t('delivery_to') || 'Delivery to'}: ${formData.deliveryAddress}`}
                </p>
                <p>
                  <span className="text-[var(--color-text-primary)]">{t('payment') || 'Payment'}:</span>{' '}
                  {formData.paymentType === 'online'
                    ? t('online_payment') || 'Online payment'
                    : t('cash_on_delivery') || 'Cash on delivery'}
                </p>
              </div>

              <button
                onClick={handleModalClose}
                className="w-full py-3 bg-[var(--color-accent-primary)] text-white text-xs tracking-[3px] uppercase font-bold cursor-pointer transition-colors hover:bg-[var(--color-accent-primary-hover)]"
              >
                {t('ok') || 'OK'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CheckoutForm;
