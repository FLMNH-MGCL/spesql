import React, { useEffect, useState } from 'react';
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
import Text from '../ui/Text';
import Select from '../querybuilder/Select';
import SelectForm from '../querybuilder/forms/SelectForm';
import clsx from 'clsx';
import Heading from '../ui/Heading';
import Divider from '../ui/Divider';
import UpdateForm from '../querybuilder/forms/UpdateForm';
import mysql from 'mysql';

// IDEAS
// https://reactjsexample.com/drag-and-drop-sortable-component-for-nested-data-and-hierarchies/
//https://github.com/fridaymeng/react-sql-query-builder
//https://sapientglobalmarkets.github.io/react-querybuilder/

type BasicQueryClause = {
  queryType: string;
  fields: string[];
  databaseTable: string;
  distinct: boolean;
  sets?: Set[];
};

const defaultClause = {
  queryType: '',
  fields: [],
  databaseTable: '',
  distinct: false,
  sets: undefined,
};

type Props = {
  open: boolean;
  onClose(): void;
};

export type Set = {
  field?: string;
  value?: any;
};

export default function CreateQueryBuilderModal({ open, onClose }: Props) {
  const [codeString, setCodeString] = useState<string>('');
  const [queryPrefix, setQueryPrefix] = useState<string>('');
  // const [fields, setFields] = useState<string[]>();
  // const [databaseTable, setDatabaseTable] = useState<string>();
  // const [distinct, setDistinct] = useState<boolean>(false);
  const [queryClause, setQueryClause] = useState<BasicQueryClause>(
    defaultClause
  );

  // const [sets, updateSets] = useState<Set[]>([]);

  const { queryType, sets } = queryClause;

  function handleClose() {
    setQueryClause(defaultClause);
    setQueryPrefix('');
    setCodeString('');
    onClose();
  }

  useKeyboard('Escape', () => {
    handleClose();
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

  function buildSelectStatement() {
    const { fields, databaseTable, distinct } = queryClause;

    const prefix = clsx(
      'SELECT',
      distinct && 'DISTINCT',
      fields,
      'FROM',
      databaseTable
    );

    setQueryPrefix(prefix);
  }

  function buildCountStatement() {
    const { fields, databaseTable, distinct } = queryClause;

    let fieldString = fields ? fields?.toString().replace(',', ', ') : '';
    fieldString =
      fields?.length > 1 || distinct ? 'DISTINCT ' + fieldString : fieldString;

    const prefix = clsx(`SELECT COUNT(${fieldString}) FROM`, databaseTable);

    setQueryPrefix(prefix);
  }

  function buildUpdateStatement() {
    const { databaseTable } = queryClause;

    let prefix = clsx('UPDATE', databaseTable, 'SET ?');

    let updates: any = {};
    sets?.forEach((set) => {
      // prefix = clsx(prefix);
      if (set.field) {
        updates[set.field] = set.value;
      }
    });

    console.log(updates);
    setQueryPrefix(mysql.format(prefix, updates));
  }

  function buildQueryStatement(qType: string) {
    if (qType === 'select') {
      buildSelectStatement();
    } else if (qType === 'count') {
      buildCountStatement();
    } else if (qType === 'update') {
      buildUpdateStatement();
    }
  }

  function handleControlledChange(field: string, value: any) {
    setQueryClause({ ...queryClause, [field]: value });
  }

  function handleTypeChange(qType: any) {
    setQueryClause({ ...queryClause, queryType: qType });
  }

  useEffect(() => {
    buildQueryStatement(queryClause.queryType);
  }, [queryClause]);

  function renderQueryForm() {
    if (!queryType) {
      return null;
    }

    switch (queryType) {
      case 'select':
      case 'count':
        return <SelectForm onChange={handleControlledChange} />;
      case 'update':
        return (
          <UpdateForm onChange={handleControlledChange} sets={sets ?? []} />
        );
      default:
        throw new Error(
          `Invalid query type in Query Builder Component: ${queryType}`
        );
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose} size="almostMassive">
        <Modal.Content title="Query Builder">
          <Text className="py-2">
            This modal allows for more complex query statements to be made by
            allowing for more control over the conditional statements.
          </Text>

          <Select
            className="py-3"
            name="queryType"
            label="Query Type"
            placeholder="Select a query type"
            options={[
              { label: 'Select', name: 'select' },
              { label: 'Count', name: 'count' },
              { label: 'Update', name: 'update' },
            ]}
            fullWidth
            onChange={handleTypeChange}
            value={queryType}
          />

          {renderQueryForm()}

          {queryType && (
            <div className="my-3 bg-gray-50 dark:bg-dark-400 rounded-md p-3 mb-3">
              <Label>Query Prefix Statement</Label>
              <Code language="sql" rounded codeString={queryPrefix} />
            </div>
          )}

          <Heading className="py-2">Conditional Builder</Heading>

          <QueryBuilder
            fields={queryBuilderFields}
            onQueryChange={logQuery}
            getInputType={getInputType}
          />

          <div className="my-3 bg-gray-50 dark:bg-dark-400 rounded-md p-3 mb-8">
            <Label>Query Conditional Statement:</Label>
            <Code language="sql" rounded codeString={codeString} />
          </div>

          <Divider text="Output" />

          <div className="my-3 bg-gray-50 dark:bg-dark-400 rounded-md p-3 mt-8">
            <Label>Resulting Query:</Label>
            <Code
              language="sql"
              rounded
              codeString={clsx(queryPrefix, 'WHERE', codeString)}
            />
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group className="ml-3">
            <Button onClick={onClose}>Cancel</Button>

            <Button
              // onClick={onClose} // TODO: CHANGE ME
              variant="primary"
              type={queryType === 'update' ? 'submit' : 'button'}
              form={queryType === 'update' ? 'update-bulk-form' : undefined}
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
