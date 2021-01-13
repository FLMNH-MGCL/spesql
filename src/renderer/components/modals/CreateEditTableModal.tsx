import React from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import useQuery from '../utils/useQuery';
import useToggle from '../utils/useToggle';
import EditTableForm from '../forms/EditTableForm';
import { Values } from '../ui/Form';
import Text from '../ui/Text';

type Props = {
  table: string;
  refresh(): void;
};

export default function CreateEditTableModal({ table, refresh }: Props) {
  const [open, { on, off }] = useToggle(false);

  const { updateTable } = useQuery();

  async function handleEdit(values: Values) {
    const { newName } = values;

    // TODO: notify
    if (!newName || !newName.length) {
      return;
    } else if (newName === table) {
      return;
    }

    const res = await updateTable(table, newName);

    if (res && res.status === 201) {
      refresh();
      off();
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Edit Table">
          <Text className="text-gray-500 py-1">
            Everything apart from the table name is prestructured, and is
            therefore the only editable item
          </Text>
          <EditTableForm table={table} onSubmit={handleEdit} />
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Close</Button>
            <Button variant="primary" type="submit" form="edit-table-form">
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <Button variant="outline" rounded onClick={on}>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </Button>
    </React.Fragment>
  );
}
