import React, { useState } from 'react';
import { validateAdvancedCountQuery } from '../../functions/validation';
import Form, { Values } from '../ui/Form';
import numberParser from 'number-to-words';
import Heading from '../ui/Heading';
import Text from '../ui/Text';

type Props = {
  onSubmit(values: Values): void;
};

export default function CountQueryForm({ onSubmit }: Props) {
  const [advanced, setAdvanced] = useState(false);
  const [conditionCount, setConditionCount] = useState(15);

  return (
    <Form onSubmit={onSubmit} id="count-form">
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
        <Form.Input
          name="fields"
          label="Fields"
          disabled={advanced}
          fullWidth
        />
        <Form.Input
          name="databaseTable"
          label="Table"
          disabled={advanced}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="queryType"
          label="How many conditions?"
          value={conditionCount}
          disabled={advanced}
          fullWidth
        />
      </Form.Group>

      <Heading className="pt-3 pb-1">Conditions</Heading>
      <div className="bg-gray-50 rounded-lg w-full p-3 conditional-div-height overflow-y-auto mb-3">
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
