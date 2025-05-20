'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface PropsNewModal {
  children: React.ReactNode;
  onClose: () => void;
  animate?: boolean;
  styleExternal?: string;
  styleInternal?: string;
  id?: string;
}

export function ModalV2Component({
  children,
  onClose,
  animate,
  styleExternal,
  styleInternal,
  id = 'modal-root'
}: PropsNewModal) {
  const [modalElement, setModalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Criar ou encontrar o elemento do modal
    let element = document.getElementById(id);
    if (!element) {
      element = document.createElement('div');
      element.id = id;
      document.body.appendChild(element);
    }
    setModalElement(element);

    // Travar o scroll
    document.body.style.overflow = 'hidden';

    // Cleanup
    return () => {
      document.body.style.overflow = '';
      if (element && element.parentElement) {
        element.parentElement.removeChild(element);
      }
    };
  }, [id]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!modalElement) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={twMerge(
          'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
          styleExternal
        )}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={twMerge(
            'relative z-50 lg:max-w-[500px] max-w-[390px] w-full max-h-[90vh] overflow-y-auto rounded-md bg-white p-4 shadow-lg',
            styleInternal
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalElement
  );
} 