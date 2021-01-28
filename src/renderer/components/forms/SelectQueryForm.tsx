import React, { useEffect, useState } from 'react';
import {
  NeutralValidator,
  validateAdvancedSelectQuery,
  validateFieldSelection,
  validateTableSelection,
} from '../../functions/validation';
import { fieldOptions } from '../utils/constants';
import { useStore } from '../../../stores';
import ConditionalForm from './ConditionalForm';
import { fetchTables } from './utils';
import shallow from 'zustand/shallow';
import { Form, FormSubmitValues, SelectOption } from '@flmnh-mgcl/ui';

type Props = {
  onSubmit(values: FormSubmitValues): void;
};

export default function SelectQueryForm({ onSubmit }: Props) {
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
    <Form onSubmit={onSubmit} id="select-form" mode="onChange">
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
          register={
            advanced
              ? { validate: validateAdvancedSelectQuery }
              : NeutralValidator
          }
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="queryType"
          disabled
          value="SELECT"
          onChange={() => {}}
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
          searchable
          register={{ validate: setValidator(validateFieldSelection) }}
        />

        <Form.Select
          name="databaseTable"
          label="Table"
          disabled={advanced}
          fullWidth
          options={tables}
          searchable
          register={{ validate: setValidator(validateTableSelection) }}
        />
      </Form.Group>

      <ConditionalForm advanced={advanced} />
    </Form>
  );
}
