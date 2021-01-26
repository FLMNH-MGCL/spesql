import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import WarningButton from '../buttons/WarningButton';
import useKeyboard from '../utils/useKeyboard';
import useToggle from '../utils/useToggle';
import CopyButton from '../buttons/CopyButton';
import { BulkInsertError, LoggingError, Logs } from '../../../stores/logging';
import { Button, Code, Modal, Tabs, Input } from '@flmnh-mgcl/ui';
// import JsonListRenderer from '../JsonListRenderer';

// TODO: Fix performance issues with rendering LARGE error log strings!!!

type LogProps = {
  errors?: Logs;
  logName: keyof Omit<Logs, 'bulkInsert'>;
};

function Log({ errors, logName }: LogProps) {
  const disabled = !errors || !errors[logName] || !errors[logName].length;
  const clearErrors = useStore((state) => state.clearErrors);

  const [filter, setFilter] = useState<string>('');
  const [logString, setLogString] = useState<string>('');

  function filterLog(log: LoggingError[]) {
    return log.filter((values) =>
      Object.values(values)
        .toString()
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  }

  function generateLogString() {
    if (!errors || !errors[logName] || !errors[logName].length) return;

    const log = errors[logName];

    const filteredLog = filter ? filterLog(log) : log;

    const logStr = JSON.stringify(filteredLog, null, 3);

    setLogString(logStr);
  }

  useEffect(() => generateLogString());

  return (
    <div className="-mb-6">
      <div className="mt-4">
        {disabled ? (
          <div className="flex items-center justify-center h-64 bg-gray-100  dark:bg-dark-500 dark:text-dark-200 rounded-md ">
            <p>No errors exist in the log</p>
          </div>
        ) : (
          <Code
            rounded
            maxHeight="16rem"
            language="json"
            codeString={logString}
          />
        )}
      </div>

      <div className="mt-3 flex space-x-2 items-center justify-between">
        <div className="flex items-center space-x-3 w-1/2">
          <Input
            fullWidth
            value={filter}
            onChange={(e: any) => setFilter(e.currentTarget.value)}
            placeholder="Filter error log"
            disabled={disabled}
          />
          <CopyButton
            disabled={disabled}
            value={JSON.stringify(errors?.bulkInsert, null, 2) ?? ''}
          />
        </div>
        <Button
          disabled={disabled}
          variant="warning"
          onClick={() => clearErrors(logName)}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

type BulkLogProps = {
  errors?: Logs;
  logName: keyof Logs;
};

function InsertErrorLog({ errors }: BulkLogProps) {
  const disabled = !errors || !errors.bulkInsert || !errors.bulkInsert.length;

  const clearErrors = useStore((state) => state.clearErrors);

  const [filter, setFilter] = useState<string>('');
  const [logString, setLogString] = useState<string>('');

  function filterLog(log: BulkInsertError[]) {
    let newLog: any = [];

    log.forEach((val) => {
      const { errors, index, row } = val;
      let nestedErrors = errors.filter((error) =>
        Object.values(error)
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase())
      );

      if (nestedErrors.length) {
        newLog.push({ index, row, errors: nestedErrors });
      }
    });

    return newLog;
  }

  function generateLogString() {
    if (!errors || !errors.bulkInsert || !errors.bulkInsert.length) return;

    const { bulkInsert } = errors;

    const filteredLog = filter ? filterLog(bulkInsert) : bulkInsert;

    const log = JSON.stringify(filteredLog, null, 3);

    setLogString(log);
  }

  useEffect(() => generateLogString());

  return (
    <div className="-mb-6">
      <div className="mt-4">
        {!errors || !errors.bulkInsert || !errors.bulkInsert.length ? (
          <div className="flex items-center justify-center h-64 bg-gray-100  dark:bg-dark-500 dark:text-dark-200 rounded-md ">
            <p>No errors exist in the log</p>
          </div>
        ) : (
          // <div className="h-64 rounded-md overflow-scroll">
          //   <JsonListRenderer />
          // </div>
          <Code
            rounded
            maxHeight="16rem"
            language="json"
            codeString={logString}
          />
          // <div className="h-64 rounded-md overflow-scroll">
          //   <JsonListRenderer list={filterLog(errors.bulkInsert)} />
          // </div>
        )}
      </div>

      <div className="mt-3 flex space-x-2 items-center justify-between">
        <div className="flex items-center space-x-3 w-1/2">
          <Input
            fullWidth
            value={filter}
            onChange={(e: any) => setFilter(e.currentTarget?.value)}
            placeholder="Filter error log"
            disabled={disabled}
          />
          <CopyButton
            disabled={disabled}
            value={JSON.stringify(errors?.bulkInsert, null, 2) ?? ''}
          />
        </div>
        <Button
          disabled={disabled}
          variant="warning"
          onClick={() => clearErrors('bulkInsert')}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

type Props = {
  initialTab?: number;
  variant?: 'batch' | 'single';
  fullWidth?: boolean;
  watch?: keyof Logs;
};

export default function CreateLogModal({
  initialTab,
  fullWidth,
  watch,
  variant = 'batch',
}: Props) {
  const [open, { on, off }] = useToggle(false);
  const [tab, setTab] = useState(initialTab ?? 0);

  const watchErrors: keyof Logs = watch ?? 'global';

  const errors = useStore((state) => state.errors, shallow);

  useEffect(() => {
    if (initialTab !== undefined && initialTab !== tab) {
      setTab(initialTab);
    }
  }, [initialTab]);

  // TODO:
  function calculateHasDanger() {
    // console.log(watchErrors, errors[watchErrors]);
    if (errors && errors[watchErrors]?.length) {
      return true;
    }

    return false;
  }

  function renderTab() {
    switch (tab) {
      // select errors
      case 0:
        return <Log errors={errors} logName="select" />;

      // count errors
      case 1:
        return <Log errors={errors} logName="count" />;

      // insert errors
      case 2:
        return variant === 'batch' ? (
          <InsertErrorLog errors={errors} logName="bulkInsert" />
        ) : (
          <Log errors={errors} logName="singleInsert" />
        );

      // update errors
      case 3: // TODO:
        return <Log errors={errors} logName="update" />;

      // delete errors
      case 4:
        return <Log errors={errors} logName="delete" />;

      default:
        return null;
    }
  }

  useKeyboard('Escape', () => {
    off();
  });

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="large">
        <Modal.Content title="Error Logs">
          <Tabs
            fullWidth
            tabs={['Select', 'Count', 'Insert', 'Update', 'Delete']}
            selectedIndex={tab}
            onChange={setTab}
          />

          <div className="py-8">{renderTab()}</div>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Close</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      {fullWidth ? (
        <div className="flex-1">
          <WarningButton danger={calculateHasDanger()} onClick={on} />
        </div>
      ) : (
        <WarningButton danger={calculateHasDanger()} onClick={on} />
      )}
    </React.Fragment>
  );
}
