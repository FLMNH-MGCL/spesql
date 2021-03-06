import React, { useEffect, useState } from 'react';
import CreateLogModal from './CreateLogModal';
import CreateHelpModal from './CreateHelpModal';
import QueryBuilder from '../QueryBuilder';
import { formatQuery } from 'react-querybuilder';
import { queryBuilderFields } from '../utils/constants';
import Select from '../querybuilder/Select';
import SelectForm from '../querybuilder/forms/SelectForm';
import clsx from 'clsx';
import UpdateForm from '../querybuilder/forms/UpdateForm';
import mysql from 'mysql';
import { useNotify } from '../utils/context';
import numberParser from 'number-to-words';
import { determineAndRunFieldValidator } from '../../functions/validation';
import useQuery from '../utils/useQuery';
import { useStore } from '../../../stores';
import shallow from 'zustand/shallow';
import {
  Button,
  Code,
  Divider,
  FormSubmitValues,
  Heading,
  Label,
  Modal,
  Spinner,
  Statistic,
  Text,
} from '@flmnh-mgcl/ui';

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

type LogModalConfig = {
  initialTab: number;
  watch: 'select' | 'count' | 'update';
};

export default function CreateQueryBuilderModal({ open, onClose }: Props) {
  const { notify } = useNotify();
  const { advancedUpdate, logUpdate, advancedSelect, advancedCount } =
    useQuery();

  const toggleLoading = useStore((state) => state.toggleLoading);
  const loading = useStore((state) => state.loading, shallow);

  const [countReturn, setCountReturn] = useState<number>();

  const [codeString, setCodeString] = useState<string>('');
  const [queryPrefix, setQueryPrefix] = useState<string>('');
  const [queryClause, setQueryClause] =
    useState<BasicQueryClause>(defaultClause);

  const [logModalConfig, setLogModalConfig] = useState<LogModalConfig>({
    initialTab: 0,
    watch: 'select',
  });

  const { queryType, sets } = queryClause;

  function handleClose() {
    setQueryClause(defaultClause);
    setQueryPrefix('');
    setCodeString('');
    onClose();
  }

  // REMOVING ESCAPE CLOSE --> too many times I have accidentally closed this modal, and
  // given how many things there are to configure I have decided that if you want to close
  // this modal just click close or outside the bounds.

  // CLEANUP EFFECT
  useEffect(() => {
    return () => {
      setCodeString('');
      setQueryPrefix('');
      setQueryClause(defaultClause);
      setLogModalConfig({
        initialTab: 0,
        watch: 'select',
      });
      setCountReturn(undefined);
    };
  }, [open]);

  function logQuery(query: any) {
    const formatted = formatQuery(query, 'sql');

    if (typeof formatted === 'string') {
      setCodeString(formatted);
    } else {
      const { sql } = formatted;

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

  async function handleUpdateSubmit(values: FormSubmitValues) {
    // double check validation
    // this should not pick up any errors, as validation is ran on submit...
    // TODO: should I remove this double checking??
    const { setCount } = values;

    if (setCount < 1) {
      notify({
        title: 'Invalid Set Statements',
        message: 'You must specify at least one set statement',
        level: 'error',
      });

      return;
    }

    let updates: any = {};

    for (let i = 0; i < setCount; i++) {
      const current = numberParser.toWords(i);

      const field = values[`setField_${current}`];
      const value = values[`setValue_${current}`];

      updates[field] = value;

      const isValid = determineAndRunFieldValidator(field, value);
      if (!isValid || typeof isValid === 'string') {
        notify({
          title: 'Validation Error',
          message:
            typeof isValid === 'string'
              ? isValid
              : `Validation error for ${field}, with value ${value}`,
          level: 'error',
        });
        return;
      }
    }

    // all is good! conditionals might be broken but that is okay send to server still
    const queryString = clsx(queryPrefix, 'WHERE', codeString);

    const updateRet = await advancedUpdate(queryString);

    if (updateRet) {
      // TODO: handle message from ret
      const { queryString } = updateRet;

      await logUpdate(queryString, updates, queryClause.databaseTable, null);
    }
  }

  async function handleSelectQuery() {
    toggleLoading(true);
    const queryString = clsx(queryPrefix, 'WHERE', codeString);

    if (queryString) {
      await advancedSelect(queryString, queryClause.databaseTable, onClose);
    }
    toggleLoading(false);
  }

  async function handleCountQuery() {
    toggleLoading(true);
    const queryString = clsx(queryPrefix, 'WHERE', codeString);

    if (queryString) {
      await advancedCount(queryString, setCountReturn);
    }

    toggleLoading(false);
  }

  function handleSendQuery() {
    switch (queryType) {
      case 'select': {
        handleSelectQuery();
        break;
      }
      case 'count': {
        handleCountQuery();
        break;
      }
      default: {
        return;
      }
    }
  }

  function getLogTab() {
    switch (queryType) {
      case 'count':
        return 1;
      case 'update':
        return 3;
      default:
        return 0;
    }
  }

  useEffect(() => {
    buildQueryStatement(queryClause.queryType);
  }, [queryClause]);

  useEffect(() => {
    if (countReturn !== undefined) {
      setCountReturn(undefined);
    }

    setLogModalConfig({
      initialTab: getLogTab(),
      watch: queryClause.queryType as any,
    });
  }, [queryClause.queryType]);

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
          <UpdateForm
            onChange={handleControlledChange}
            sets={sets ?? []}
            onSubmit={handleUpdateSubmit}
          />
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
            placeholder="Select a query type to render a corresponding form"
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

          <div className="my-3 bg-gray-50 dark:bg-dark-400 rounded-md p-3 mt-8 mb-8">
            <Label>Resulting Query:</Label>
            <Code
              language="sql"
              rounded
              codeString={clsx(queryPrefix, 'WHERE', codeString)}
            />
          </div>

          {queryType === 'count' && (
            <React.Fragment>
              <Divider text="Results" />
              <div className="relative bg-gray-50 dark:bg-dark-600 rounded-lg w-full p-3 mt-8 min-h-32">
                {!loading && <Statistic value={countReturn} unit="specimen" />}

                <Spinner active={loading} />
              </div>
            </React.Fragment>
          )}
        </Modal.Content>

        <Modal.Footer>
          <Button.Group className="ml-3">
            <Button onClick={onClose}>Cancel</Button>

            <Button
              onClick={handleSendQuery}
              variant="primary"
              type={queryType === 'update' ? 'submit' : 'button'}
              form={queryType === 'update' ? 'update-bulk-form' : undefined}
              loading={loading}
            >
              Confirm
            </Button>
          </Button.Group>

          <div className="flex space-x-2 flex-1">
            <CreateLogModal
              initialTab={logModalConfig.initialTab}
              watch={logModalConfig.watch}
            />
            <CreateHelpModal variant="queryBuilder" />
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
