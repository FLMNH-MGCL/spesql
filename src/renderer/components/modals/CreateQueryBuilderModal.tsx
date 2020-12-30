import React, { useState } from 'react';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
// import { useNotify } from '../utils/context';
import useKeyboard from '../utils/useKeyboard';
import Button from '../ui/Button';
import CreateLogModal from './CreateLogModal';
import CreateHelpModal from './CreateHelpModal';
import QueryBuilder from '../QueryBuilder';
import { formatQuery } from 'react-querybuilder';

import { queryBuilderFields } from '../utils/constants';
import Label from '../ui/Label';
import Code from '../ui/Code';

// IDEAS
// https://reactjsexample.com/drag-and-drop-sortable-component-for-nested-data-and-hierarchies/
//https://github.com/fridaymeng/react-sql-query-builder
//https://sapientglobalmarkets.github.io/react-querybuilder/

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateQueryBuilderModal({ open, onClose }: Props) {
  // const { notify } = useNotify();
  // I am using local loading state here, since it doesn't really
  // interact with global state in this modal
  // const [loading, { on, off }] = useToggle(false);

  const [codeString, setCodeString] = useState<string>('');

  useKeyboard('Escape', () => {
    onClose();
  });

  // @ts-ignore: I know it isnt called yet
  async function runQuery(values: Values) {
    console.log(values);
  }

  function logQuery(query: any) {
    const formatted = formatQuery(query, 'sql');

    if (typeof formatted === 'string') {
      setCodeString(formatted);
    } else {
      const { sql, params } = formatted;

      console.log('what is this:', params);
      setCodeString(sql);
    }
  }

  function getInputType(field: string, _operator: string): string {
    return (
      queryBuilderFields.find((el) => el.name === field)?.inputType ?? 'text'
    );
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="almostMassive">
        <Modal.Content title="Query Builder">
          <QueryBuilder
            fields={queryBuilderFields}
            onQueryChange={logQuery}
            getInputType={getInputType}
          />

          <div className="my-3 bg-gray-50 dark:bg-dark-400 rounded-md p-3">
            <Label>Query Conditional Statement:</Label>
            <Code language="sql" rounded codeString={codeString} />
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group className="ml-3">
            <Button onClick={onClose}>Cancel</Button>

            <Button
              onClick={onClose} // TODO: CHANGE ME
              variant="primary"
              // type="submit"
              // form="count-form"
              // loading={loading}
              // disabled={loading}
            >
              Confirm
            </Button>
          </Button.Group>

          <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={0} />
            <CreateHelpModal variant="queryBuilder" />
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
