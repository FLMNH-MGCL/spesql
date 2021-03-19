import React from 'react';
import Block from './Block';
import TextBar from './TextBar';

export default function SigninPlaceholder() {
  return (
    <div className="h-screen flex items-center">
      <div className="mx-auto w-full max-w-md ">
        <div className="bg-white dark:bg-dark-700 py-8 px-4 shadow sm:rounded-lg sm:px-10 min-h-92 flex flex-col space-y-8 mt-12">
          <div className="flex justify-center py-4">
            <Block size="lg" />
          </div>
          <TextBar fullWidth height={8} />
          <TextBar fullWidth height={8} />

          <div className="pt-8">
            <TextBar fullWidth height={12} />
          </div>

          <div className="flex flex-row space-x-3 justify-center">
            <Block size="sm" circle />
            <Block size="sm" circle />
          </div>
        </div>
      </div>
    </div>
  );
}
