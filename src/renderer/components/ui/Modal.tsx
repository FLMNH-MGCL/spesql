import React, { useEffect } from "react";
import FocusTrap from "./FocusTrap";
import Portal from "./Portal";
import { AnimatePresence, motion } from "framer-motion";
import noScroll from "no-scroll";

type ContentProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
};

// TODO: do
function ModalContent({ title, children }: ContentProps) {
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="mt-3 sm:mt-0">
        {typeof title === "string" ? (
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
        ) : (
          title
        )}

        <div className="mt-2 whitespace-normal">{children}</div>
      </div>
    </div>
  );
}

// TODO: do
function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sticky">
      {children}
    </div>
  );
}

type ModalProps = {
  open: boolean;
  onClose(): void;
  children: React.ReactNode;
};

// TODO: use media queries
export default function Modal({ open, onClose, children }: ModalProps) {
  const modalInitial = {
    opacity: 0,
    scale: 0.95,
  };

  const modalIn = {
    opacity: 1,
    y: 0,
  };

  useEffect(() => {
    // we do not want external scrolling on modals,
    // only internal modal scrolling
    if (open) {
      noScroll.on();
    }

    // on unmount, toggle scrolling to be
    // enabled again
    return () => {
      noScroll.off();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <Portal>
          <FocusTrap>
            <div className="z-30 fixed bottom-0 items-center inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-0 transition-opacity"
                onClick={onClose}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </motion.div>

              <motion.div
                initial={modalInitial}
                animate={modalIn}
                exit={modalInitial}
                transition={{ duration: 0.2, ease: "easeOut" }}
                role="dialog"
                className="relative bg-white rounded-lg overflow-hidden shadow-xl sm:max-w-lg sm:w-full z-30 max-h-full"
              >
                {children}
              </motion.div>
            </div>
          </FocusTrap>
        </Portal>
      )}
    </AnimatePresence>
  );
}

Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
