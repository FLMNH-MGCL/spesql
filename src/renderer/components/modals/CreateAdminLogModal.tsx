import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import WarningButton from '../buttons/WarningButton';
import useKeyboard from '../utils/useKeyboard';
import useToggle from '../utils/useToggle';
import { Button, Input, Modal, Tabs } from '@flmnh-mgcl/ui';
import {
  AdminErrors,
  AdminUserError,
  useAdminStore,
} from '../../../stores/admin';
import { AdminErrorLogRenderer } from '../ErrorRenderers';
import CopyButton from '../buttons/CopyButton';

type AdminLogProps = {
  errors?: AdminErrors;
  logName: keyof AdminErrors;
};

function AdminErrorLog({ errors, logName }: AdminLogProps) {
  const disabled = !errors || !errors[logName] || !errors[logName]?.length;
  const clearErrors = useAdminStore((state) => state.clearErrors);

  const [filter, setFilter] = useState<string>('');

  function filterLog(log: AdminUserError[]) {
    return log.filter((values) =>
      Object.values(values)
        .toString()
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  }

  useEffect(() => {}, [filter]);

  return (
    <div className="-mb-6">
      <div className="mt-4">
        {!errors || !errors[logName] || !errors[logName]?.length ? (
          <div className="flex items-center justify-center h-64 bg-gray-100  dark:bg-dark-500 dark:text-dark-200 rounded-md shadow-sm">
            <p>No errors exist in the log</p>
          </div>
        ) : (
          <div className="h-64 rounded-md bg-gray-100 dark:bg-dark-600 shadow-sm">
            <AdminErrorLogRenderer list={filterLog(errors[logName])} />
          </div>
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
            value={JSON.stringify(errors ? errors[logName] : {}, null, 2) ?? ''}
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

type Props = {
  initialTab?: number;
  fullWidth?: boolean;
};

export default function CreateAdminLogModal({ initialTab, fullWidth }: Props) {
  const [open, { on, off }] = useToggle(false);
  const [tab, setTab] = useState(initialTab ?? 0);

  const errors = useAdminStore((state) => state.adminErrors, shallow);

  // TODO:
  function calculateHasDanger() {
    if (errors && (errors.tableErrors?.length || errors.userErrors?.length)) {
      return true;
    }

    return false;
  }

  function renderTab() {
    switch (tab) {
      // User Operations
      case 0:
        // return <Log errors={errors} />;
        return <AdminErrorLog errors={errors} logName="userErrors" />;
      // table operations
      case 1:
        // return <Log errors={errors} />;
        return <AdminErrorLog errors={errors} logName="tableErrors" />;

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
        <Modal.Content title="Admin Error Logs">
          <Tabs
            fullWidth
            tabs={['User Operations', 'Table Operations']}
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
