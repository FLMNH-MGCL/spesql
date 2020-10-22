import React from 'react';
import SelectQueryForm from '../forms/SelectQueryForm';
import Button, { ButtonGroup } from '../ui/Button';
import { Values } from '../ui/Form';
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

  function runQuery(values: Values) {
    console.log(values);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="Select Query">
          <SelectQueryForm onSubmit={runQuery} />
        </Modal.Content>

        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" form="select-form">
              Confirm
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
