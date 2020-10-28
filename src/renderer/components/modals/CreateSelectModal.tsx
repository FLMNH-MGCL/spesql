import React from 'react';
import SelectQueryForm from '../forms/SelectQueryForm';
import Button, { ButtonGroup } from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import useKeyboard from '../utils/useKeyboard';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import { useNotify } from '../utils/context';
import { useStore } from '../../../stores';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateSelectModal({ open, onClose }: Props) {
  const { notify } = useNotify();

  const { setData, setCurrentQuery } = useStore((state) => ({
    setData: state.queryData.setData,
    setCurrentQuery: state.queryData.setCurrentQuery,
  }));

  useKeyboard('Escape', () => {
    onClose();
  });

  async function runQuery(values: Values) {
    console.log(values);

    // TODO: generate query
    const query = 'SELECT * FROM molecularLab;';

    const selectResponse = await axios
      .post(BACKEND_URL + '/api/select', {
        query,
      })
      .catch((error) => error.response);

    console.log(selectResponse);

    if (selectResponse.status === 200 && selectResponse.data) {
      setData(selectResponse.data.slice(0, 10));
      setCurrentQuery(query);
    } else {
      // TODO: interpret status
      const error = selectResponse.data;
      notify({ title: 'TODO', message: error, level: 'error' });
    }
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
