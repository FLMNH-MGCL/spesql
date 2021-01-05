import React, { useEffect, useState } from 'react';

import shallow from 'zustand/shallow';
import { useStore } from '../../../../stores';
import {
  validateFieldSelection,
  validateTableSelection,
} from '../../../functions/validation';
import { fetchTables } from '../../forms/utils';

import Form from '../../ui/Form';
import { SelectOption } from '../../ui/Select';
import { fieldOptions } from '../../utils/constants';

type Props = {
  onChange(field: string, value: any): void;
};

export default function SelectForm({ onChange }: Props) {
  const [tables, setTables] = useState<SelectOption[]>([]);

  const { expireSession, expiredSession } = useStore(
    (store) => ({
      expireSession: store.expireSession,
      expiredSession: store.expiredSession,
    }),
    shallow
  );

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
    <div>
      <Form.Group flex>
        <Form.Select
          name="fields"
          label="Fields"
          multiple
          fullWidth
          options={fieldOptions}
          register={{ validate: validateFieldSelection }}
          updateControlled={(newVal) => onChange('fields', newVal)}
        />

        <Form.Select
          name="databaseTable"
          label="Table"
          fullWidth
          options={tables}
          register={{ validate: validateTableSelection }}
          updateControlled={(newVal) => onChange('databaseTable', newVal)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Radio
          name="distinct"
          label="Distinct (i.e. tuples with differing combinations of values)"
          onChange={(e) => onChange('distinct', e.currentTarget.checked)}
        />
      </Form.Group>
    </div>
  );
}
