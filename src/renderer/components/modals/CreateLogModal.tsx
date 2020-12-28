import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
// import CopyButton from '../buttons/CopyButton';
import WarningButton from '../buttons/WarningButton';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Tabs from '../ui/Tabs';
import useKeyboard from '../utils/useKeyboard';
import useToggle from '../utils/useToggle';
import Heading from '../ui/Heading';
import Text from '../ui/Text';
import CopyButton from '../buttons/CopyButton';
import clsx from 'clsx';
import { BulkInsertError, LoggingError, Logs } from '../../../stores/table';

// const tabPages = ['select', 'count', 'insert', 'update', 'delete', 'global'];

type LogProps = {
  errors?: Logs;
  logName: keyof Omit<Logs, 'bulkInsert'>;
};

function Log({ errors, logName }: LogProps) {
  const disabled = !errors || !errors[logName] || !errors[logName].length;
  const clearErrors = useStore((state) => state.clearErrors);

  function renderLog() {
    if (!errors || !errors[logName] || !errors[logName].length)
      return <p>No errors exist in the log</p>;

    return errors[logName].map((error: LoggingError, i: number) => {
      const { code, field, message, sql } = error;

      // TODO: maybe use clsx for this, might be cleaner solution

      const leftSide =
        field && code
          ? `${field}, CODE: ${code} - `
          : field && !code
          ? field + ' - '
          : !field && code
          ? code + ' - '
          : 'ERROR: ';

      return (
        <div className="py-2 w-full" key={i}>
          <div>
            {sql && <Heading>Attempted Query: {sql}</Heading>}
            <div className="flex space-x-2">
              <Text>{`${leftSide}${message}`}</Text>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="-mb-6">
      <div className="mt-4 h-56 bg-gray-100 rounded-md overflow-scroll">
        <div
          className={clsx(
            disabled && 'h-full',
            'p-2 flex flex-col items-center justify-center'
          )}
        >
          {renderLog()}
        </div>
      </div>

      <div className="mt-3 flex space-x-2 items-center justify-end">
        <Button
          disabled={disabled}
          variant="warning"
          onClick={() => clearErrors(logName)}
        >
          Clear
        </Button>
        <CopyButton
          disabled={disabled}
          value={(errors && JSON.stringify(errors[logName], null, 2)) ?? ''}
        />
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

  function renderLog() {
    if (!errors || !errors.bulkInsert || !errors.bulkInsert.length)
      return <p>No errors exist in the log</p>;

    const { bulkInsert } = errors;

    return bulkInsert.map((error: BulkInsertError) => {
      const csvRow = error.index + 2;

      return (
        <div className="py-2 w-full" key={csvRow}>
          <Heading>Error(s) @ Row {csvRow}:</Heading>
          <div>
            {error.errors.map(({ field, message }) => {
              return (
                <div className="flex space-x-2" key={field + message}>
                  <Text>{`  - ${field}:`}</Text>
                  <Text>
                    {typeof message !== 'boolean' ? message : 'INVALID'}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="-mb-6">
      <div className="mt-4 h-56 bg-gray-100 rounded-md overflow-scroll">
        <div
          className={clsx(
            disabled && 'h-full',
            'p-2 flex flex-col items-center justify-center'
          )}
        >
          {renderLog()}
        </div>
      </div>

      <div className="mt-3 flex space-x-2 items-center justify-end">
        <Button
          disabled={disabled}
          variant="warning"
          onClick={() => clearErrors('bulkInsert')}
        >
          Clear
        </Button>
        <CopyButton
          disabled={disabled}
          value={JSON.stringify(errors?.bulkInsert, null, 2) ?? ''}
        />
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

  // TODO:
  function calculateHasDanger() {
    // console.log(watchErrors, errors[watchErrors]);
    if (errors && errors[watchErrors]?.length) {
      return true;
    }

    return false;
  }

  function renderTab() {
    // console.log('LOG TAB:', tab);
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
