import React, { useEffect } from 'react';
import { useNotify } from '../components/utils/context';

export default function Visualization() {
  const { notify } = useNotify();

  useEffect(() => {
    notify({
      title: 'Warning',
      message:
        'This feature is very experimental and in its early development phase',
      level: 'warning',
    });

    return () => {
      notify({
        title: 'Feedback?',
        message:
          'Let me (Aaron!) know how I can improve the visualization features of the charts page!',
        level: 'warning',
      });
    };
  }, []);

  return (
    <React.Fragment>
      <div className="flex justify-center items-center space-x-4 mx-4 h-minus-header">
        {/* left half */}
        <div className="bg-white rounded-md shadow-around-lg w-3/4 h-main">
          charts would be rendered here
        </div>

        {/* right half */}
        <div className="bg-white rounded-md shadow-around-lg w-1/4 h-main">
          form goes here
        </div>
      </div>
    </React.Fragment>
  );
}
