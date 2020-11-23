import React from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../ui/Button';

import Form, { Values } from '../ui/Form';
import { accessRoles } from '../utils/constants';
import useToggle from '../utils/useToggle';

type Props = {
  onSubmit(values: Values): void;
};

function PasswordField() {
  const { setValue } = useFormContext();

  const [visible, { toggle }] = useToggle(false);

  async function generateSecurePassword() {
    // get secure password
    // then setValue
    setValue('password', 'TODO: implement me');
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
        <Button type="button" onClick={generateSecurePassword}>
          Generate
        </Button>
      </div>
    </Form.Group>
  );
}

export default function CreateUserForm({ onSubmit }: Props) {
  return (
    <Form onSubmit={onSubmit} id="create-user-form">
      <Form.Group flex>
        <Form.Input
          name="fullName"
          placeholder="First Last"
          label="Full Name"
          fullWidth
          icon="user"
        />

        <Form.Input
          name="username"
          placeholder="Username"
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
          label="Access Role"
          options={accessRoles}
        />
      </Form.Group>
    </Form>
  );
}
