import { Button } from '@flmnh-mgcl/ui';
import clsx from 'clsx';
import React from 'react';
import { useStore } from '../../../stores';

type Props = {
  disabled?: boolean;
};

export default function ({ disabled }: Props) {
  const setData = useStore((state) => state.queryData.setData);
  const setCurrentQuery = useStore((state) => state.queryData.setCurrentQuery);

  // TODO: should clear entire config
  function onClear() {
    setData([]);
    setCurrentQuery('');
  }

  return (
    <Button
      variant="outline"
      rounded
      disabled={disabled}
      onClick={onClear}
      title="Clear Query"
    >
      <svg
        className={clsx(
          'w-5 h-5',
          disabled ? 'dark:text-dark-200' : 'text-red-500'
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </Button>
  );
}
