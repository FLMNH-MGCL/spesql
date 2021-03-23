import React, { useEffect } from 'react';
import Chart from '../components/Chart';
import ChartSidebar from '../components/ChartSidebar';
import { useNotify } from '../components/utils/context';
import useToggle from '../components/utils/useToggle';

export default function Visualization() {
  const { notify } = useNotify();

  const [fullScreen, { toggle }] = useToggle(false);

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
      <div className="flex justify-center items-center space-x-4 p-4 h-minus-header">
        {/* left half */}
        <Chart fullScreen={fullScreen} toggle={toggle} />

        {/* right half */}
        <ChartSidebar fullScreen={fullScreen} />
      </div>
    </React.Fragment>
  );
}
