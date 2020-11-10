import React from 'react';
import { PropsOf } from '../../types';
import Button from '../ui/Button';

type Props = {
  icon: React.ReactNode;
  // onClick?(): void;
} & PropsOf<'button'>;

export default function CircleButton({ icon, onClick, ...props }: Props) {
  return (
    <Button variant="outline" rounded onClick={onClick} {...props}>
      {icon}
    </Button>
  );
}
