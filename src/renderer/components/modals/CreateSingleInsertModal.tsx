import React from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import useKeyboard from '../utils/useKeyboard';

type Props = {
  open: boolean;
  onClose(): void;
};

// TODO: will need this to be paginated, multistep form
export default function CreateSingleInsertModal({ open, onClose }: Props) {
  useKeyboard('Escape', () => {
    onClose();
  });

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="massive">
        <Modal.Content title="Insert Query">todo</Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      {/* <Dropdown.Item text="Select" onClick={on} /> */}
    </React.Fragment>
  );
}
