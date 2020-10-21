import React from 'react';
import Button, { ButtonGroup } from '../ui/Button';
import Modal from '../ui/Modal';
import useKeyboard from '../utils/useKeyboard';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateSelectModal({ open, onClose }: Props) {
  useKeyboard('Escape', () => {
    onClose();
  });

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose}>
        <Modal.Content title="Select Query">todo</Modal.Content>

        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>

      {/* <Dropdown.Item text="Select" onClick={on} /> */}
    </React.Fragment>
  );
}
