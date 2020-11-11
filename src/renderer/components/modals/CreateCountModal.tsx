import React, { useState } from 'react';
import CountQueryForm from '../forms/CountQueryForm';
import Button from '../ui/Button';
import Divider from '../ui/Divider';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import Statistic from '../ui/Statistic';
import useKeyboard from '../utils/useKeyboard';
import useToggle from '../utils/useToggle';
import CreateHelpModal from './CreateHelpModal';
import CreateLogModal from './CreateLogModal';
import numberParser from 'number-to-words';
import { buildCountQuery } from '../../functions/builder';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import { useNotify } from '../utils/context';
import Radio from '../ui/Radio';
import Spinner from '../ui/Spinner';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateCountModal({ open, onClose }: Props) {
  const { notify } = useNotify();
  const [count, setCount] = useState<number>();
  const [countQuery, setCountQuery] = useState<string>();
  const [showQuery, showQueryToggles] = useToggle(false);
  // I am using local loading state here, since it doesn't really
  // interact with global state in this modal
  const [loading, { on, off }] = useToggle(false);

  useKeyboard('Escape', () => {
    onClose();
  });

  async function runQuery(values: Values) {
    on();

    const {
      advancedQuery,
      conditionalCount,
      databaseTable,
      fields,
      distinct,
    } = values;

    if (!distinct && fields.length > 1) {
      notify({
        title: 'Query Syntax',
        message:
          'You must toggle Distinct when specifying more than one database field',
        level: 'error',
      });

      off();

      return;
    }

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

      for (let i = 0; i < numConditions; i++) {
        const current = numberParser.toWords(i);

        conditionals.push({
          field: values[`conditionalField_${current}`],
          operator: values[`conditionalOperator_${current}`],
          value: values[`conditionalValue_${current}`],
        });
      }

      const { queryString, queryArray } = buildCountQuery(
        databaseTable,
        fields,
        conditionals
      );

      query = queryString;
      conditions = queryArray;
    }

    // TODO: generate query
    // const query = 'SELECT * FROM molecularLab;';

    console.log(query, columns, conditions);

    if (!query) {
      off();
      return;
    }

    const countResponse = await axios
      .post(BACKEND_URL + '/api/count', {
        query,
        columns,
        conditions,
      })
      .catch((error) => error.response);

    if (countResponse.status === 200 && countResponse.data) {
      const { count, query } = countResponse.data;

      setCount(count);
      setCountQuery(query);
    } else {
      // TODO: interpret status
      // const error = selectResponse.data;
      notify({ title: 'TODO', message: 'TODO', level: 'error' });
    }

    off();
  }

  function onClear() {
    setCount(undefined);
    setCountQuery(undefined);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="Count Query">
          <CountQueryForm onSubmit={runQuery} />

          <Divider text="Results" />
          <div className="relative bg-gray-50 rounded-lg w-full p-3 mt-3 min-h-32">
            {!loading && <Statistic value={count} unit="specimen" />}

            <Spinner active={loading} />

            {showQuery && (
              <p className="order-2 mt-2 text-xs leading-6 font-medium text-gray-700 text-center">
                {countQuery}
              </p>
            )}
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group className="ml-3">
            <Button onClick={onClose}>Cancel</Button>
            <Button disabled={!countQuery} onClick={onClear} variant="warning">
              Clear
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="count-form"
              loading={loading}
              disabled={loading}
            >
              Confirm
            </Button>
          </Button.Group>

          <Radio
            checked={!countQuery ? false : showQuery}
            label="Show Query"
            disabled={!countQuery}
            onChange={showQueryToggles.toggle}
          />

          <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={1} />
            <CreateHelpModal variant="count" />
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
