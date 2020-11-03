import React from 'react';
import { useStore } from '../../../stores';
import Button from '../ui/Button';

type Props = {
  disabled?: boolean;
};

export default function ({ disabled }: Props) {
  const setData = useStore((state) => state.queryData.setData);

  function onClear() {
    setData([]);
  }

  return (
    <div>
      <Button variant="danger" disabled={disabled} onClick={onClear}>
        Clear Query
      </Button>
    </div>
  );
}
