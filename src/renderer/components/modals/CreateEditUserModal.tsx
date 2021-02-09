import { Button, FormSubmitValues, Modal, Text } from '@flmnh-mgcl/ui';
import React from 'react';
import UserInfoForm from '../forms/UserInfoForm';
import { User } from '../UsersTable';
import { useNotify } from '../utils/context';
import useKeyboard from '../utils/useKeyboard';
import useLogError from '../utils/useLogError';
import useQuery from '../utils/useQuery';

type Props = {
  open: boolean;
  onClose(): void;
  user: User;
  refresh(): void;
};

// TODO: will need this to be paginated, multistep form
export default function CreateEditUserModal({
  user,
  open,
  onClose,
  refresh,
}: Props) {
  const { notify } = useNotify();

  const { editUser } = useQuery();

  const { logAdminUserError } = useLogError();

  useKeyboard('Escape', () => {
    onClose();
  });

  async function handleSubmit(values: FormSubmitValues) {
    // toggle();

    const { fullName, username, password, role } = values;

    let updatedUser: any = {};

    if (fullName !== user.name) {
      updatedUser.name = fullName;
    }

    if (username !== user.username) {
      updatedUser.username = username;
    }

    if (role && role !== user.role) {
      updatedUser.role = role;
    }

    if (!Object.keys(updatedUser).length && (!password || !password.length)) {
      notify({
        title: 'No Changes Detected',
        message: 'You must change at least one field to issue an update',
        level: 'error',
      });

      return;
    }

    const ret = await editUser(updatedUser, user.id, password);

    if (ret) {
      const { status, data } = ret;
      if (status !== 201) {
        logAdminUserError({ status, data: data.err });
      }
    } else {
      refresh();
      onClose();
    }

    // toggle();
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="small">
        <Modal.Content title={`Editing @${user.username}`}>
          <Text className="pb-2">
            Please note: only altered fields will be updated. If you wish to
            change the password, please keep in mind it can not be retrieved
            again if forgotten.
          </Text>
          <UserInfoForm userInfo={user} onSubmit={handleSubmit} />
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" form="user-info-form">
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      {/* <Dropdown.Item text="Select" onClick={on} /> */}
    </React.Fragment>
  );
}
