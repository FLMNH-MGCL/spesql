import React, { useState } from 'react';
import CreateCountModal from './modals/CreateCountModal';
import CreateSelectModal from './modals/CreateSelectModal';
import CreateBulkUpdateModal from './modals/CreateBulkUpdateModal';
import Dropdown from './ui/Dropdown';

type Props = {
  disableCrud: boolean;
};

export default function QueryMenu({ disableCrud }: Props) {
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
          onClick={disableCrud ? undefined : () => setCurrentModal('update')}
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
      <CreateBulkUpdateModal
        open={disableCrud ? false : currentModal === 'update'}
        onClose={() => setCurrentModal(undefined)}
      />
    </React.Fragment>
  );
}
