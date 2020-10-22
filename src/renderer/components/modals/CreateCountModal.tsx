import React from 'react';
import CountQueryForm from '../forms/CountQueryForm';
import Button, { ButtonGroup } from '../ui/Button';
import Divider from '../ui/Divider';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import Statistic from '../ui/Statistic';
import useKeyboard from '../utils/useKeyboard';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateCountModal({ open, onClose }: Props) {
  useKeyboard('Escape', () => {
    onClose();
  });

  async function runQuery(values: Values) {
    console.log(values);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="Count Query">
          <CountQueryForm onSubmit={runQuery} />

          <Divider text="Results" />
          <div className="bg-gray-50 rounded-lg w-full p-3 mt-3">
            <Statistic value={23} unit="specimen" />
          </div>
        </Modal.Content>

        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" form="count-form">
              Confirm
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
