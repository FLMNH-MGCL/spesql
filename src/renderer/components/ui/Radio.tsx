import React, { forwardRef } from 'react';

type Props = {
  checked: boolean;
  label?: string;
} & React.ComponentProps<'input'>;

export default forwardRef<HTMLInputElement, Props>(
  ({ label, checked, className, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          checked={checked}
          type="checkbox"
          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          {...props}
        />
        <label className="ml-2 block text-sm leading-5 text-gray-900">
          {label}
        </label>
      </div>
    );
  }
);
