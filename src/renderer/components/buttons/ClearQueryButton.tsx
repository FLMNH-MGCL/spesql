import { Button } from '@flmnh-mgcl/ui';
import React from 'react';
import { useStore } from '../../../stores';

type Props = {
  disabled?: boolean;
};

export default function ({ disabled }: Props) {
  const setData = useStore((state) => state.queryData.setData);
  const setCurrentQuery = useStore((state) => state.queryData.setCurrentQuery);

  // TODO: should clear entire config
  function onClear() {
    setData([]);
    setCurrentQuery('');
  }

  return (
    <div>
      <Button variant="danger" disabled={disabled} onClick={onClear}>
        Clear Query
      </Button>
    </div>
  );
}
