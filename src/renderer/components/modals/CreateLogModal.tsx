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
import { Logs } from '../../../stores/index';
import Heading from '../ui/Heading';
import Text from '../ui/Text';
import CopyButton from '../buttons/CopyButton';
import clsx from 'clsx';

const tabPages = ['select', 'count', 'insert', 'update', 'delete', 'global'];

type LogProps = {
  // TODO: create type for errors
  // TODO: remove ?
  errors?: Logs;
};

function Log({ errors }: LogProps) {
  const disabled = !errors || !errors.insert || !errors.insert.length;
  const clearErrors = useStore((state) => state.clearErrors);

  return (
    <div className="-mb-6">
      <div className="mt-4 h-56 bg-gray-100 rounded-md overflow-scroll">
        <div
          className={clsx(
            disabled && 'h-full',
            'p-2 flex flex-col items-center justify-center'
          )}
        >
          {/* {renderLog()} */}
          <p>No errors exist in the log</p>
        </div>
      </div>

      <div className="mt-3 flex space-x-2 items-center justify-end">
        <Button
          disabled={disabled}
          variant="warning"
          // onClick={() => clearErrors('')}
        >
          Clear
        </Button>
        <CopyButton
          disabled={disabled}
          value={JSON.stringify(errors?.insert, null, 2) ?? ''}
        />
      </div>
    </div>
  );
}

function InsertErrorLog({ errors }: LogProps) {
  const disabled = !errors || !errors.insert || !errors.insert.length;

  const clearErrors = useStore((state) => state.clearErrors);

  function renderLog() {
    if (!errors || !errors.insert || !errors.insert.length)
      return <p>No errors exist in the log</p>;

    const { insert } = errors;

    return insert.map((error) => {
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
          onClick={() => clearErrors('insert')}
        >
          Clear
        </Button>
        <CopyButton
          disabled={disabled}
          value={JSON.stringify(errors?.insert, null, 2) ?? ''}
        />
      </div>
    </div>
  );
}

type Props = {
  initialTab?: number;
  fullWidth?: boolean;
  watch?: keyof Logs;
};

export default function CreateLogModal({
  initialTab,
  fullWidth,
  watch,
}: Props) {
  const [open, { on, off }] = useToggle(false);
  const [tab, setTab] = useState(initialTab ?? 0);

  const watchErrors: keyof Logs = watch ?? 'global';

  const errors = useStore((state) => state.errors, shallow);

  // TODO:
  function calculateHasDanger() {
    console.log(watchErrors, errors[watchErrors]);
    if (errors && errors[watchErrors].length) {
      return true;
    }

    return false;
  }

  function renderTab() {
    switch (tab) {
      // select errors
      case 0:
        return <Log errors={errors} />;

      // count errors
      case 1:
        return <Log errors={errors} />;

      // insert errors
      case 2:
        return <InsertErrorLog errors={errors} />;

      // update errors
      case 3:
        return <Log errors={errors} />;

      // delete errors
      case 4:
        return <Log errors={errors} />;

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
