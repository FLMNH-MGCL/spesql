import React from 'react';

export default function Radio() {
  return (
    <div className="flex items-center">
      <input
        id="remember_me"
        type="checkbox"
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
      />
      <label className="ml-2 block text-sm leading-5 text-gray-900">text</label>
    </div>
  );
}
