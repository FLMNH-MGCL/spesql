import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import useKeyboard from './utils/useKeyboard';
import useToggle from './utils/useToggle';

type Props = {
  onEdit(): void;
  onDelete(): void;
  last?: boolean;
};

export default function UserTableDropdown({ onEdit, onDelete, last }: Props) {
  const [visible, { toggle, off }] = useToggle(false);

  useKeyboard('Escape', () => {
    off();
  });

  return (
    <OutsideClickHandler onOutsideClick={off}>
      <div className="relative flex justify-end items-center">
        {/* TRIGGER */}
        <button
          type="button"
          className="w-6 h-6 bg-white dark:bg-dark-500 inline-flex items-center justify-center text-gray-400 dark:text-dark-200 rounded-full hover:text-gray-500 dark:hover:dark:text-dark-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          id="project-options-menu-0"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={toggle}
        >
          <span className="sr-only">Open options</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        {/* BODY */}
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              className={clsx(
                last ? 'bottom-0' : 'top-0',
                'mx-3 origin-top-right absolute right-7 w-48 mt-1 rounded-md shadow-around-lg z-10 bg-white dark:bg-dark-600 ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'
              )}
            >
              <div className="py-1" role="none">
                <span
                  onClick={onEdit}
                  className="cursor-pointer group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-dark-700 dark:hover:text-dark-200"
                  role="menuitem"
                >
                  <svg
                    className="mr-3 h-5 w-5 text-gray-400 dark:text-dark-200 group-hover:text-gray-500 dark:group-hover:text-dark-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </span>
                <span
                  className="cursor-pointer group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-dark-700 dark:hover:text-dark-200"
                  role="menuitem"
                  onClick={onDelete}
                >
                  <svg
                    className="mr-3 h-5 w-5 text-gray-400 dark:text-dark-200 group-hover:text-gray-500 dark:group-hover:text-dark-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OutsideClickHandler>
  );
}
