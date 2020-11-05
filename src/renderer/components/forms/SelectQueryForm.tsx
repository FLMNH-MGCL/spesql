import React, { useEffect, useState } from 'react';
import {
  NeutralValidator,
  validateAdvancedSelectQuery,
  validateConditionSelection,
  validateFieldSelection,
  validateTableSelection,
} from '../../functions/validation';
import Form, { Values } from '../ui/Form';
import numberParser from 'number-to-words';
import Heading from '../ui/Heading';
import Text from '../ui/Text';
import {
  conditionCountOptions,
  fieldOptions,
  operators,
} from '../utils/constants';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import { useStore } from '../../../stores';
import { SelectOption } from '../ui/Select';

type Props = {
  onSubmit(values: Values): void;
};

export default function SelectQueryForm({ onSubmit }: Props) {
  const [advanced, setAdvanced] = useState(false);
  const [conditionCount, setConditionCount] = useState(0);
  const [tables, setTables] = useState<SelectOption[]>([]);

  const { user } = useStore((store) => ({ user: store.user }));

  useEffect(() => {
    async function fetchTables() {
      const res = await axios
        .get(BACKEND_URL + '/api/queriables/select/')
        .catch((error) => error.response);

      console.log(res);

      if (res.data && res.data.tables) {
        setTables(
          res.data.tables.map((table: string) => {
            return { label: table, value: table };
          })
        );
      }
      // .then((response) => {
      //   if (response.data.error) {
      //     this.setState({ loading: false });
      //   } else {
      //     // console.log(response);
      //     dbSelection = response.data.tables.map((table, index) => {
      //       return { key: index + 1 * 1002, text: table, value: table };
      //     });

      //     // console.log(dbSelection);
      //     this.setState({ dbSelection: dbSelection, loading: false });
      //   }
      // })
      // .catch((error) => {
      //   const response = error.response;
      //   this.setState({ dbSelection: [], loading: false });
      // });
    }

    fetchTables();
  }, []);

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
          register={
            advanced
              ? { validate: validateAdvancedSelectQuery }
              : NeutralValidator
          }
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
          register={
            advanced ? NeutralValidator : { validate: validateFieldSelection }
          }
        />

        <Form.Select
          name="databaseTable"
          label="Table"
          disabled={advanced}
          fullWidth
          options={tables}
          register={
            advanced ? NeutralValidator : { validate: validateTableSelection }
          }
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
          register={
            advanced
              ? NeutralValidator
              : { validate: validateConditionSelection }
          }
        />
      </Form.Group>

      <Heading className="pt-3 pb-1">Conditions</Heading>
      <div className="bg-gray-50 rounded-lg w-full p-3 conditional-div-height overflow-y-auto">
        {conditionCount > 0 &&
          Array.from({ length: conditionCount }).map((_, index) => {
            const numberInEnglish = numberParser.toWords(index);

            return (
              <Form.Group flex>
                <Form.Select
                  name={`conditionalField_${numberInEnglish}`}
                  label="Field"
                  disabled={advanced}
                  fullWidth
                  options={fieldOptions}
                  register={
                    advanced
                      ? NeutralValidator
                      : { validate: validateFieldSelection }
                  }
                />
                <Form.Select
                  name={`conditionalOperator${numberInEnglish}`}
                  label="Operator"
                  disabled={advanced}
                  options={operators}
                  fullWidth
                />
                <Form.Input
                  name={`conditionalValue_${numberInEnglish}`}
                  label="Value"
                  disabled={advanced}
                  fullWidth
                  // register={
                  //   advanced ? NeutralValidator : { validate: () => validateDynamicFieldValue() }
                  // }
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
