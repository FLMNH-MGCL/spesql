import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import OutsideClickHandler from 'react-outside-click-handler';
import shallow from 'zustand/shallow';
import { useChartStore } from '../../stores/chart';
import useToggle from './utils/useToggle';

type Props = {
  defaultColor: string;
  index: number;
  onChange(index: number, newColor: string): void;
};

function ColorPicker({ defaultColor, index, onChange }: Props) {
  const [open, { toggle, off }] = useToggle(false);
  const [color, setColor] = useState(defaultColor);

  function handleChangeColor(result: ColorResult) {
    setColor(result.hex);

    onChange(index, result.hex);
  }

  return (
    <div className="mt-2 w-full flex flex-col items-center cursor-pointer relative">
      <span
        className="p-1 w-full flex rounded-md bg-gray-100 dark:bg-dark-400"
        onClick={toggle}
      >
        <span
          className="h-4 w-full rounded-md"
          style={{ backgroundColor: color }}
        ></span>
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            className="w-full relative z-20"
          >
            <OutsideClickHandler onOutsideClick={off}>
              <div className="absolute py-2">
                <SketchPicker color={color} onChange={handleChangeColor} />
              </div>
            </OutsideClickHandler>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type SProps = {
  defaultColor: string;
  onChange(newColor: string): void;
  width?: string;
};

export function SingleColorPicker({
  defaultColor,
  onChange,
  width = '1/6',
}: SProps) {
  const [open, { toggle, off }] = useToggle(false);
  const [color, setColor] = useState(defaultColor);

  function handleChangeColor(result: ColorResult) {
    setColor(result.hex);

    onChange(result.hex);
  }

  return (
    <div
      className={clsx(
        `w-${width}`,
        'flex flex-col items-center cursor-pointer relative'
      )}
    >
      <span
        className="p-1 w-full flex rounded-md bg-gray-100 dark:bg-dark-400"
        onClick={toggle}
      >
        <span
          className="h-4 w-full rounded-md"
          style={{ backgroundColor: color }}
        ></span>
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            className="w-full relative z-20"
          >
            <OutsideClickHandler onOutsideClick={off}>
              <div className="absolute py-2">
                <SketchPicker color={color} onChange={handleChangeColor} />
              </div>
            </OutsideClickHandler>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type PProps = {
  updateColors: React.Dispatch<React.SetStateAction<string[] | undefined>>;
};

export default function ChartColorPicker({ updateColors }: PProps) {
  const colors = useChartStore((state) => state.config.options.colors, shallow);

  function handleChange(index: number, newColor: string) {
    if (!colors) return;

    let newColors = colors;

    newColors[index] = newColor;

    updateColors(newColors);
  }

  if (!colors) return <div></div>;

  return (
    <div className="grid grid-cols-5 gap-3">
      {colors.map((color, index) => (
        <ColorPicker
          key={index}
          index={index}
          defaultColor={color}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
