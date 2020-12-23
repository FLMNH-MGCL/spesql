import clsx from 'clsx';
import React from 'react';

export const BLOCK_SIZES = {
  xs: 'h-4 w-4',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
  '2xl': 'h-48 w-48',
};

type Props = {
  size?: keyof typeof BLOCK_SIZES;
  circle?: boolean;
};

export default function Block({ size = 'md', circle }: Props) {
  const blockSize = BLOCK_SIZES[size] ?? BLOCK_SIZES.md;
  return (
    <div className="animate-pulse flex space-x-4">
      <div
        className={clsx(
          blockSize,
          circle ? 'rounded-full' : 'rounded',
          'bg-gray-400'
        )}
      ></div>
    </div>
  );
}
