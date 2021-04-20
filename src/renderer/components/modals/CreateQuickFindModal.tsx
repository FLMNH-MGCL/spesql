import { Button, FormSubmitValues, Modal, Text } from '@flmnh-mgcl/ui';
import clsx from 'clsx';
import React from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import useKeyboard from '../utils/useKeyboard';
import useQuery from '../utils/useQuery';
import CreateLogModal from './CreateLogModal';
import CreateHelpModal from './CreateHelpModal';
import QuickFindForm from '../forms/QuickFindForm';
import mysql from 'mysql';
import { useNotify } from '../utils/context';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateQuickFindModal({ open, onClose }: Props) {
  const { advancedSelect } = useQuery();
  const { notify } = useNotify();

  const toggleLoading = useStore((state) => state.toggleLoading);

  const loading = useStore((state) => state.loading, shallow);

  useKeyboard('Escape', () => {
    onClose();
  });

  async function handleSubmit(values: FormSubmitValues) {
    toggleLoading(true);

    const { catalogNumber, databaseTable, operator } = values;

    if (!catalogNumber || !databaseTable) {
      notify({
        title: 'Missing Form Elements',
        message:
          'The catalogNumber or table could not be parsed from the form input.',
        level: 'error',
      });
      return;
    }

    let query;

    if (operator !== 'equals') {
      query = clsx(
        'SELECT * FROM',
        databaseTable,
        'WHERE catalogNumber LIKE',
        operator === 'starts with' && `'${catalogNumber}'%`,
        operator === 'ends with' && `'%${catalogNumber}'`,
        operator === 'contains' && `'%${catalogNumber}%'`
      );
    } else {
      query = mysql.format(
        clsx('SELECT * FROM', databaseTable, 'WHERE catalogNumber = ?'),
        [catalogNumber]
      );
    }

    await advancedSelect(query, databaseTable, onClose);

    toggleLoading(false);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="Quick Find">
          <Text>Quickly find a record by catalogNumber search</Text>
          <QuickFindForm onSubmit={handleSubmit} />
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="primary"
              type="submit"
              form="quick-find-form"
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
