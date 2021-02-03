import React, { useEffect, useState } from 'react';
import { Chart as GChart } from 'react-google-charts';
import { Button, Heading, Spinner, TABLE_CLASSES } from '@flmnh-mgcl/ui';
import FullScreenButton from './buttons/FullScreenButton';
import clsx from 'clsx';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useChartStore } from '../../stores/chart';
import shallow from 'zustand/shallow';
import statsImage from '../assets/svg/stats.svg';

// function ChartError(props: any) {
//   console.log(props);

//   return <div>fff</div>;
// }

function EmptyTableArt() {
  return (
    <div className="absolute bottom-0 inset-0 flex flex-col items-center justify-center pointer-events-none">
      <img className="object-scale-down h-64 my-6 w-auto" src={statsImage} />
      <Heading tag="h3" className="mt-3 text-center ">
        Configure a chart to get started
      </Heading>
    </div>
  );
}

type Props = {
  fullScreen: boolean;
  toggle: () => void;
};

export default function Chart({ fullScreen, toggle }: Props) {
  const data = useChartStore((state) => state.data, shallow);

  const [key, setKey] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    if (fullScreen) {
      controls.start({
        width: '100%',
        transition: { duration: 0.25 },
      });
    } else {
      controls.start({
        width: '75%',
        transition: { duration: 0.25 },
      });
    }

    // toggling the key here to force Google Chart to redraw itself with the new
    // sizing parameters. I added the 201 delay, since the animations have a 200
    // duration time.
    setTimeout(() => setKey((previousKey) => !previousKey), 251);
  }, [fullScreen]);

  // controls.start("hidden")

  console.log(data);

  const { chartType, options } = useChartStore((state) => state.config);
  const setData = useChartStore((state) => state.setData);

  function onClear() {
    setData([]);
  }

  return (
    <AnimatePresence>
      <motion.div
        className={clsx(
          'flex flex-col relative shadow-around-lg bg-white dark:bg-dark-800 rounded-md shadow-around-lg  h-main'
        )}
        animate={controls}
        initial={{ width: fullScreen ? '100%' : '75%' }}
      >
        <div className="flex-1 p-2  w-full">
          {data && !!data.length && (
            <GChart
              key={Number(key)}
              height="100%"
              width="100%"
              chartType={chartType}
              loader={<Spinner active={true} />}
              options={options}
              data={data}
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
          )}

          {!data || (!data.length && <EmptyTableArt />)}
        </div>
        <nav className={TABLE_CLASSES.footer}>
          <div>
            <Button
              variant="danger"
              disabled={!data || !data.length}
              onClick={onClear}
            >
              Clear Chart
            </Button>
          </div>
          <div>
            <FullScreenButton fullScreen={fullScreen} toggle={toggle} />
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}
