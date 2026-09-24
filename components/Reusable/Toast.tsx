"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert, X } from "lucide-react";

const Toast = ({
  message,
  onClose,
  duration = 7000,
}: {
  message: string | null;
  onClose: () => void;
  duration?: number;
}) => {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [message, duration, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          role="alert"
          initial={{ opacity: 0, y: -24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl border-t border-b border-white/80 bg-white/30 p-4 text-primary shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,71,99,0.35)] backdrop-blur-xl"
        >
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2} />
          <p className="flex-1 text-sm leading-snug font-medium">{message}</p>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onClose}
            className="-m-1 shrink-0 cursor-pointer rounded-full p-1 transition-colors hover:bg-white/40"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
