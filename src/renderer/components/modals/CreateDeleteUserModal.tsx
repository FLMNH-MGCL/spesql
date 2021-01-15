import { Button, Modal, Text } from '@flmnh-mgcl/ui';
import React from 'react';
import { useStore } from '../../../stores';
import { User } from '../UsersTable';
import { useNotify } from '../utils/context';
import useKeyboard from '../utils/useKeyboard';
import useQuery from '../utils/useQuery';

type Props = {
  open: boolean;
  onClose(): void;
  user: User;
  refreshUsers(): void;
};

// TODO: have onClose take in a refresh boolean
export default function CreateDeleteUserModal({
  user,
  open,
  onClose,
  refreshUsers,
}: Props) {
  const { deleteUser } = useQuery();
  const { notify } = useNotify();

  const currentUser = useStore((state) => state.user);

  useKeyboard('Escape', () => {
    onClose();
  });

  async function handleDelete() {
    if (!currentUser || currentUser.accessRole !== 'admin') {
      throw new Error('Non-admins should not have access to this screen!');
    } else {
      const success = await deleteUser(user.id);

      if (success) {
        notify({
          title: 'Success',
          message: `${user.username} is now in the void`,
          level: 'success',
        });

        refreshUsers();
      }
    }

    onClose();
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="tiny">
        <Modal.Content title="Are you sure?">
          <Text>Deleting the user @{user.username} cannot be undone</Text>
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
