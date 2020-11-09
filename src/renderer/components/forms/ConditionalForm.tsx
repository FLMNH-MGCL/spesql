import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  NeutralValidator,
  validateConditionalValue,
  validateConditionSelection,
  validateFieldSelection,
  validateOperator,
} from '../../functions/validation';
import Form from '../ui/Form';
import Heading from '../ui/Heading';
import {
  conditionCountOptions,
  fieldOptions,
  operators,
} from '../utils/constants';
import numberParser from 'number-to-words';
import Text from '../ui/Text';

type ConditionalFormProps = {
  advanced: boolean;
};

export default function ConditionalForm({ advanced }: ConditionalFormProps) {
  const { getValues, watch } = useFormContext();
  const [conditionCount, setConditionCount] = useState(0);

  // I want it to update the form state when this form changes, so it
  // picks up new fields on the conditional count changes
  watch();

  // TODO: type validator as function
  function setValidator(validator: any) {
    if (!advanced) {
      return validator;
    } else return NeutralValidator;
  }

  return (
    <React.Fragment>
      <Heading className="pt-3 pb-1">Conditions</Heading>

      <Form.Group flex>
        <Form.Select
          name="conditionalCount"
          label="How many conditions?"
          value={conditionCount}
          disabled={advanced}
          fullWidth
          options={conditionCountOptions}
          updateControlled={(newVal: any) => {
            setConditionCount(newVal);
          }}
          register={{ validate: setValidator(validateConditionSelection) }}
        />
      </Form.Group>

      <div className="z-0 bg-gray-50 rounded-lg w-full p-3">
        <div className="">
          {conditionCount > 0 &&
            Array.from({ length: conditionCount }).map((_, index) => {
              const numberInEnglish = numberParser.toWords(index);

              const conditionalFieldVal = getValues()[
                `conditionalField_${numberInEnglish}`
              ];

              // TODO, pass to validateConditionalValue
              const conditionalOperator = getValues()[
                `conditionalOperator_${numberInEnglish}`
              ];

              return (
                <Form.Group flex key={index}>
                  <Form.Select
                    name={`conditionalField_${numberInEnglish}`}
                    label="Field"
                    disabled={advanced}
                    fullWidth
                    options={fieldOptions}
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
                  />
                  <Form.Input
                    name={`conditionalValue_${numberInEnglish}`}
                    label="Value"
                    disabled={advanced}
                    fullWidth
                    register={{
                      validate: setValidator((value: any) =>
                        validateConditionalValue(value, conditionalFieldVal)
                      ),
                    }}
                  />
                </Form.Group>
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
