import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../../stores';
import {
  validateFieldSelection,
  validateSetValue,
  validateTableSelection,
} from '../../../functions/validation';
import { fetchTables } from '../../forms/utils';

import Form, { Values } from '../../ui/Form';
import Heading from '../../ui/Heading';
import { SelectOption } from '../../ui/Select';
import {
  conditionCountOptions,
  updateFieldOptions,
} from '../../utils/constants';
import numberParser from 'number-to-words';
import { useFormContext } from 'react-hook-form';
import { Set } from '../../modals/CreateQueryBuilderModal';

type Props = {
  sets: Set[];
  onChange(field: string, value: any): void;
};

function SetForm({ sets, onChange }: Props) {
  const { getValues, watch } = useFormContext();
  const setCountOptions = conditionCountOptions.filter((el) => el.value !== 0);

  const [setCount, updateSetCount] = useState(1);

  function controlledChange(index: number, field: string, newVal: any) {
    let newSets = sets;

    if (index > newSets.length) {
      newSets.push({ [field]: newVal });
    } else {
      let target = newSets[index] ?? {};
      target[field as keyof Set] = newVal;
      newSets.splice(index, 1, target);
    }

    // console.log(index, field, newVal);

    // console.log(newSets);

    onChange('sets', newSets);
  }

  watch();

  return (
    <React.Fragment>
      <Heading className="pt-3 pb-1">Set Statements</Heading>

      <Form.Group flex>
        <Form.Select
          name="setCount"
          label="How many set statements? (i.e. how many fields are you updating)"
          value={setCount}
          fullWidth
          options={setCountOptions}
          updateControlled={(newVal: any) => {
            updateSetCount(newVal);
          }}
        />
      </Form.Group>

      <div className="z-0 bg-gray-50 dark:bg-dark-600 dark:text-dark-300 rounded-lg w-full p-3">
        <div className="">
          {Array.from({ length: setCount }).map((_, index) => {
            const numberInEnglish = numberParser.toWords(index);

            const setFieldVal = getValues()[`setField_${numberInEnglish}`];

            return (
              <Form.Group flex key={index}>
                <Form.Select
                  name={`setField_${numberInEnglish}`}
                  label="Field"
                  fullWidth
                  options={updateFieldOptions}
                  register={{
                    validate: validateFieldSelection,
                  }}
                  updateControlled={(value) => {
                    controlledChange(index, 'field', value);
                  }}
                />

                <Form.Input
                  name={`setValue_${numberInEnglish}`}
                  label="Value"
                  fullWidth
                  register={{
                    validate: (value: any) =>
                      validateSetValue(value, setFieldVal),
                  }}
                  onChange={(e) => {
                    controlledChange(index, 'value', e.target.value);
                  }}
                />
              </Form.Group>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default function UpdateForm({ onChange, sets }: Props) {
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

  function handleChange(values: Values) {
    console.log(values);
  }

  return (
    <div>
      <Form.Group flex>
        <Form.Select
          name="databaseTable"
          label="Table"
          fullWidth
          options={tables}
          register={{ validate: validateTableSelection }}
          updateControlled={(newVal) => onChange('databaseTable', newVal)}
        />
      </Form.Group>

      <Form
        mode="onChange"
        onSubmit={handleChange}
        id="update-bulk-form"
        className="my-3"
      >
        <SetForm sets={sets} onChange={onChange} />
      </Form>
    </div>
  );
}
