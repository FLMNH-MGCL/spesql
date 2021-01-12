import React from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../ui/Button';

import Form, { Values } from '../ui/Form';
import { accessRoles } from '../utils/constants';
import useToggle from '../utils/useToggle';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import { useNotify } from '../utils/context';
import { User } from '../UsersTable';

type Props = {
  onSubmit(values: Values): void;
  userInfo?: User;
};

function PasswordField() {
  const { notify } = useNotify();
  const { setValue } = useFormContext();

  const [visible, { toggle }] = useToggle(false);

  const [fetching, { on, off }] = useToggle(false);

  async function generateSecurePassword() {
    on();

    const res = await axios
      .get(BACKEND_URL + '/api/admin/user/generatePassword')
      .catch((error) => error.response);

    if (res.status === 200) {
      const { data } = res;
      setValue('password', data);
    } else {
      notify({
        title: 'Error Occurred',
        message:
          'A server error occurred when trying to generate a secure password. Please check the logs',
        level: 'error',
      });
    }

    off();
  }

  return (
    <Form.Group flex>
      <Form.Input
        name="password"
        placeholder={visible ? 'Password' : '••••••••'}
        label="Password"
        type={visible ? 'text' : 'password'}
        fullWidth
        icon={visible ? 'passwordVisible' : 'password'}
        iconClick={toggle}
      />

      <div className="flex items-end">
        {/* TODO: */}
        <Button
          type="button"
          onClick={generateSecurePassword}
          loading={fetching}
          variant="warning"
        >
          Generate
        </Button>
      </div>
    </Form.Group>
  );
}

export default function UserInfoForm({ onSubmit, userInfo }: Props) {
  return (
    <Form onSubmit={onSubmit} id="user-info-form">
      <Form.Group flex>
        <Form.Input
          name="fullName"
          placeholder="First Last"
          defaultValue={userInfo?.name}
          label="Full Name"
          fullWidth
          icon="user"
        />

        <Form.Input
          name="username"
          placeholder="Username"
          defaultValue={userInfo?.username}
          label="Username"
          fullWidth
          icon="atMention"
        />
      </Form.Group>

      <PasswordField />

      <Form.Group>
        <Form.Select
          name="role"
          placeholder="Access Role"
          defaultValue={userInfo?.role}
          label="Access Role"
          options={accessRoles}
        />
      </Form.Group>
    </Form>
  );
}
