"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import ContactSuccessModal from '@/components/ui/ContactSuccessModal/ContactSuccessModal';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact_error_required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact_error_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact_error_email');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact_error_required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmittedData({ ...formData });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text-primary)]">
            {t('contact_title')}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            {t('contact_description')}
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
        >
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--color-text-primary)] uppercase tracking-wide"
            >
              {t('contact_form_name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[var(--color-bg-secondary)] border rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] transition-all ${
                errors.name ? 'border-red-500' : 'border-[var(--color-border)]'
              }`}
              placeholder={t('contact_name')}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-text-primary)] uppercase tracking-wide"
            >
              {t('contact_form_email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[var(--color-bg-secondary)] border rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] transition-all ${
                errors.email ? 'border-red-500' : 'border-[var(--color-border)]'
              }`}
              placeholder={t('contact_email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[var(--color-text-primary)] uppercase tracking-wide"
            >
              {t('contact_form_message')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 bg-[var(--color-bg-secondary)] border rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] transition-all resize-none ${
                errors.message ? 'border-red-500' : 'border-[var(--color-border)]'
              }`}
              placeholder={t('contact_message')}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm tracking-[3px] uppercase font-bold cursor-pointer transition-colors hover:bg-[var(--color-accent-primary)] rounded-lg"
          >
            {t('contact_submit')}
          </motion.button>
        </motion.form>
      </div>

      {/* Success Modal */}
      <ContactSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={submittedData}
      />
    </main>
  );
};

export default ContactSection;
