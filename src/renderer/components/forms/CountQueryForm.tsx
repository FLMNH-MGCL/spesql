import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import {
  NeutralValidator,
  validateAdvancedCountQuery,
  validateFieldSelection,
  validateTableSelection,
} from '../../functions/validation';
import Form, { Values } from '../ui/Form';
import { SelectOption } from '../ui/Select';
import { fieldOptions } from '../utils/constants';
import ConditionalForm from './ConditionalForm';
import { fetchTables } from './utils';

type Props = {
  onSubmit(values: Values): void;
};

export default function CountQueryForm({ onSubmit }: Props) {
  const [advanced, setAdvanced] = useState(false);
  const [tables, setTables] = useState<SelectOption[]>([]);

  const { expireSession, expiredSession } = useStore(
    (store) => ({
      expireSession: store.expireSession,
      expiredSession: store.expiredSession,
    }),
    shallow
  );

  // TODO: type validator as function
  function setValidator(validator: any) {
    if (!advanced) {
      return validator;
    } else return NeutralValidator;
  }

  useEffect(() => {
    async function init() {
      const errored = await fetchTables(setTables);

      if (errored) {
        if (errored === 'BAD SESSION') {
          expireSession();
        } else {
          console.log(errored);
          throw new Error('Some other error occurred!');
        }
      }
    }

    init();
  }, [expiredSession]);

  return (
    <Form onSubmit={onSubmit} id="count-form" className="mb-3">
      <Form.Group flex>
        <Form.Radio
          name="advanced-check"
          checked={advanced}
          onChange={() => setAdvanced(!advanced)}
          label="Advanced Query"
        />

        <Form.Input
          name="advancedQuery"
          disabled={!advanced}
          register={{ validate: validateAdvancedCountQuery }}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="queryType"
          disabled
          value="COUNT"
          label="Query Type"
          fullWidth
        />
        <Form.Select
          name="fields"
          label="Fields"
          disabled={advanced}
          fullWidth
          multiple
          options={fieldOptions}
          register={{ validate: setValidator(validateFieldSelection) }}
        />

        <Form.Select
          name="databaseTable"
          label="Table"
          disabled={advanced}
          fullWidth
          options={tables}
          register={{ validate: setValidator(validateTableSelection) }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Radio
          name="distinct"
          label="Distinct (i.e. tuples with differing combinations of values)"
          disabled={advanced}
        />
      </Form.Group>

      <ConditionalForm advanced={advanced} />
    </Form>
  );
}
