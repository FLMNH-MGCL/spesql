import React from 'react';
import { useNotify } from '../utils/context';
import useKeyboard from '../utils/useKeyboard';
import CreateLogModal from './CreateLogModal';
import numberParser from 'number-to-words';
import { buildUpdateQuery } from '../../functions/builder';
import UpdateBulkQueryForm from '../forms/UpdateBulkQueryForm';
import CreateHelpModal from './CreateHelpModal';
import useToggle from '../utils/useToggle';
import useQuery from '../utils/useQuery';
import { Button, FormSubmitValues, Modal } from '@flmnh-mgcl/ui';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateBulkUpdateModal({ open, onClose }: Props) {
  const { notify } = useNotify();

  const [loading, { on, off }] = useToggle(false);

  const { update, advancedUpdate, logUpdate } = useQuery();

  useKeyboard('Escape', () => {
    onClose();
  });

  function parseConditions(count: any, values: FormSubmitValues) {
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

  // TODO: hard code '=' for operator, or just remove it
  function parseSets(count: any, values: FormSubmitValues) {
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

  async function handleSubmit(values: FormSubmitValues) {
    on();

    const { advancedQuery, setCount, conditionalCount, databaseTable } = values;

    let query: string = '';
    let conditions = null;

    if (advancedQuery) {
      query = advancedQuery;

      const queryStringRet = await advancedUpdate(query);

      if (queryStringRet) {
        await logUpdate(queryStringRet, null, databaseTable, null);
      }

      off();
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

      const queryStringRet = await update(query, conditions, updates);

      if (queryStringRet) {
        await logUpdate(queryStringRet, null, databaseTable, null);
      }

      off();
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="Update Query">
          <UpdateBulkQueryForm onSubmit={handleSubmit} />
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
