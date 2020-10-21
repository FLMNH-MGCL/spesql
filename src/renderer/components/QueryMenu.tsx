import React, { useState } from 'react';
import CreateCountModal from './modals/CreateCountModal';
import CreateSelectModal from './modals/CreateSelectModal';
import CreateUpdateModal from './modals/CreateUpdateModal';
import Dropdown from './ui/Dropdown';

export default function QueryMenu() {
  const [currentModal, setCurrentModal] = useState<string>();

  return (
    <React.Fragment>
      <Dropdown
        label="Query"
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
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
        }
      >
        <Dropdown.Header text="Query Menu" />

        <Dropdown.Item
          text="Select"
          onClick={() => setCurrentModal('select')}
        />
        <Dropdown.Item text="Count" onClick={() => setCurrentModal('count')} />
        <Dropdown.Item
          text="Update"
          onClick={() => setCurrentModal('update')}
        />
      </Dropdown>
      <CreateSelectModal
        open={currentModal === 'select'}
        onClose={() => setCurrentModal(undefined)}
      />
      <CreateCountModal
        open={currentModal === 'count'}
        onClose={() => setCurrentModal(undefined)}
      />
      <CreateUpdateModal
        open={currentModal === 'update'}
        onClose={() => setCurrentModal(undefined)}
      />
    </React.Fragment>
  );
}
