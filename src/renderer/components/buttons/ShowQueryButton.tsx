import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useStore } from '../../../stores';
import Badge from '../ui/Badge';
import useToggle from '../utils/useToggle';

type Props = {
  disabled?: boolean;
};

export default function ShowQueryButton({ disabled }: Props) {
  const [visible, { toggle }] = useToggle(false);

  const queryString = useStore((state) => state.queryData.queryString);

  if (disabled) {
    return null;
  }

  return (
    <div className="flex items-center">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <code className="text-xs mx-3 ">{queryString}</code>
          </motion.div>
        )}
      </AnimatePresence>
      <Badge onClick={toggle}>{visible ? 'Hide' : 'Show Query'}</Badge>
    </div>
  );
}
