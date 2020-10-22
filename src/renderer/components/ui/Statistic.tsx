import React from 'react';

type Props = {
  value: number;
  percent?: boolean;
  unit: string;
};

export default function Statistic({ value, percent = false, unit }: Props) {
  return (
    <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
      <p
        className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"
        id="item-1"
      >
        {unit}
      </p>
      <p
        className="order-1 text-5xl leading-none font-extrabold text-indigo-600"
        aria-describedby="item-1"
      >
        {value}
        {percent && '%'}
      </p>
    </div>
  );
}
