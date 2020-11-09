import React from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import Button from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import { useNotify } from '../utils/context';
import useKeyboard from '../utils/useKeyboard';
import CreateLogModal from './CreateLogModal';
import numberParser from 'number-to-words';
import { buildSelectQuery } from '../../functions/builder';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import UpdateBulkQueryForm from '../forms/UpdateBulkQueryForm';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateBulkUpdateModal({ open, onClose }: Props) {
  const { notify } = useNotify();

  const { setData, setCurrentQuery } = useStore((state) => ({
    setData: state.queryData.setData,
    setCurrentQuery: state.queryData.setCurrentQuery,
  }));

  const toggleLoading = useStore((state) => state.toggleLoading);

  const loading = useStore((state) => state.loading, shallow);

  useKeyboard('Escape', () => {
    onClose();
  });

  // TODO: implement me
  async function runQuery(values: Values) {
    toggleLoading(true);
    console.log(values);

    const { advancedQuery, conditionalCount, databaseTable, fields } = values;

    let query: string = '';
    let columns = null;
    let conditions = null;

    if (advancedQuery) {
      query = advancedQuery;
    } else {
      // construct query
      const numConditions = parseInt(conditionalCount, 10);

      if (numConditions < 1) {
        notify({
          title: 'Invalid Conditions',
          message: 'You must specify at least one condition',
          level: 'error',
        });

        toggleLoading(false);
        return;
      }

      let conditionals = [];
      columns = fields;

      for (let i = 0; i < numConditions; i++) {
        const current = numberParser.toWords(i);

        conditionals.push({
          field: values[`conditionalField_${current}`],
          operator: values[`conditionalOperator_${current}`],
          value: values[`conditionalValue_${current}`],
        });
      }

      const { queryString, queryArray } = buildSelectQuery(
        databaseTable,
        conditionals
      );

      query = queryString;
      conditions = queryArray;
    }

    // TODO: generate query
    // const query = 'SELECT * FROM molecularLab;';

    if (!query) {
      toggleLoading(false);
      // TODO: notify
      return;
    }

    const updateResponse = await axios
      .post(BACKEND_URL + '/api/update', {
        query,
        columns,
        conditions,
      })
      .catch((error) => error.response);

    console.log(updateResponse);

    if (updateResponse.status === 200 && updateResponse.data) {
      const { specimen, query } = updateResponse.data;

      if (!specimen.length) {
        notify({
          title: 'Empty Return',
          message: 'Query yielded no data',
          level: 'warning',
        });
      } else {
        onClose();
        setData(specimen);
        setCurrentQuery(query);
      }
    } else {
      // TODO: interpret status
      // const error = updateResponse.data;
      notify({ title: 'TODO', message: 'TODO', level: 'error' });
    }

    toggleLoading(false);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="Update Query">
          <UpdateBulkQueryForm onSubmit={runQuery} />
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="primary"
              type="submit"
              form="update-bulk-form"
              loading={loading}
            >
              Confirm
            </Button>
          </Button.Group>

          <CreateLogModal initialTab={3} />
        </Modal.Footer>
      </Modal>

      {/* <Dropdown.Item text="Select" onClick={on} /> */}
    </React.Fragment>
  );
}
