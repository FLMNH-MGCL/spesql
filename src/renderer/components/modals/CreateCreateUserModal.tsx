import React from 'react';
import CircleButton from '../buttons/CircleButton';
import CreateUserForm from '../forms/CreateUserForm';
import Button from '../ui/Button';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import useQuery from '../utils/useQuery';
import useToggle from '../utils/useToggle';

type Props = {
  refresh(): void;
};

export default function CreateCreateUserModal({ refresh }: Props) {
  const [open, { on, off }] = useToggle(false);
  const [loading, { toggle }] = useToggle(false);

  const [{ createUser }] = useQuery();

  async function handleSubmit(values: Values) {
    toggle();

    const { fullName, username, password, role } = values;

    const newUser = {
      name: fullName,
      username,
      password,
      access_role: role,
    };

    const ret = await createUser(newUser);

    // TODO:
    if (ret) {
      const { status, data } = ret;
      console.log(status, data);
    } else {
      refresh();
      off();
    }

    toggle();
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Create User">
          <CreateUserForm onSubmit={handleSubmit} />
        </Modal.Content>
        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Cancel</Button>
            <Button
              type="submit"
              form="create-user-form"
              variant="primary"
              loading={loading}
            >
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <CircleButton
        onClick={on}
        icon={
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        }
      />
    </React.Fragment>
  );
}
