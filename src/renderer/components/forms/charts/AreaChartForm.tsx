import { Code, Form, Text } from '@flmnh-mgcl/ui';
import React, { useEffect, useState } from 'react';
import { validateStringConstraint } from '../../../functions/validation';
import {
  numericalSetCountOptions,
  updateFieldOptions,
} from '../../utils/constants';
import NumericalFieldSelection, {
  NFieldSelection,
} from './NumericalFieldSelection';

type Props = {
  onChange(sets: any[]): void;
};

export default function AreaChartForm({ onChange }: Props) {
  const [selections, setSelections] = useState<NFieldSelection[]>([{}, {}]);

  const [numFields, setNumFields] = useState(2);

  // function handleChange(index: number, field: string) {
  //   let newSelected = selected;
  //   newSelected[index] = field;
  //   onSetChange(newSelected, aggregate);
  //   setSelected(newSelected);
  // }

  useEffect(() => {
    if (numFields > selections.length) {
      const addedArray: NFieldSelection[] = Array.from({
        length: numFields,
      });
      setSelections([...selections, ...addedArray]);
    }
  }, [numFields]);

  function handleChange(
    index: number,
    aggregate: string | undefined,
    field: string
  ) {
    let newSelections = selections;

    let targetSelection = newSelections[index];

    if (!targetSelection) {
      targetSelection = {
        aggregate,
        field,
      };
    } else {
      targetSelection.aggregate = aggregate;
      targetSelection.field = field;
    }

    newSelections[index] = targetSelection;
    setSelections(newSelections);
    onChange(newSelections);
  }

  return (
    <React.Fragment>
      <Form mode="all">
        <Form.Group flex>
          <Form.Select
            name="numFields"
            label="How many fields?"
            options={numericalSetCountOptions}
            value={numFields}
            updateControlled={(val) => setNumFields(val)}
            fullWidth
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Select
            name="field1"
            label="Field One"
            register={{ validate: validateStringConstraint }}
            options={updateFieldOptions}
            updateControlled={(val) => handleChange(0, undefined, val)}
            searchable
            fullWidth
          />
        </Form.Group>

        <NumericalFieldSelection
          numFields={numFields - 1}
          handleChange={handleChange}
          offset={2}
        />
      </Form>
    </React.Fragment>
  );
}

export function AreaChartInfoSheet() {
  return (
    <React.Fragment>
      <Text className="py-1">
        Area Charts require a minimum of two columns in the structure of:
      </Text>

      <Code rounded>[any, number, ..., number]</Code>

      <Text className="py-1">
        The first value has little restriction, and each column following must
        be numerical.
      </Text>

      <Text className="py-2">
        Area Charts are similar to Line Charts, with the areas underneath the
        lines automatically shaded in the appropriate colors per line.
      </Text>
    </React.Fragment>
  );
}
