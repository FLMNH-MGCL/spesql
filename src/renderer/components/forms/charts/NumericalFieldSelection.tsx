import React, { useCallback } from 'react';
import numberParser from 'number-to-words';
import { Form } from '@flmnh-mgcl/ui';
import { aggregates, fieldOptions } from '../../utils/constants';
import { useFormContext } from 'react-hook-form';

export type NFieldSelection = {
  field?: string;
  aggregate?: string;
};

type Props = {
  numFields: number;
  offset?: number;
  handleChange(...args: any): void;
};

export default function NumericalFieldSelection({
  numFields,
  handleChange,
  offset = 1,
}: Props) {
  const { getValues, watch } = useFormContext();

  watch();

  const renderRows = useCallback(() => {
    return Array.from({ length: numFields }, (_, index) => {
      const numberInEnglish = numberParser.toWords(index + offset);

      const aggregateId = `aggregate_${numberInEnglish}`;
      const fieldId = `field_${numberInEnglish}`;

      const aggregateValue = getValues()[aggregateId];
      const fieldValue = getValues()[fieldId];

      return (
        <Form.Group flex key={index + (offset - 1)}>
          <Form.Select
            name={aggregateId}
            label={`Aggregate ${numberInEnglish}`}
            options={aggregates}
            updateControlled={(newAggregate) =>
              handleChange(index + (offset - 1), newAggregate, fieldValue)
            }
            fullWidth
          />
          <Form.Select
            name={fieldId}
            label={`Field ${numberInEnglish}`}
            options={fieldOptions}
            updateControlled={(newField) =>
              handleChange(index + (offset - 1), aggregateValue, newField)
            }
            searchable
            fullWidth
          />
        </Form.Group>
      );
    });
  }, [numFields]);

  return (
    <div className="mt-2 rounded-md bg-gray-100 dark:bg-dark-500 p-4">
      {renderRows()}
    </div>
  );
}
