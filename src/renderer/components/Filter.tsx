import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../stores';
import { Input } from '@flmnh-mgcl/ui';

export function FilterSearch({ disabled }: { disabled?: boolean }) {
  const { filter, setFilter, data } = useStore(
    (state) => ({
      filter: state.queryData.filter,
      setFilter: state.queryData.setFilter,
      data: state.queryData.data,
    }),
    shallow
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  // On data change, if there is no data but the filter text is there then remove it
  useEffect(() => {
    if (!data || (!data.length && filter)) {
      setFilter('');
    }
  }, [data]);

  return (
    <Input
      icon="search"
      value={filter}
      onChange={handleChange}
      disabled={disabled}
      placeholder="Filter"
    />
  );
}
