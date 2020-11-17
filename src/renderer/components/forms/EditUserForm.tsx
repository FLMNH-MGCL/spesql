import React from 'react';

import Form, { Values } from '../ui/Form';

// import { useStore } from '../../../stores';
import { User } from '../UsersTable';

type Props = {
  user: User;
  onSubmit(values: Values): void;
};

// TODO
// @ts-ignore
export default function EditUserForm({ user, onSubmit }: Props) {
  //   const { user } = useStore((store) => ({ user: store.user }));

  return (
    <Form onSubmit={onSubmit} id="edit-user-form">
      TODO: Make me
    </Form>
  );
}
