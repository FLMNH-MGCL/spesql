import React from 'react';
import ChartConfigForm from './forms/ChartConfigForm';

export default function ChartSidebar() {
  return (
    <div className="bg-white rounded-md shadow-around-lg w-1/4 h-main">
      <ChartConfigForm />
    </div>
  );
}
