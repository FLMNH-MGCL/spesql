import React from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../stores';
import Input from './ui/Input';

// export function FilterToggle({ disabled }: { disabled?: boolean }) {
//   return (
//     <Button variant="outline" rounded disabled={disabled}>
//       <svg
//         className="w-5 h-5"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//         />
//       </svg>
//     </Button>
//   );
// }

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
      placeholder="Search"
    />
  );
}
