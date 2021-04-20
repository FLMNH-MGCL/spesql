import { Form, FormSubmitValues, Radio, SelectOption } from '@flmnh-mgcl/ui';
import React, { useEffect, useState } from 'react';
import { validateNonEmptyField } from '../../functions/validation';
import useExpiredSession from '../utils/useExpiredSession';
import { fetchTables } from './utils';

type Props = {
  onSubmit(values: FormSubmitValues): void;
};

export default function QuickFindForm({ onSubmit }: Props) {
  const [tables, setTables] = useState<SelectOption[]>([]);
  const [operator, setOperator] = useState<
    'equals' | 'starts with' | 'ends with' | 'contains'
  >('equals');

  const [expiredSession, { expireSession }] = useExpiredSession();

  useEffect(() => {
    async function init() {
      const errored = await fetchTables(setTables);

      if (errored) {
        if (errored === 'BAD SESSION') {
          expireSession();
        } else {
          throw new Error('Some other error occurred!');
        }
      }
    }

    init();
  }, [expiredSession.current]);

  return (
    <Form onSubmit={onSubmit} id="quick-find-form" mode="onChange">
      <Form.Group flex>
        <Form.Input
          name="catalogNumber"
          label="catalogNumber"
          fullWidth
          toolTip="This is the LEP number to search for"
          toolTipOrigin="right"
          register={{ validate: validateNonEmptyField }}
        />

        <Form.Select
          name="databaseTable"
          label="Table"
          fullWidth
          options={tables}
          searchable
          toolTip="This is the database table from which the data will be queried"
          toolTipOrigin="right"
          register={{ validate: validateNonEmptyField }}
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="operator"
          className="hidden"
          value={operator}
          readOnly
        />
        <Radio
          checked={operator === 'equals'}
          label="Exact"
          onChange={() => setOperator('equals')}
        />

        <Radio
          checked={operator === 'starts with'}
          label="Starts With"
          onChange={() => setOperator('starts with')}
        />

        <Radio
          checked={operator === 'ends with'}
          label="Ends With"
          onChange={() => setOperator('ends with')}
        />

        <Radio
          checked={operator === 'contains'}
          label="Contains"
          onChange={() => setOperator('contains')}
        />
      </Form.Group>
    </Form>
  );
}
