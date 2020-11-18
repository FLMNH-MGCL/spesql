import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  NeutralValidator,
  validateAdvancedUpdateQuery,
  validateFieldSelection,
  validateOperator,
  validateTableSelection,
  validateSetValue,
} from '../../functions/validation';
import Form, { Values } from '../ui/Form';
import Heading from '../ui/Heading';
import numberParser from 'number-to-words';
import { SelectOption } from '../ui/Select';
import {
  conditionCountOptions,
  fieldOptions,
  operators,
} from '../utils/constants';
import ConditionalForm from './ConditionalForm';
import { fetchTables } from './utils';

const updateFieldOptions = fieldOptions.filter((el) => el.value !== '*');

type SetFormProps = {
  advanced: boolean;
};

// TODO: add sets!
function SetForm({ advanced }: SetFormProps) {
  const { getValues, watch } = useFormContext();
  const setCountOptions = conditionCountOptions.filter((el) => el.value !== 0);

  const [setCount, updateSetCount] = useState(1);

  watch();

  function setValidator(validator: any) {
    if (!advanced) {
      return validator;
    } else return NeutralValidator;
  }

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
          {Array.from({ length: setCount }).map((_, index) => {
            const numberInEnglish = numberParser.toWords(index);

            const setFieldVal = getValues()[`setField_${numberInEnglish}`];

            // TODO, pass to validateConditionalValue
            //@ts-ignore
            const setOperator = getValues()[`setOperator_${numberInEnglish}`];

            return (
              <Form.Group flex key={index}>
                <Form.Select
                  name={`setField_${numberInEnglish}`}
                  label="Field"
                  disabled={advanced}
                  fullWidth
                  options={updateFieldOptions}
                  register={{
                    validate: setValidator(validateFieldSelection),
                  }}
                />
                <Form.Select
                  name={`setOperator_${numberInEnglish}`}
                  label="Operator"
                  disabled={advanced}
                  options={operators}
                  fullWidth
                  register={{
                    validate: setValidator(validateOperator),
                  }}
                />
                <Form.Input
                  name={`setValue_${numberInEnglish}`}
                  label="Value"
                  disabled={advanced}
                  fullWidth
                  register={{
                    validate: setValidator((value: any) =>
                      validateSetValue(value, setFieldVal)
                    ),
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
          register={{
            validate: advanced ? validateAdvancedUpdateQuery : NeutralValidator,
          }}
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
        {/* TODO: Not sure I want this */}
        {/* <Form.Select
          name="fields"
          label="Fields"
          disabled={advanced}
          fullWidth
          multiple
          options={updateFieldOptions}
          register={{ validate: setValidator(validateFieldSelection) }}
        /> */}

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

      <ConditionalForm
        advanced={advanced}
        min={1}
        fieldsOverride={updateFieldOptions}
      />
    </Form>
  );
}
