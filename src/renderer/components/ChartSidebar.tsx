import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import ChartConfig from './ChartConfig';

type Props = {
  fullScreen: boolean;
};

export default function ChartSidebar({ fullScreen }: Props) {
  const controls = useAnimation();

  useEffect(() => {
    if (fullScreen) {
      controls.start({
        width: '0%',
        opacity: 0,
        transition: { duration: 0.25 },
      });
    } else {
      controls.start({
        width: '25%',
        opacity: 1,
        transition: { duration: 0.25 },
      });
    }
  });

  return (
    <AnimatePresence>
      <motion.div
        className="shadow-around-lg bg-white dark:bg-dark-800 rounded-md shadow-around-lg w-1/4 h-main"
        animate={controls}
      >
        <ChartConfig />
      </motion.div>
    </AnimatePresence>
  );
}
