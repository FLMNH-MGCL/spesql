import clsx from 'clsx';
import React from 'react';
import ChartConfigForm from './forms/ChartConfigForm';

type Props = {
  fullScreen: boolean;
};

export default function ChartSidebar({ fullScreen }: Props) {
  return (
    <div
      className={clsx(
        'shadow-around-lg bg-white dark:bg-dark-800 rounded-md shadow-around-lg w-1/4 h-main',
        fullScreen && 'hidden'
      )}
    >
      <ChartConfigForm />
    </div>
  );
}
