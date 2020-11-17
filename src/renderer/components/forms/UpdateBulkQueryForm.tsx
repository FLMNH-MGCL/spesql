import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  NeutralValidator,
  validateAdvancedUpdateQuery,
  validateFieldSelection,
  validateTableSelection,
} from '../../functions/validation';
import Form, { Values } from '../ui/Form';
import Heading from '../ui/Heading';
// import numberParser from 'number-to-words';
import { SelectOption } from '../ui/Select';
import { conditionCountOptions, fieldOptions } from '../utils/constants';
import ConditionalForm from './ConditionalForm';
import { fetchTables } from './utils';

type SetFormProps = {
  advanced: boolean;
};

// TODO: add sets!
function SetForm({ advanced }: SetFormProps) {
  // @ts-ignore: TODO
  const { getValues, watch } = useFormContext();
  const setCountOptions = conditionCountOptions.filter((el) => el.value !== 0);

  const [setCount, updateSetCount] = useState(1);

  watch();

  // TODO: type validator as function
  // function setValidator(validator: any) {
  //   if (!advanced) {
  //     return validator;
  //   } else return NeutralValidator;
  // }

  return (
    <React.Fragment>
      <Heading className="pt-3 pb-1">Set Statements</Heading>

      <Form.Group flex>
        <Form.Select
          name="setCount"
          label="How many set statements? (i.e. how many fields are you updating)"
          value={setCount}
          disabled={advanced}
          fullWidth
          options={setCountOptions}
          updateControlled={(newVal: any) => {
            updateSetCount(newVal);
          }}
          // register={{ validate: setValidator(validateSetSelection) }}
        />
      </Form.Group>

      <div className="z-0 bg-gray-50 rounded-lg w-full p-3">
        <div className="">
          {Array.from({ length: setCount }).map((_, _index) => {
            // const numberInEnglish = numberParser.toWords(index);

            return <Form.Group>todo</Form.Group>;
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

type Props = {
  onSubmit(values: Values): void;
};

export default function UpdateBulkQueryForm({ onSubmit }: Props) {
  const [advanced, setAdvanced] = useState(false);
  const [tables, setTables] = useState<SelectOption[]>([]);

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
    <Form onSubmit={onSubmit} id="update-bulk-form" className="mb-3">
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
          register={{ validate: validateAdvancedUpdateQuery }}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="queryType"
          disabled
          value="UPDATE"
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

      <SetForm advanced={advanced} />

      <ConditionalForm advanced={advanced} />
    </Form>
  );
}
