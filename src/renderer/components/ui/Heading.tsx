import React from 'react';

//TODO: implement me
type Props = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  children: React.ReactNode;
};

export default function Heading({ children }: Props) {
  return <h3>{children}</h3>;
}
