import React, { useEffect } from 'react';
import Chart from '../components/Chart';
import ChartSidebar from '../components/ChartSidebar';
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
        level: 'info',
      });
    };
  }, []);

  return (
    <React.Fragment>
      <div className="flex justify-center items-center space-x-4 mx-4 h-minus-header">
        {/* left half */}
        <Chart />

        {/* right half */}
        <ChartSidebar />
      </div>
    </React.Fragment>
  );
}
