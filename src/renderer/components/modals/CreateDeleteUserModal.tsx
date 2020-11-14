import React from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { User } from '../UsersTable';
import useKeyboard from '../utils/useKeyboard';

type Props = {
  open: boolean;
  onClose(): void;
  user: User;
};

// TODO: have onClose take in a refresh boolean
export default function CreateDeleteUserModal({ user, open, onClose }: Props) {
  useKeyboard('Escape', () => {
    onClose();
  });

  function handleDelete() {
    console.log('Woah there, I cant do that disasterous thing yet');

    onClose();
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="tiny">
        <Modal.Content title="Are you sure?">
          Deleting the user @{user.username} cannot be undone
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleDelete}>
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
