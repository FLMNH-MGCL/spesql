import React from 'react';
import SelectQueryForm from '../forms/SelectQueryForm';
import Button from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import useKeyboard from '../utils/useKeyboard';
import { useStore } from '../../../stores';
import CreateLogModal from './CreateLogModal';
import numberParser from 'number-to-words';
import { buildSelectQuery } from '../../functions/builder';
import shallow from 'zustand/shallow';
import CreateHelpModal from './CreateHelpModal';
import useQuery from '../utils/useQuery';
import clsx from 'clsx';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateSelectModal({ open, onClose }: Props) {
  const { select, advancedSelect } = useQuery();

  const toggleLoading = useStore((state) => state.toggleLoading);

  const loading = useStore((state) => state.loading, shallow);

  useKeyboard('Escape', () => {
    onClose();
  });

  function parseConditional(values: Values, current: string) {
    const conditional = {
      field: values[`conditionalField_${current}`],
      operator: values[`conditionalOperator_${current}`],
      value: values[`conditionalValue_${current}`],
    };

    // value can be destructed too
    const { field, operator } = conditional;

    /**
 * 'IS NOT NULL',
  'IS NULL',
  'LIKE',
  'BETWEEN',
  'NOT BETWEEN',
  'REGEXP',
  'NOT REGEXP',
 */

    if (operator === 'BETWEEN' || operator === 'NOT BETWEEN') {
      const newValue = clsx(
        values[`conditionalValue_${current}_from`],
        'AND',
        values[`conditionalValue_${current}_to`]
      );

      return {
        field,
        operator,
        value: newValue,
      };
    } else {
      return conditional;
    }
  }

  async function handleSubmit(values: Values) {
    toggleLoading(true);

    const { advancedQuery, conditionalCount, databaseTable, fields } = values;

    let query: string = '';
    let columns = null;
    let conditions = null;

    if (advancedQuery) {
      query = advancedQuery;

      if (query) {
        await advancedSelect(query, databaseTable, onClose);
      }
    } else {
      const numConditions = parseInt(conditionalCount, 10);
      let conditionals = [];
      columns = fields;

      if (!columns.includes('id') && !columns.includes('*')) {
        columns = ['id', ...fields];
      }

      for (let i = 0; i < numConditions; i++) {
        const current = numberParser.toWords(i);

        conditionals.push(parseConditional(values, current));
      }

      const { queryString, queryArray } = buildSelectQuery(
        databaseTable,
        conditionals
      );

      query = queryString;
      conditions = queryArray;

      if (!query) return;

      await select(query, columns, conditions, databaseTable, onClose);
    }

    toggleLoading(false);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="Select Query">
          <SelectQueryForm onSubmit={handleSubmit} />
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
            <CreateLogModal initialTab={0} watch="select" />
            <CreateHelpModal variant="select" />
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
