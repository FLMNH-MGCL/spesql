import React from 'react';
import SelectQueryForm from '../forms/SelectQueryForm';
import Button from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import useKeyboard from '../utils/useKeyboard';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import { useNotify } from '../utils/context';
import { useStore } from '../../../stores';
import CreateLogModal from './CreateLogModal';
import numberParser from 'number-to-words';
import { buildSelectQuery } from '../../functions/builder';
import shallow from 'zustand/shallow';
import CreateHelpModal from './CreateHelpModal';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateSelectModal({ open, onClose }: Props) {
  const { notify } = useNotify();

  const { setData, setTable, setCurrentQuery } = useStore((state) => ({
    setData: state.queryData.setData,
    setTable: state.queryData.setTable,
    setCurrentQuery: state.queryData.setCurrentQuery,
  }));

  const toggleLoading = useStore((state) => state.toggleLoading);

  const loading = useStore((state) => state.loading, shallow);

  useKeyboard('Escape', () => {
    onClose();
  });

  async function runQuery(values: Values) {
    toggleLoading(true);

    const { advancedQuery, conditionalCount, databaseTable, fields } = values;

    let query: string = '';
    let columns = null;
    let conditions = null;

    if (advancedQuery) {
      query = advancedQuery;
    } else {
      // construct query
      const numConditions = parseInt(conditionalCount, 10);
      let conditionals = [];
      columns = fields;

      if (!columns.includes('id') && !columns.includes('*')) {
        columns = ['id', ...fields];
      }

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
    // console.log(query, columns, conditions);

    if (!query) return;

    const selectResponse = await axios
      .post(BACKEND_URL + '/api/select', {
        query,
        columns,
        conditions,
      })
      .catch((error) => error.response);

    if (selectResponse.status === 200 && selectResponse.data) {
      const { specimen, query } = selectResponse.data;

      if (!specimen.length) {
        notify({
          title: 'Empty Return',
          message: 'Query yielded no data',
          level: 'warning',
        });
      } else {
        onClose();
        setData(specimen);
        setTable(databaseTable);
        setCurrentQuery(query);
      }
    } else {
      // TODO: interpret status
      // const error = selectResponse.data;
      notify({ title: 'TODO', message: 'TODO', level: 'error' });
    }

    toggleLoading(false);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="Select Query">
          <SelectQueryForm onSubmit={runQuery} />
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="primary"
              type="submit"
              form="select-form"
              loading={loading}
            >
              Confirm
            </Button>
          </Button.Group>

          <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={0} />
            <CreateHelpModal variant="select" />
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
