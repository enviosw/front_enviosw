// src/components/common/ToastNotification.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi'; // Icon for success

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // Duration in milliseconds before it closes automatically
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  console.log('ToastNotification rendered:', { message, isVisible });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }} // Start from above and invisible
          animate={{ y: 0, opacity: 1 }} // Slide down and become visible
          exit={{ y: -100, opacity: 0 }} // Slide up and fade out
          transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Smooth spring animation
          className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl
                     flex items-center gap-3 z-[1000] min-w-[280px] max-w-sm text-center" // High z-index to be on top
          role="status"
          aria-live="polite"
        >
          <HiCheckCircle className="h-6 w-6" />
          <span className="font-semibold text-sm md:text-base">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;