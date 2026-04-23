'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose, AiOutlineCheckCircle } from 'react-icons/ai';
import { useTranslation } from '@/hooks/useTranslation';

interface ContactSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    message: string;
  } | null;
}

const ContactSuccessModal: React.FC<ContactSuccessModalProps> = ({
  isOpen,
  onClose,
  formData,
}) => {
  const { t } = useTranslation();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          style={{ background: 'var(--color-bg-primary)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] w-full max-w-md overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <AiOutlineCheckCircle className="w-5 h-5 text-[var(--color-accent-primary)]" />
                <h3 className="font-[Oswald] text-sm font-semibold uppercase tracking-[2px] text-[var(--color-text-primary)]">
                  {t('contact_success_title')}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 bg-transparent border-none cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label={t('close') || 'Close'}
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-[var(--color-text-secondary)] mb-6">
                {t('contact_success_description')}
              </p>

              {formData && (
                <div className="bg-[var(--color-bg-primary)] rounded-lg p-4 space-y-3 border border-[var(--color-border)]">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      {t('contact_form_name')}
                    </span>
                    <p className="text-[var(--color-text-primary)] font-medium">
                      {formData.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      {t('contact_form_email')}
                    </span>
                    <p className="text-[var(--color-text-primary)] font-medium">
                      {formData.email}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      {t('contact_form_message')}
                    </span>
                    <p className="text-[var(--color-text-primary)] line-clamp-3">
                      {formData.message}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Button */}
            <div className="px-6 pb-6">
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-[11px] tracking-[3px] uppercase font-bold cursor-pointer transition-colors hover:bg-[var(--color-accent-primary)] rounded"
              >
                {t('contact_success_button')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactSuccessModal;
