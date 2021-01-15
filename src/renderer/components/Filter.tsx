import React from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../stores';
import { Input } from '@flmnh-mgcl/ui';

export function FilterSearch({ disabled }: { disabled?: boolean }) {
  const { filter, setFilter } = useStore(
    (state) => ({
      filter: state.queryData.filter,
      setFilter: state.queryData.setFilter,
    }),
    shallow
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

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
