import { Form, FormSubmitValues, SelectOption } from '@flmnh-mgcl/ui';
import React, { useEffect, useState } from 'react';
import {
  NeutralValidator,
  validateAdvancedCountQuery,
  validateFieldSelection,
  validateTableSelection,
} from '../../functions/validation';
import { fieldOptions } from '../utils/constants';
import useExpiredSession from '../utils/useExpiredSession';
import ConditionalForm from './ConditionalForm';
import { fetchTables } from './utils';

type Props = {
  onSubmit(values: FormSubmitValues): void;
};

export default function CountQueryForm({ onSubmit }: Props) {
  const [advanced, setAdvanced] = useState(false);
  const [tables, setTables] = useState<SelectOption[]>([]);

  const [expiredSession, { expireSession }] = useExpiredSession();

  // TODO: type validator as function
  function setValidator(validator: any) {
    if (!advanced) {
      return validator;
    } else return NeutralValidator;
  }

  // if modal launches and session is expired, trigger reauth modal
  // once reauthed, the effect will retrigger and load the tables for the
  // select input
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
  }, [expiredSession.current]);

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
