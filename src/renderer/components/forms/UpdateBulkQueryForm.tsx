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
import numberParser from 'number-to-words';
import {
  conditionCountOptions,
  operators,
  updateFieldOptions,
} from '../utils/constants';
import ConditionalForm from './ConditionalForm';
import { fetchTables } from './utils';
import useExpiredSession from '../utils/useExpiredSession';
import { Form, FormSubmitValues, Heading, SelectOption } from '@flmnh-mgcl/ui';

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

      <div className="z-0 bg-gray-50 dark:bg-dark-600 dark:text-dark-300 rounded-lg w-full p-3">
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

                {/* TODO: filter out new operators that don't work with this structure of update */}
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
  onSubmit(values: FormSubmitValues): void;
};

export default function UpdateBulkQueryForm({ onSubmit }: Props) {
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
