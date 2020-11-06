import React from 'react';
import clsx from 'clsx';
import { BUTTONS } from './constants';
import Spinner from './Spinner';

export function ButtonGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col-reverse sm:flex-row space-y-reverse justify-end">
      {children}
    </div>
  );
}

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof BUTTONS;
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
};

// TODO: implement the loading distinction in this button element
export default function Button({
  className,
  variant = 'default',
  fullWidth,
  rounded,
  loading,
  ...props
}: Props) {
  const buttonStyle = BUTTONS[variant] || BUTTONS.default;

  if (loading) {
    return (
      <button
        type={props.type || 'button'}
        className={clsx(
          rounded ? 'p-2 rounded-full' : 'px-4 py-2 rounded-md',
          'shadow-sm relative inline-flex items-center border text-sm leading-5 font-medium transition ease-in-out duration-150 focus:outline-none',
          buttonStyle.base,
          props.disabled && 'cursor-default',
          props.disabled ? buttonStyle.disabled : buttonStyle.active,
          fullWidth && 'w-full text-center justify-center',
          className
        )}
        {...props}
      >
        <span className="flex items-center justify-center">
          <Spinner size="sm" color="white" inline active={loading} />
        </span>
      </button>
    );
  } else {
    return (
      <button
        type={props.type || 'button'}
        className={clsx(
          rounded ? 'p-2 rounded-full' : 'px-4 py-2 rounded-md',
          'shadow-sm relative inline-flex items-center border text-sm leading-5 font-medium transition ease-in-out duration-150 focus:outline-none',
          buttonStyle.base,
          props.disabled && 'cursor-default',
          props.disabled ? buttonStyle.disabled : buttonStyle.active,
          fullWidth && 'w-full text-center justify-center',
          className
        )}
        {...props}
      />
    );
  }
}
