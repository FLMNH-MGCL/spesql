import React from 'react';
import Button, { ButtonGroup } from '../ui/Button';
import Modal from '../ui/Modal';
import useKeyboard from '../utils/useKeyboard';
import CreateLogModal from './CreateLogModal';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateUpdateModal({ open, onClose }: Props) {
  useKeyboard('Escape', () => {
    onClose();
  });

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose}>
        <Modal.Content title="Update Query">todo</Modal.Content>

        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </ButtonGroup>

          <CreateLogModal initialTab={3} />
        </Modal.Footer>
      </Modal>

      {/* <Dropdown.Item text="Select" onClick={on} /> */}
    </React.Fragment>
  );
}
