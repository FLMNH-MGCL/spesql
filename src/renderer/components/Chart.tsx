import React from 'react';
import { Chart as GChart } from 'react-google-charts';
import { useStore } from '../../stores';
import { Spinner } from '@flmnh-mgcl/ui';

// function ChartError(props: any) {
//   console.log(props);

//   return <div>fff</div>;
// }

export default function Chart() {
  // const allData = useStore((state) => state.queryData.data);

  const { chartType, options } = useStore((state) => state.chartConfig);

  return (
    <div className="relative bg-white rounded-md shadow-around-lg w-3/4 h-main">
      <div className="p-2 h-full w-full">
        <GChart
          height="100%"
          width="100%"
          chartType={chartType}
          loader={<Spinner active={true} />}
          options={options}
          data={
            [
              // ['From', 'To', 'Weight'],
              // ['Brazil', 'Portugal', 5],
              // ['Brazil', 'France', 1],
              // ['Brazil', 'Spain', 1],
              // ['Brazil', 'England', 1],
              // ['Canada', 'Portugal', 1],
              // ['Canada', 'France', 5],
              // ['Canada', 'England', 1],
              // ['Mexico', 'Portugal', 1],
              // ['Mexico', 'France', 1],
              // ['Mexico', 'Spain', 5],
              // ['Mexico', 'England', 1],
              // ['USA', 'Portugal', 1],
              // ['USA', 'France', 1],
              // ['USA', 'Spain', 1],
              // ['USA', 'England', 5],
              // ['Portugal', 'Angola', 2],
              // ['Portugal', 'Senegal', 1],
              // ['Portugal', 'Morocco', 1],
              // ['Portugal', 'South Africa', 3],
              // ['France', 'Angola', 1],
              // ['France', 'Senegal', 3],
              // ['France', 'Mali', 3],
              // ['France', 'Morocco', 3],
              // ['France', 'South Africa', 1],
              // ['Spain', 'Senegal', 1],
              // ['Spain', 'Morocco', 3],
              // ['Spain', 'South Africa', 1],
              // ['England', 'Angola', 1],
              // ['England', 'Senegal', 1],
              // ['England', 'Morocco', 2],
              // ['England', 'South Africa', 7],
              // ['South Africa', 'China', 5],
              // ['South Africa', 'India', 1],
              // ['South Africa', 'Japan', 3],
              // ['Angola', 'China', 5],
              // ['Angola', 'India', 1],
              // ['Angola', 'Japan', 3],
              // ['Senegal', 'China', 5],
              // ['Senegal', 'India', 1],
              // ['Senegal', 'Japan', 3],
              // ['Mali', 'China', 5],
              // ['Mali', 'India', 1],
              // ['Mali', 'Japan', 3],
              // ['Morocco', 'China', 5],
              // ['Morocco', 'India', 1],
              // ['Morocco', 'Japan', 3],
            ]
          } // this forces the error to display
          // errorElement={<ChartError />}
          // chartEvents={[
          //   {
          //     eventName: 'error',
          //     callback: (props: any) =>
          //       console.log(
          //         'CALLBACK',
          //         props,
          //         props.eventArgs[0].container?.innerText
          //       ),
          //   },
          // ]}
        />
      </div>
    </div>
  );
}
