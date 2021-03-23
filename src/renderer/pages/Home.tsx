import React from 'react';
import VirtualizedTable from '../components/VirtualizedTable';
import SpecimenView from '../components/SpecimenView';

export default function () {
  return (
    <div>
      <div className="flex justify-center items-center space-x-4 p-4 h-minus-header">
        {/* left half */}
        <div className="bg-white dark:bg-dark-800 rounded-md shadow-around-lg flex-1 h-full overflow-hidden">
          <VirtualizedTable />
        </div>

        {/* right half */}
        <SpecimenView />
      </div>
    </div>
  );
}
