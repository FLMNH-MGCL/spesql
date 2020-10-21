import React, { useState } from 'react';
import CreateBulkInsertModal from './modals/CreateBulkInsertModal';
import CreateSingleInsertModal from './modals/CreateSingleInsertModal';
import Dropdown from './ui/Dropdown';

export default function InsertMenu() {
  const [currentModal, setCurrentModal] = useState<string>();
  return (
    <React.Fragment>
      <Dropdown
        label="Insert"
        labelIcon={
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        }
      >
        <Dropdown.Header text="Insert Menu" />
        <Dropdown.Item
          text="Bulk Insert"
          onClick={() => setCurrentModal('bulk')}
        />
        <Dropdown.Item
          text="Single Insert"
          onClick={() => setCurrentModal('single')}
        />
      </Dropdown>

      <CreateBulkInsertModal
        open={currentModal === 'bulk'}
        onClose={() => setCurrentModal(undefined)}
      />
      <CreateSingleInsertModal
        open={currentModal === 'single'}
        onClose={() => setCurrentModal(undefined)}
      />
    </React.Fragment>
  );
}
