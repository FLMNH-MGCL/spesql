import React, { useState } from 'react';
import { arrayFieldsToString, getSpecimenDefaults } from '../../functions/util';
import { Specimen } from '../../types';
import SingleInsertForm from '../forms/SingleInsertForm';
import Button from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import Steps from '../ui/Steps';
import useKeyboard from '../utils/useKeyboard';
import CreateHelpModal from './CreateHelpModal';
import CreateLogModal from './CreateLogModal';
import axios from 'axios';
import useQuery from '../utils/useQuery';

type Props = {
  open: boolean;
  onClose(): void;
};

// TODO: will need this to be paginated, multistep form
export default function CreateSingleInsertModal({ open, onClose }: Props) {
  const { insert } = useQuery();
  const [page, changePage] = useState(0);

  useKeyboard('Escape', () => {
    onClose();
  });

  async function handleSubmit(values: Values) {
    console.log(values);

    const { databaseTable } = values;

    delete values.databaseTable;

    const correctedArrays = arrayFieldsToString(values as Specimen);
    const correctedNulls = getSpecimenDefaults(correctedArrays);

    console.log(correctedNulls);

    // await insert(databaseTable, correctedNulls);
  }

  function handlePagination(direction: 'back' | 'forward') {
    // TODO: add checks?
    if (direction === 'forward') {
      changePage(page + 1);
    } else {
      changePage(page - 1);
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="large">
        <Modal.Content title="Insert Single Record">
          <div className="py-3">
            <Steps steps={8} current={page} />
          </div>

          <SingleInsertForm
            page={page}
            // changePage={handlePagination}
            onSubmit={handleSubmit}
          />
        </Modal.Content>

        <Modal.Footer>
          {page === 8 && (
            <Button.Group>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={() => handlePagination('back')}>Back</Button>
              <Button variant="primary" type="submit" form="single-insert">
                Confirm
              </Button>
            </Button.Group>
          )}

          {page !== 8 && (
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
            <CreateLogModal
              initialTab={2}
              variant="single"
              watch="singleInsert"
            />
            <CreateHelpModal variant="insert" />
          </div>
        </Modal.Footer>
      </Modal>

      {/* <Dropdown.Item text="Select" onClick={on} /> */}
    </React.Fragment>
  );
}
