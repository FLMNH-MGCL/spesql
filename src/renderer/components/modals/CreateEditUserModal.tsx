import React from 'react';
import EditUserForm from '../forms/EditUserForm';
import Button from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import { User } from '../UsersTable';
import useKeyboard from '../utils/useKeyboard';

type Props = {
  open: boolean;
  onClose(): void;
  user: User;
};

// TODO: will need this to be paginated, multistep form
export default function CreateEditUserModal({ user, open, onClose }: Props) {
  useKeyboard('Escape', () => {
    onClose();
  });

  function handleEdit(values: Values) {
    console.log(values);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="small">
        <Modal.Content title={`Editing @${user.username}`}>
          <EditUserForm user={user} onSubmit={handleEdit} />
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" form="edit-user-form">
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      {/* <Dropdown.Item text="Select" onClick={on} /> */}
    </React.Fragment>
  );
}
