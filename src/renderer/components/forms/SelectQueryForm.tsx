import React, { useEffect, useState } from 'react';
import {
  NeutralValidator,
  validateAdvancedSelectQuery,
  validateFieldSelection,
  validateTableSelection,
} from '../../functions/validation';
import Form, { Values } from '../ui/Form';

import { fieldOptions } from '../utils/constants';
import { useStore } from '../../../stores';
import { SelectOption } from '../ui/Select';
import ConditionalForm from './ConditionalForm';
import { fetchTables } from './utils';

type Props = {
  onSubmit(values: Values): void;
};

export default function SelectQueryForm({ onSubmit }: Props) {
  const [advanced, setAdvanced] = useState(false);
  const [tables, setTables] = useState<SelectOption[]>([]);

  const { user } = useStore((store) => ({ user: store.user }));

  // TODO: type validator as function
  function setValidator(validator: any) {
    if (!advanced) {
      return validator;
    } else return NeutralValidator;
  }

  useEffect(() => {
    fetchTables(setTables);
  }, []);

  return (
    <Form onSubmit={onSubmit} id="select-form">
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

      <ConditionalForm advanced={advanced} />
    </Form>
  );
}
