import {
  Button,
  Code,
  Divider,
  Form,
  Label,
  Modal,
  Radio,
} from '@flmnh-mgcl/ui';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useChartStore } from '../../../../stores/chart';
import AreaChartForm from '../../forms/charts/AreaChartForm';
import ConditionalForm from '../../forms/charts/ConditionalForm';
import TableSelect from '../../TableSelect';
import useQuery from '../../utils/useQuery';
import useToggle from '../../utils/useToggle';

export default function AreaChartModal() {
  const [open, { on, off }] = useToggle(false);
  const { runChartQuery } = useQuery();

  const setData = useChartStore((state) => state.setData);
  const setCurrentQuery = useChartStore((state) => state.setCurrentQuery);

  const [databaseTable, setDatabaseTable] = useState('');
  const [hasConditionals, { toggle }] = useToggle(false);
  const [conditionalString, setConditionalString] = useState<string>('');
  const [queryPrefix, setQueryPrefix] = useState<string>('');
  const [groupByClause, setGroupByClause] = useState('');

  function handleSetChange(sets: any[]) {
    if (!sets || !sets.length) return;

    let cols = clsx('SELECT', sets[0].field);

    // let groups = [];

    for (let i = 1; i < sets.length; i++) {
      const { aggregate, field } = sets[i];

      cols = clsx(cols, aggregate ? `,${aggregate}(${field})` : ',' + field);
    }

    setQueryPrefix(cols.replace(/\s*,\s*/g, ', '));

    let nonAggregatedFields = [
      sets[0],
      ...sets.filter((set) => !set.aggregate),
    ];

    let grouping = 'GROUP BY';

    for (let i = 1; i < nonAggregatedFields.length; i++) {
      const { field } = nonAggregatedFields[i];

      grouping = clsx(
        grouping,
        field,
        i !== nonAggregatedFields.length - 1 && ','
      );
    }

    setGroupByClause(grouping.replace(/\s*,\s*/g, ', '));

    // setQueryPrefix(
    //   clsx(
    //     'SELECT',
    //     fields.slice(0, 2).toString().trim(),
    //     aggregate ? `,${aggregate}(${fields[2]})` : ',' + fields[2]
    //   ).replace(/\s*,\s*/g, ', ')
    // );

    // if (aggregate) {
    //   setGroupByClause(
    //     clsx('GROUP BY', fields.slice(0, 2).toString().trim()).replace(
    //       /\s*,\s*/g,
    //       ', '
    //     )
    //   );
    // } else if (!aggregate && groupByClause) {
    //   setGroupByClause('');
    // }
  }

  async function runQuery() {
    const queryString = clsx(
      queryPrefix,
      'FROM',
      databaseTable,
      conditionalString && 'WHERE',
      conditionalString,
      groupByClause
    );

    const data = await runChartQuery(queryString);

    if (data) {
      const header = [Object.keys(data[0])];

      let convertedData = header;

      for (let i = 0; i < data.length; i++) {
        convertedData.push(Object.values(data[i]));
      }

      setData(convertedData);

      setCurrentQuery(queryString);

      off();
    }
  }

  function handleClose() {
    setConditionalString('');
    setQueryPrefix('');
    setGroupByClause('');
    off();
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose} size="almostMassive">
        <Modal.Content title="Area Chart Configuration">
          <TableSelect
            value={databaseTable}
            onChange={setDatabaseTable}
            className="pb-3"
          />

          <AreaChartForm onChange={handleSetChange} />

          <Form.Group>
            <Radio
              label="Configure Conditionals"
              checked={hasConditionals}
              onChange={toggle}
            />
          </Form.Group>

          {hasConditionals && (
            <ConditionalForm
              codeString={conditionalString}
              setCodeString={setConditionalString}
            />
          )}

          <Divider className="pt-4" />

          <div className="my-3 bg-gray-50 dark:bg-dark-400 rounded-md p-3 mt-8 mb-8">
            <Label>Resulting Query:</Label>
            <Code
              language="sql"
              rounded
              codeString={clsx(
                queryPrefix,
                'FROM',
                databaseTable,
                conditionalString && 'WHERE',
                conditionalString,
                groupByClause
              )}
            />
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group className="ml-3">
            <Button onClick={off}>Cancel</Button>
            <Button variant="primary" onClick={runQuery}>
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <Button onClick={on}>Configuration</Button>
    </React.Fragment>
  );
}
