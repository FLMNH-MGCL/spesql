import { Spinner } from '@flmnh-mgcl/ui';
import React from 'react';
import Block from './Block';
import TextBar from './TextBar';

export default function HomeLayoutPlaceholder() {
  return (
    <div>
      <div className="flex justify-center items-center space-x-4 mx-4 h-minus-header">
        {/* left half */}
        <div className="bg-white dark:bg-dark-800 rounded-md shadow-around-lg w-3/4 h-main relative flex flex-col">
          <div className="bg-gray-50 dark:bg-dark-600 h-16 w-full flex flex-row items-center justify-between px-8">
            <TextBar width={40} />
            <TextBar width={32} />
            <TextBar width={36} />
            <TextBar width={24} />
            <TextBar width={32} />
            <TextBar width={24} />
          </div>

          <div className="flex-1">
            <Spinner active />
          </div>

          <div className="h-16 bg-gray-50 dark:bg-dark-600 flex flex-row justify-between px-8">
            <div className="flex flex-row space-x-4 items-center">
              <Block circle size="md" />
              <TextBar width={32} />
              <TextBar width={40} />
              <Block circle size="md" />
              <Block circle size="md" />
            </div>

            <div className="flex flex-row space-x-4 items-center">
              <Block circle size="md" />
              <Block circle size="md" />
            </div>
          </div>
        </div>

        {/* right half */}
        <div className="bg-white dark:bg-dark-800 rounded-md shadow-around-lg w-1/4 h-main flex flex-col">
          <div className="flex-1 p-4 flex flex-col space-y-8">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <TextBar width={48} />
                <TextBar width={32} height={2} />
              </div>
            ))}
          </div>

          <div className="h-16 bg-gray-50 dark:bg-dark-600 flex flex-row space-x-4 items-center px-8">
            <Block circle size="md" />
            <Block circle size="md" />
          </div>
        </div>
      </div>
    </div>
  );
}
