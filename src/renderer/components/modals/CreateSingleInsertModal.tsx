import React, { useState } from 'react';
import SingleInsertForm from '../forms/SingleInsertForm';
import Button from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import Steps from '../ui/Steps';
import useKeyboard from '../utils/useKeyboard';
import CreateHelpModal from './CreateHelpModal';
import CreateLogModal from './CreateLogModal';

type Props = {
  open: boolean;
  onClose(): void;
};

// TODO: will need this to be paginated, multistep form
export default function CreateSingleInsertModal({ open, onClose }: Props) {
  const [page, changePage] = useState(0);

  useKeyboard('Escape', () => {
    onClose();
  });

  function handleSubmit(values: Values) {}

  function handlePagination(direction: 'back' | 'forward') {}

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="large">
        <Modal.Content title="Insert Query">
          <div className="py-3">
            <Steps steps={7} current={page} />
          </div>

          <SingleInsertForm
            page={page}
            changePage={handlePagination}
            onSubmit={handleSubmit}
          />
        </Modal.Content>

        <Modal.Footer>
          {page === 7 && (
            <Button.Group>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="primary">Confirm</Button>
            </Button.Group>
          )}

          {page !== 7 && (
            <Button.Group>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                disabled={page === 0}
                onClick={() => handlePagination('back')}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => handlePagination('forward')}
              >
                Continue
              </Button>
            </Button.Group>
          )}

          <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={2} />
            <CreateHelpModal variant="single-insert" />
          </div>
        </Modal.Footer>
      </Modal>

      {/* <Dropdown.Item text="Select" onClick={on} /> */}
    </React.Fragment>
  );
}
