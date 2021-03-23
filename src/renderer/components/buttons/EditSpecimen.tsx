import { Button } from '@flmnh-mgcl/ui';
import React from 'react';
import { PropsOf } from '../../types';
import CircleButton from './CircleButton';

type Props = {
  disabled?: boolean;
  loading?: boolean;
} & PropsOf<'button'>;

export function ConfirmEditButton({
  disabled,
  type,
  loading,
  ...props
}: Props) {
  return (
    <CircleButton
      title="Submit"
      type={type}
      loading={loading}
      disabled={loading}
      icon={
        <svg
          className="w-5 h-5 dark:text-dark-200"
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
      {...props}
    />
  );
}

type CancelProps = {
  onClick(): void;
  loading?: boolean;
};
export function CancelEditButton({ onClick, loading }: CancelProps) {
  return (
    <CircleButton
      title="Cancel"
      onClick={onClick}
      loading={loading}
      disabled={loading}
      icon={
        <svg
          className="w-5 h-5 dark:text-dark-200"
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
        className="w-5 h-5 dark:text-dark-200"
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
