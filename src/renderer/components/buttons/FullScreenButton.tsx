import React from 'react';
import CircleButton from './CircleButton';

type Props = {
  fullScreen: boolean;
  toggle: () => void;
};

export default function FullScreenButton({ fullScreen, toggle }: Props) {
  return (
    <CircleButton
      title={fullScreen ? 'Minimize' : 'Maximize'}
      icon={
        fullScreen ? (
          <svg
            className="w-5 h-5 dark:text-dark-200"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="4 14 10 14 10 20"></polyline>
            <polyline points="20 10 14 10 14 4"></polyline>
            <line x1="14" y1="10" x2="21" y2="3"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        ) : (
          <svg
            className="w-5 h-5 dark:text-dark-200"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        )
      }
      onClick={toggle}
    />
  );
}
