import React from 'react';
import Button from '../ui/Button';

type Props = {
  icon: React.ReactNode;
  onClick?(): void;
};

export default function CircleButton({ icon, onClick }: Props) {
  return (
    <Button variant="clear" rounded onClick={onClick}>
      {icon}
    </Button>
  );
}
