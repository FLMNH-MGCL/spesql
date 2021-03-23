import { Button } from '@flmnh-mgcl/ui';
import React from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import { canUD } from '../../functions/util';

export default function CreateRecordButton() {
  const { user, isInsertingRecord, setIsInsertingRecord } = useStore(
    (state) => ({
      user: state.user,
      isInsertingRecord: state.isInsertingRecord,
      setIsInsertingRecord: state.setIsInsertingRecord,
    }),
    shallow
  );

  const disabled = isInsertingRecord || !canUD(user);

  function onClick() {
    setIsInsertingRecord(true);
  }

  return (
    <Button
      title="Insert New Record"
      variant="outline"
      rounded
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        className="w-5 h-5 dark:text-dark-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </Button>
  );
}
