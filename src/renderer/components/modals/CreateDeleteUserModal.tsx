import React from 'react';
import { useStore } from '../../../stores';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { User } from '../UsersTable';
import useKeyboard from '../utils/useKeyboard';
import useQuery from '../utils/useQuery';

type Props = {
  open: boolean;
  onClose(): void;
  user: User;
};

// TODO: have onClose take in a refresh boolean
export default function CreateDeleteUserModal({ user, open, onClose }: Props) {
  const [{ deleteUser }] = useQuery();

  const currentUser = useStore((state) => state.user);

  useKeyboard('Escape', () => {
    onClose();
  });

  async function handleDelete() {
    if (!currentUser || currentUser.accessRole !== 'admin') {
      throw new Error('Non-admins should not have access to this screen!');
    } else {
      await deleteUser(user.id);
    }

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
