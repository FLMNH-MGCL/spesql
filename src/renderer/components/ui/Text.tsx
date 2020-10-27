import clsx from 'clsx';
import React from 'react';
import { TEXT } from './constants';

type Props = {
  variant?: keyof typeof TEXT;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactText;
  className?: string;
};

export default function Text({
  children,
  variant = 'subtext',
  size = 'sm',
  className,
}: Props) {
  const textStyle = TEXT[variant] || TEXT.subtext;

  return (
    <p className={clsx(`text-${size}`, textStyle, className)}>{children}</p>
  );
}
