import React from 'react';
import { PropsOf } from '../../types';
import Button from '../ui/Button';
import CircleButton from './CircleButton';

type Props = {
  disabled?: boolean;
} & Pick<PropsOf<typeof Button>, 'onClick'>;

export function ConfirmEditButton({ onClick }: { onClick(): void }) {
  return (
    <CircleButton
      onClick={onClick}
      icon={
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      }
    />
  );
}

export function CancelEditButton({ onClick }: { onClick(): void }) {
  return (
    <CircleButton
      onClick={onClick}
      icon={
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      }
    />
  );
}

export default function EditSpecimen({ disabled, onClick }: Props) {
  return (
    <Button variant="outline" rounded disabled={disabled} onClick={onClick}>
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </Button>
  );
}
