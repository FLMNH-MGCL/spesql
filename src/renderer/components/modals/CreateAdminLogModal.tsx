import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import WarningButton from '../buttons/WarningButton';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Tabs from '../ui/Tabs';
import useKeyboard from '../utils/useKeyboard';
import useToggle from '../utils/useToggle';
import { Logs } from '../../../stores/logging';

// TODO: make this ADMIN SPECIFIC

// type LogProps = {
//   errors?: Logs;
// };

// function Log({ errors }: LogProps) {
//   const disabled = !errors || !errors.insert || !errors.insert.length;
//   // const clearErrors = useStore((state) => state.clearErrors);

//   return (
//     <div className="-mb-6">
//       <div className="mt-4 h-56 bg-gray-100 rounded-md overflow-scroll">
//         <div
//           className={clsx(
//             disabled && 'h-full',
//             'p-2 flex flex-col items-center justify-center'
//           )}
//         >
//           {/* {renderLog()} */}
//           <p>No errors exist in the log</p>
//         </div>
//       </div>

//       <div className="mt-3 flex space-x-2 items-center justify-end">
//         <Button
//           disabled={disabled}
//           variant="warning"
//           // onClick={() => clearErrors('')}
//         >
//           Clear
//         </Button>
//         <CopyButton
//           disabled={disabled}
//           value={JSON.stringify(errors?.insert, null, 2) ?? ''}
//         />
//       </div>
//     </div>
//   );
// }

type Props = {
  initialTab?: number;
  fullWidth?: boolean;
  watch?: keyof Logs;
};

export default function CreateAdminLogModal({
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
    // console.log(watchErrors, errors[watchErrors]);
    if (errors && errors[watchErrors].length) {
      return true;
    }

    return false;
  }

  function renderTab() {
    switch (tab) {
      // User Operations
      case 0:
        // return <Log errors={errors} />;
        return <div>TODO</div>;
      // table operations
      case 1:
        // return <Log errors={errors} />;
        return <div>TODO</div>;

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
