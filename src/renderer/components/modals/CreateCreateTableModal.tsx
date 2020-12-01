import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import useToggle from '../utils/useToggle';

export default function CreateCreateTableModal() {
  const [open, { on, off }] = useToggle(false);
  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Create Table">todo</Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Close</Button>
            <Button variant="primary">Submit</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <Badge label="Create" onClick={on} />
    </React.Fragment>
  );
}
