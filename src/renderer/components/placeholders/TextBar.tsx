import clsx from 'clsx';
import React from 'react';

type Props = { fullWidth?: boolean; width?: number; height?: number };

export default function TextBar({ width = 24, height = 4, fullWidth }: Props) {
  return (
    <div className="animate-pulse flex space-x-4">
      <div
        className={clsx(
          fullWidth ? 'w-full flex-1' : `w-${width}`,
          `h-${height}`,
          'rounded bg-gray-400'
        )}
      ></div>
    </div>
  );
}
