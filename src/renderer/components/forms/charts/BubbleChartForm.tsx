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

export default function BubbleChartForm({ onChange }: Props) {
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

export function BubbleChartInfoSheet() {
  return (
    <React.Fragment>
      <Text className="py-1">
        Bubble Charts may have data configured in multiple varying formats, they
        require a minimum of three columns, two additional columns after the
        initial three, in the structure of:
      </Text>

      <Code rounded>
        [string, number, number, string OR number OR NONE, number OR NONE]
      </Code>

      <Text className="py-1">
        A bubble chart is used to visualize a data set with two to four
        dimensions. The first two dimensions are visualized as coordinates, the
        third as color and the fourth as size.
      </Text>

      <Text className="py-1">
        An example dataset could be the following JavaScript array:
      </Text>

      <Code
        rounded
        language="javascript"
        codeString={`let myData = [
  ['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
  ['CAN',    80.66,              1.67,      'North America',  33739900],
  ['DEU',    79.84,              1.36,      'Europe',         81902307],
];`}
      />

      <Text className="py-2">
        Area Charts are similar to Line Charts, with the areas underneath the
        lines automatically shaded in the appropriate colors per line.
      </Text>
    </React.Fragment>
  );
}
