import React from 'react';
import DeleteButton from '../buttons/DeleteButton';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Text from '../ui/Text';
import useQuery from '../utils/useQuery';
import useToggle from '../utils/useToggle';

type Props = {
  table: string;
  refresh(): void;
};

export default function CreateDeleteTableModal({ table, refresh }: Props) {
  const [open, { on, off }] = useToggle(false);

  const { deleteTable } = useQuery();

  async function handleDelete() {
    const res = await deleteTable(table);
    console.log(res);

    if (res && res.status === 201) {
      refresh();
      off();
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Delete Table - Are you sure?">
          <Text>This action cannot be undone!</Text>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Close</Button>
            <Button variant="primary" onClick={handleDelete}>
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <DeleteButton onClick={on} />
    </React.Fragment>
  );
}
