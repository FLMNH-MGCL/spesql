import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  NeutralValidator,
  validateConditionalValue,
  validateConditionSelection,
  validateFieldSelection,
  validateOperator,
} from '../../functions/validation';
import {
  conditionCountOptions,
  fieldOptions,
  operators,
} from '../utils/constants';
import numberParser from 'number-to-words';
import { Form, Heading, Label, Text } from '@flmnh-mgcl/ui';

type ConditionalFormProps = {
  advanced: boolean;
  min?: number;
  fieldsOverride?: {
    label: string;
    value: string;
  }[];
};

export const specialOperators = [
  'IS NOT NULL',
  'IS NULL',
  'LIKE',
  'BETWEEN',
  'NOT BETWEEN',
  'REGEXP',
  'NOT REGEXP',
];

export default function ConditionalForm({
  advanced,
  min,
  fieldsOverride,
}: ConditionalFormProps) {
  const form = useFormContext();

  // FIXME: omg... this threw me for a major loop! I spent a few hours trying to debug
  // this, and when I restarted my computer to it magically started working again...
  // I am leaving this check in here in case this ever happens again, but essentially
  // what was happening was the context was null, meaning it could not pick up the form
  // values from context and therefore the destructuring threw an error.
  if (!form) {
    throw new Error('Error in ConditionalForm.tsx: missing form context!!');
  }

  const { getValues, watch, setValue } = form;

  const [conditionCount, setConditionCount] = useState(min ?? 0);

  const [conditionalJoiner, setConditionalJoiner] = useState('AND');

  const conditionalCounts = min
    ? conditionCountOptions.filter((el) => el.value >= min)
    : conditionCountOptions;

  // I want it to update the form state when this form changes, so it
  // picks up new fields on the conditional count changes
  watch();

  function setValidator(validator: any, operator?: string) {
    if (!advanced) {
      if (operator && specialOperators.includes(operator)) {
        return NeutralValidator;
      }
      return validator;
    } else return NeutralValidator;
  }

  function disableValue(condition: string) {
    return ['IS NOT NULL', 'IS NULL', 'BETWEEN', 'NOT BETWEEN'].includes(
      condition
    );
  }

  function update(name: string, value: any) {
    console.log(name, value);
    setValue(name, value);
  }

  return (
    <React.Fragment>
      <Heading className="pt-3 pb-1">Conditions</Heading>

      <Label className="pt-2">Conditional Joiner:</Label>
      <Form.Group flex>
        <Form.Radio
          name="andJoin"
          label="AND"
          disabled={advanced || !conditionCount}
          checked={
            !advanced && conditionCount && conditionalJoiner === 'AND'
              ? true
              : false
          }
          onChange={() =>
            setConditionalJoiner(conditionalJoiner === 'OR' ? 'AND' : 'AND')
          }
        />

        <Form.Radio
          name="orJoin"
          label="OR"
          disabled={advanced || !conditionCount}
          value={conditionalJoiner}
          checked={
            !advanced && conditionCount && conditionalJoiner === 'OR'
              ? true
              : false
          }
          onChange={() =>
            setConditionalJoiner(conditionalJoiner === 'AND' ? 'OR' : 'OR')
          }
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Select
          name="conditionalCount"
          label="How many conditions?"
          value={conditionCount}
          disabled={advanced}
          fullWidth
          options={conditionalCounts}
          updateControlled={(newVal: any) => {
            setConditionCount(newVal);
          }}
          register={{ validate: setValidator(validateConditionSelection) }}
        />
      </Form.Group>

      <div className="z-0 bg-gray-50 dark:bg-dark-600 dark:text-dark-300 rounded-lg w-full p-3">
        <div className="">
          {conditionCount > 0 &&
            Array.from({ length: conditionCount }).map((_, index) => {
              const numberInEnglish = numberParser.toWords(index);

              const conditionalFieldVal = getValues()[
                `conditionalField_${numberInEnglish}`
              ];

              // TODO, pass to validateConditionalValue
              //@ts-ignore
              const conditionalOperator = getValues()[
                `conditionalOperator_${numberInEnglish}`
              ];

              // console.log(conditionalOperator);
              // console.log(conditionalOperator?.indexOf('BETWEEN'));

              // TODO: render based on operator, too

              return (
                <div key={index}>
                  <Form.Group flex>
                    <Form.Select
                      name={`conditionalField_${numberInEnglish}`}
                      label="Field"
                      disabled={advanced}
                      fullWidth
                      options={fieldsOverride ?? fieldOptions}
                      register={{
                        validate: setValidator(validateFieldSelection),
                      }}
                    />
                    <Form.Select
                      name={`conditionalOperator_${numberInEnglish}`}
                      label="Operator"
                      disabled={advanced}
                      options={operators}
                      fullWidth
                      register={{
                        validate: setValidator(validateOperator),
                      }}
                      updateControlled={(value) =>
                        update(`conditionalOperator_${numberInEnglish}`, value)
                      }
                    />
                    <Form.Input
                      name={`conditionalValue_${numberInEnglish}`}
                      label="Value"
                      disabled={advanced || disableValue(conditionalOperator)}
                      fullWidth
                      register={{
                        validate: setValidator(
                          (value: any) =>
                            validateConditionalValue(
                              value,
                              conditionalFieldVal
                            ),
                          conditionalOperator
                        ),
                      }}
                    />
                  </Form.Group>

                  {conditionalOperator?.indexOf('BETWEEN') >= 0 && (
                    <Form.Group flex>
                      <Form.Input
                        name={`conditionalValue_${numberInEnglish}_from`}
                        label="Left Bound"
                        disabled={advanced}
                        fullWidth
                      />
                      <Form.Input
                        name={`conditionalValue_${numberInEnglish}_to`}
                        label="Right Bound"
                        disabled={advanced}
                        fullWidth
                      />
                    </Form.Group>
                  )}
                </div>
              );
            })}
        </div>

        {conditionCount === 0 && (
          <Text>Condition forms will render here if you need them</Text>
        )}
      </div>
    </React.Fragment>
  );
}
