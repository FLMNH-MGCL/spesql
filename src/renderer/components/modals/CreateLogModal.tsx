import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import WarningButton from '../buttons/WarningButton';
import Button, { ButtonGroup } from '../ui/Button';
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
  return <div></div>;
}

type Props = {
  initialTab?: number;
};

export default function CreateLogModal({ initialTab }: Props) {
  const [open, { on, off }] = useToggle(false);
  const [tab, setTab] = useState(initialTab ?? 0);

  const errors = useStore((state) => state.errors, shallow);

  // TODO:
  function calculateHasDanger() {
    return false;
  }

  // TODO: render with correct errors based on index
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
            tabs={['Select', 'Count', 'Insert', 'Update', 'Delete']}
            selectedIndex={tab}
            onChange={setTab}
          />

          <div className="py-8">{renderTab()}</div>
        </Modal.Content>

        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={off}>Close</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>

      {initialTab !== undefined ? (
        <div className="flex-1">
          <WarningButton danger={calculateHasDanger()} onClick={on} />
        </div>
      ) : (
        <WarningButton danger={calculateHasDanger()} onClick={on} />
      )}
    </React.Fragment>
  );
}
