import React from 'react';
import { useStore } from '../../../stores';
import Button from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import { useNotify } from '../utils/context';
import useKeyboard from '../utils/useKeyboard';
import CreateLogModal from './CreateLogModal';
import numberParser from 'number-to-words';
import { buildUpdateQuery } from '../../functions/builder';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import UpdateBulkQueryForm from '../forms/UpdateBulkQueryForm';
import CreateHelpModal from './CreateHelpModal';
import useToggle from '../utils/useToggle';
import shallow from 'zustand/shallow';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateBulkUpdateModal({ open, onClose }: Props) {
  const { notify } = useNotify();

  const { setData, queryString, toggleLoading } = useStore(
    (state) => ({
      setData: state.queryData.setData,
      queryString: state.queryData.queryString,
      toggleLoading: state.toggleLoading,
    }),
    shallow
  );

  const [loading, { on, off }] = useToggle(false);

  useKeyboard('Escape', () => {
    onClose();
  });

  async function refresh() {
    if (!queryString || queryString === '') {
      return;
    }

    setData([]);

    toggleLoading(true);

    const selectResponse = await axios
      .post(BACKEND_URL + '/api/select', {
        query: queryString,
      })
      .catch((error) => error.response);

    console.log(selectResponse);

    // TODO: add session validation too
    if (selectResponse.status === 200 && selectResponse.data) {
      const { specimen } = selectResponse.data;
      setData(specimen);
    } else {
      // TODO: interpret status
      const error = selectResponse.data;
      notify({ title: 'TODO', message: error, level: 'error' });
    }

    toggleLoading(false);
  }

  function parseConditions(count: any, values: Values) {
    const numConditions = parseInt(count, 10);

    if (numConditions < 1) {
      notify({
        title: 'Invalid Conditions',
        message: 'You must specify at least one condition',
        level: 'error',
      });

      return null;
    }

    let conditionals = [];

    for (let i = 0; i < numConditions; i++) {
      const current = numberParser.toWords(i);

      conditionals.push({
        field: values[`conditionalField_${current}`],
        operator: values[`conditionalOperator_${current}`],
        value: values[`conditionalValue_${current}`],
      });
    }

    return conditionals;
  }

  function parseSets(count: any, values: Values) {
    const numSets = parseInt(count, 10);

    if (numSets < 1) {
      notify({
        title: 'Invalid Set Statements',
        message: 'You must specify at least one set statement',
        level: 'error',
      });

      return null;
    }

    let sets = [];

    for (let i = 0; i < numSets; i++) {
      const current = numberParser.toWords(i);

      sets.push({
        field: values[`setField_${current}`],
        operator: values[`setOperator_${current}`],
        value: values[`setValue_${current}`],
      });
    }

    return sets;
  }

  // TODO: implement me
  async function runQuery(values: Values) {
    on();
    console.log(values);

    const { advancedQuery, setCount, conditionalCount, databaseTable } = values;

    let query: string = '';
    let conditions = null;

    if (advancedQuery) {
      query = advancedQuery;
    } else {
      const conditionals = parseConditions(conditionalCount, values);

      if (!conditionals) {
        off();
        return;
      }

      const sets = parseSets(setCount, values);

      if (!sets) {
        off();
        return;
      }

      const { queryString, conditionalPairs, updates } = buildUpdateQuery(
        databaseTable,
        conditionals,
        sets
      );

      query = queryString;
      conditions = conditionalPairs;

      if (!query) {
        off();
        // TODO: notify
        return;
      }

      const updateResponse = await axios
        .post(BACKEND_URL + '/api/update', {
          query,
          conditions,
          updates,
        })
        .catch((error) => error.response);

      console.log(updateResponse);

      if (updateResponse.status === 200 && updateResponse.data) {
        const { message } = updateResponse.data;

        notify({
          title: 'Update Successful',
          message,
          level: 'success',
        });

        refresh();
      } else {
        // TODO: interpret status
        // const error = updateResponse.data;
        notify({ title: 'TODO', message: 'TODO', level: 'error' });
      }
    }

    off();
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

          <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={3} />
            <CreateHelpModal variant="update" />
          </div>
        </Modal.Footer>
      </Modal>

      {/* <Dropdown.Item text="Select" onClick={on} /> */}
    </React.Fragment>
  );
}
