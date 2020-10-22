import clsx from 'clsx';
import React from 'react';

//TODO: implement me
type Props = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  className?: string;
  children: React.ReactNode;
};

export default function Heading({ children, className }: Props) {
  return <h3 className={clsx(className)}>{children}</h3>;
}
