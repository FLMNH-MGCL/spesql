import { Button, Modal } from '@flmnh-mgcl/ui';
import React from 'react';
import TableLog from '../TableLog';
import useToggle from '../utils/useToggle';

export default function CreateTableLogModal({ table }: { table: string }) {
  const [open, { on, off }] = useToggle(false);

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="massive">
        <Modal.Content title={`${table} Logs`}>
          <TableLog table={table} />
        </Modal.Content>

        <Modal.Footer>
          <Button onClick={off}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Button onClick={on}>See Logs</Button>
    </React.Fragment>
  );
}
