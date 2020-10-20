import React from 'react';

export default function Visualization() {
  return (
    <React.Fragment>
      <div className="flex justify-center items-center space-x-4 mx-4 h-minus-header">
        {/* left half */}
        <div className="bg-white rounded-md shadow-around-lg w-3/4 h-main"></div>

        {/* right half */}
        <div className="bg-white rounded-md shadow-around-lg w-1/4 h-main"></div>
      </div>
    </React.Fragment>
  );
}
