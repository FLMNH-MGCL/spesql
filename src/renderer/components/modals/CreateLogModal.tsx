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

type LogProps = {
  // TODO: create type for errors
  // TODO: remove ?
  errors?: any[];
};

function Log({ errors }: LogProps) {
  return <div>{/* <CopyButton value="test" /> */}</div>;
}

type Props = {
  initialTab?: number;
  fullWidth?: boolean;
};

export default function CreateLogModal({ initialTab, fullWidth }: Props) {
  const [open, { on, off }] = useToggle(false);
  const [tab, setTab] = useState(initialTab ?? 0);

  const errors = useStore((state) => state.errors, shallow);

  // TODO:
  function calculateHasDanger() {
    return false;
  }

  function renderTab() {
    switch (tab) {
      // select errors
      case 0:
        return <Log errors={errors.select} />;

      // count errors
      case 1:
        return <Log errors={errors.count} />;

      // insert errors
      case 2:
        return <Log errors={errors.insert} />;

      // update errors
      case 3:
        return <Log errors={errors.update} />;

      // delete errors
      case 4:
        return <Log errors={errors.delete} />;

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