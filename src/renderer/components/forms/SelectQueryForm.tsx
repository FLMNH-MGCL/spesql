import React, { useState } from 'react';
import {
  validateAdvancedSelectQuery,
  // validateFieldSelection,
} from '../../functions/validation';
import Form, { Values } from '../ui/Form';
import numberParser from 'number-to-words';
import Heading from '../ui/Heading';
import Text from '../ui/Text';
import { conditionCountOptions, fieldOptions } from '../utils/constants';

type Props = {
  onSubmit(values: Values): void;
};

export default function SelectQueryForm({ onSubmit }: Props) {
  const [advanced, setAdvanced] = useState(false);
  const [conditionCount, setConditionCount] = useState(0);

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
          register={{ validate: validateAdvancedSelectQuery }}
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
          // register={{ validate: validateFieldSelection }}
        />

        <Form.Select
          name="databaseTable"
          label="Table"
          disabled={advanced}
          fullWidth
          options={fieldOptions}
        />
      </Form.Group>

      {/* TODO: make Select component controllable... :( */}
      <Form.Group flex>
        <Form.Select
          name="queryType"
          label="How many conditions?"
          value={conditionCount}
          disabled={advanced}
          fullWidth
          options={conditionCountOptions}
          onChange={(e) => setConditionCount(parseInt(e.target.value))}
        />
      </Form.Group>

      <Heading className="pt-3 pb-1">Conditions</Heading>
      <div className="bg-gray-50 rounded-lg w-full p-3 conditional-div-height overflow-y-auto">
        {conditionCount > 0 &&
          Array.from({ length: conditionCount }).map((_, index) => {
            const numberInEnglish = numberParser.toWords(index);

            return (
              <Form.Group flex>
                <Form.Input
                  name={`conditionalField_${numberInEnglish}`}
                  label="Field"
                  disabled={advanced}
                  fullWidth
                />
                <Form.Input
                  name={`conditionalOperator${numberInEnglish}`}
                  label="Operator"
                  disabled={advanced}
                  fullWidth
                />
                <Form.Input
                  name={`conditionalValue_${numberInEnglish}`}
                  label="Value"
                  disabled={advanced}
                  fullWidth
                />
              </Form.Group>
            );
          })}

        {conditionCount === 0 && (
          <Text>Condition forms will render here if you need them</Text>
        )}
      </div>
    </Form>
  );
}
