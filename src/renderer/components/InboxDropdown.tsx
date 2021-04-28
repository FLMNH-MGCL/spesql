import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { RequestStatus } from '../types';
import useKeyboard from './utils/useKeyboard';
import useToggle from './utils/useToggle';

type Props = {
  status: RequestStatus;
  onViewClick(): void;
  onQuickAccept?(): void;
  onQuickReject?(): void;
  reopenRequest(): void;
};

export default function InboxDropdown({
  status,
  onViewClick,
  onQuickReject,
  onQuickAccept,
  reopenRequest,
}: Props) {
  const [visible, { toggle, off }] = useToggle(false);

  useKeyboard('Escape', () => {
    off();
  });

  function handleQuickAccept() {
    if (onQuickAccept) {
      onQuickAccept();
      off();
    }
  }

  function handleQuickReject() {
    if (onQuickReject) {
      onQuickReject();
      off();
    }
  }

  return (
    <OutsideClickHandler onOutsideClick={off}>
      <div className="relative flex justify-end items-center">
        {/* TRIGGER */}
        <button
          type="button"
          className="w-8 h-8 bg-white dark:bg-dark-600 inline-flex items-center justify-center text-gray-400 dark:text-dark-200 rounded-full hover:text-gray-500 dark:hover:text-dark-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
              className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-around-lg z-10 bg-white dark:bg-dark-500 ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 dark:divide-dark-400 focus:outline-none"
            >
              <div className="py-1" role="none">
                <span
                  className="cursor-pointer group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-dark-700 dark:hover:text-dark-200"
                  role="menuitem"
                  onClick={onViewClick}
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View
                </span>
              </div>
              <div className="py-1" role="none">
                {(status === RequestStatus.REJECTED ||
                  status === RequestStatus.FAILED) && (
                  <button
                    className="hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-dark-700 dark:hover:text-dark-200 cursor-pointer w-full group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-200 focus:outline-none"
                    role="menuitem"
                    onClick={reopenRequest}
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
                        d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                      />
                    </svg>
                    Reopen
                  </button>
                )}

                {status === RequestStatus.PENDING && (
                  <React.Fragment>
                    <button
                      className={clsx(
                        onQuickAccept
                          ? 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-dark-700 dark:hover:text-dark-200 cursor-pointer'
                          : 'cursor-not-allowed',
                        'w-full group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-200 focus:outline-none'
                      )}
                      role="menuitem"
                      disabled={!onQuickAccept}
                      onClick={handleQuickAccept}
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      Approve
                    </button>
                    <button
                      className={clsx(
                        onQuickReject
                          ? 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-dark-700 dark:hover:text-dark-200 cursor-pointer'
                          : 'cursor-not-allowed',
                        'w-full group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-200 focus:outline-none'
                      )}
                      role="menuitem"
                      disabled={!onQuickReject}
                      onClick={handleQuickReject}
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
                      Reject
                    </button>
                  </React.Fragment>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OutsideClickHandler>
  );
}
