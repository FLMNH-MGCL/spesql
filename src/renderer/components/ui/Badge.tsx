import clsx from 'clsx';
import React from 'react';
import { MutuallyExclusive } from '../../types';

type BadgePropsLabel = {
  label: string;
  truncate?: boolean;
};

type BadgePropsChildren = {
  children: React.ReactNode;
};

type BadgeProps = MutuallyExclusive<BadgePropsLabel, BadgePropsChildren> & {
  onClick?(): void;
};

export default function Badge({
  label,
  children,
  onClick,
  truncate,
}: BadgeProps) {
  return (
    <span
      className="flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800 hover:bg-gray-200 space-x-2 max-w-1/2"
      onClick={onClick}
    >
      {label ? (
        <p className={clsx(truncate && 'truncate')}>{label}</p>
      ) : (
        children
      )}
    </span>
  );
}
