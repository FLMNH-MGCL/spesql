import React from 'react';
import DeleteButton from '../buttons/DeleteButton';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import useQuery from '../utils/useQuery';
import useToggle from '../utils/useToggle';

type Props = {
  table: string;
};

export default function CreateDeleteTableModal({ table }: Props) {
  const [open, { on, off }] = useToggle(false);

  const { deleteTable } = useQuery();

  console.log(table, deleteTable);

  // function handleDelete() {}

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Delete Table">todo</Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Close</Button>
            <Button variant="primary">Submit</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <DeleteButton onClick={on} />
    </React.Fragment>
  );
}
