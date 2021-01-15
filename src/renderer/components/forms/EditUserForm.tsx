import { Form, FormSubmitValues } from '@flmnh-mgcl/ui';
import React from 'react';
import { User } from '../UsersTable';

type Props = {
  user: User;
  onSubmit(values: FormSubmitValues): void;
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
