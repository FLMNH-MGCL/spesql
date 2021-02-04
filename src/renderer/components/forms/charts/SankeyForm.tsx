import { Code, Form, Radio, Text } from '@flmnh-mgcl/ui';
import React, { useState } from 'react';
import { validateStringConstraint } from '../../../functions/validation';
import { aggregates, fieldOptions } from '../../utils/constants';
import useToggle from '../../utils/useToggle';

type Props = {
  onChange(...args: any): void;
};

export default function SankeyForm({ onChange }: Props) {
  const [selected, setSelected] = useState<[string, string, string]>([
    '',
    '',
    '',
  ]);

  const [useAggregate, { toggle }] = useToggle(false);
  const [aggregate, setAggregate] = useState('');

  function handleChange(index: number, field: string) {
    let newSelected = selected;
    newSelected[index] = field;
    onChange(newSelected, aggregate);
    setSelected(newSelected);
  }

  return (
    <React.Fragment>
      <Form mode="onChange">
        <Form.Group flex>
          <Form.Select
            name="field1"
            label="Field One"
            register={{ validate: validateStringConstraint }}
            options={fieldOptions}
            searchable
            updateControlled={(newVal) => handleChange(0, newVal)}
            fullWidth
          />

          <Form.Select
            name="field2"
            label="Field Two"
            register={{ validate: validateStringConstraint }}
            options={fieldOptions}
            searchable
            updateControlled={(newVal) => handleChange(1, newVal)}
            fullWidth
          />
        </Form.Group>

        <Form.Group>
          <Radio
            label="Use Aggregate Function"
            checked={useAggregate}
            onChange={toggle}
          />
        </Form.Group>

        <Form.Group flex>
          <Form.Select
            name="aggregate"
            label="Aggregate"
            value={aggregate}
            updateControlled={(newVal) => {
              setAggregate(newVal);
              onChange(selected, newVal);
            }}
            register={{ validate: validateStringConstraint }}
            options={aggregates}
            disabled={!useAggregate}
            fullWidth
          />
          <Form.Select
            name="field3"
            label="Field Three"
            register={{ validate: validateStringConstraint }}
            options={fieldOptions}
            updateControlled={(newVal: string) => handleChange(2, newVal)}
            searchable
            fullWidth
          />
        </Form.Group>
      </Form>
    </React.Fragment>
  );
}

export function SankeyInfoSheet() {
  return (
    <React.Fragment>
      <Text className="py-1">
        Sankey Charts require three columns in the structure of:
      </Text>

      <Code rounded>[string, string, number]</Code>

      <Text className="py-2">
        A sankey diagram is a visualization used to depict a flow from one set
        of values to another. The things being connected are called nodes and
        the connections are called links.
      </Text>

      <Text className="py-2">
        Sankeys are best used when you want to show a many-to-many mapping
        between two domains (e.g., universities and majors) or multiple paths
        through a set of stages
      </Text>
    </React.Fragment>
  );
}
