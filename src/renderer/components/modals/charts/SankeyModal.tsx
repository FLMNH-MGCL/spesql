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
import ConditionalForm from '../../forms/charts/ConditionalForm';
import SankeyForm from '../../forms/charts/SankeyForm';
import TableSelect from '../../TableSelect';
import useQuery from '../../utils/useQuery';
import useToggle from '../../utils/useToggle';

export default function SankeyModal() {
  const [open, { on, off }] = useToggle(false);
  const { runChartQuery } = useQuery();

  const setData = useChartStore((state) => state.setData);

  const [databaseTable, setDatabaseTable] = useState('');
  const [hasConditionals, { toggle }] = useToggle(false);
  const [conditionalString, setConditionalString] = useState<string>('');
  const [queryPrefix, setQueryPrefix] = useState<string>('');
  const [groupByClause, setGroupByClause] = useState('');

  function handleFormChange(fields: string[], aggregate: any) {
    setQueryPrefix(
      clsx(
        'SELECT',
        fields.slice(0, 2).toString().trim(),
        aggregate ? `,${aggregate}(${fields[2]})` : ',' + fields[2]
      ).replace(/\s*,\s*/g, ', ')
    );

    if (aggregate) {
      setGroupByClause(
        clsx('GROUP BY', fields.slice(0, 2).toString().trim()).replace(
          /\s*,\s*/g,
          ', '
        )
      );
    } else if (!aggregate && groupByClause) {
      setGroupByClause('');
    }
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

      off();
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="almostMassive">
        <Modal.Content title="Sankey Chart Configuration">
          <TableSelect
            value={databaseTable}
            onChange={setDatabaseTable}
            className="pb-3"
          />

          <SankeyForm onChange={handleFormChange} />

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

          {/* <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={1} watch="count" />
            <CreateHelpModal variant="count" />
          </div> */}
        </Modal.Footer>
      </Modal>

      <Button onClick={on}>Configuration</Button>
    </React.Fragment>
  );
}
