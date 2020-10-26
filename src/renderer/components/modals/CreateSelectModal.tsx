import React from 'react';
import SelectQueryForm from '../forms/SelectQueryForm';
import Button, { ButtonGroup } from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import useKeyboard from '../utils/useKeyboard';
import axios from 'axios';
import { BACKEND_URL } from '../../types';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateSelectModal({ open, onClose }: Props) {
  useKeyboard('Escape', () => {
    onClose();
  });

  async function runQuery(values: Values) {
    // console.log(values);
    const selectResponse = await axios
      .post(BACKEND_URL + '/api/select', {
        query: 'SELECT * FROM molecularLab;',
      })
      .catch((error) => error.response);

    // console.log(selectResponse);

    console.log(selectResponse.data.slice(0, 10));
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
