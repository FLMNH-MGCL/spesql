import React from 'react';
import Button, { ButtonGroup } from '../ui/Button';
import Modal from '../ui/Modal';
import useToggle from '../utils/useToggle';

export default function CreateCountModal() {
  const [open, { on, off }] = useToggle(false);

  function onDownload() {
    off();
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="tiny">
        <Modal.Content title="Download Options">todo</Modal.Content>
        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={off}>Cancel</Button>
            <Button variant="primary" onClick={onDownload}>
              Confirm
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>

      <Button onClick={on}>
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
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
        Download
      </Button>
    </React.Fragment>
  );
}
