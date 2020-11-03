import clsx from 'clsx';
import React from 'react';
import Button from './ui/Button';

export function FilterToggle({ disabled }: { disabled?: boolean }) {
  return (
    <Button variant="clear" rounded disabled={disabled}>
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
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
    </Button>
  );
}

export function FilterSearch({ disabled }: { disabled?: boolean }) {
  return (
    <React.Fragment>
      <label className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          id="search"
          className={clsx(
            disabled ? 'bg-gray-100' : 'bg-white',
            'block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5  text-gray-300  focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out'
          )}
          placeholder="Search"
          type="search"
          disabled={disabled}
        />
      </div>
    </React.Fragment>
  );
}
