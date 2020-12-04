import React from 'react';
import { useStore } from '../../../stores';
import { BACKEND_URL } from '../../types';
import Form, { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import Text from '../ui/Text';
import axios from 'axios';
import { useNotify } from '../utils/context';
import shallow from 'zustand/shallow';
import Button from '../ui/Button';

export default function CreateVerifySessionModal() {
  const { notify } = useNotify();

  const { login, expiredSession, user } = useStore(
    (state) => ({
      login: state.login,
      expiredSession: state.expiredSession,
      user: state.user,
    }),
    shallow
  );

  async function handleSumbit(values: Values) {
    if (!values) {
      return 'This form is required';
    }

    const { username, password } = values;

    if (!username || !password) {
      return 'You must enter your username and password';
    }

    const loginResponse = await axios
      .post(BACKEND_URL + '/api/login', {
        username,
        password,
      })
      .catch((error) => error.response);

    if (loginResponse.status === 200) {
      if (user) {
        const { id, fullName, username, accessRole } = user;
        // login will also close the modal since I loaded it shallowly
        login(id, fullName, username, accessRole);
      } else {
        throw new Error('Expired session with NULL user? Bug!');
      }
    } else {
      notify({
        title: 'Could not verify',
        message: 'Please try again',
        level: 'error',
      });
    }

    return true;
  }

  if (!expiredSession) {
    return null;
  }

  return (
    <Modal open={expiredSession} size="tiny" onClose={() => {}}>
      <Modal.Content title="Session Expired">
        <Text className="py-1">
          Please re-enter your credentials to restore the session
        </Text>

        <Form onSubmit={handleSumbit} id="restore-session">
          <Form.Input name="username" label="Username" required />

          <Form.Input
            className="mt-6"
            name="password"
            label="Password"
            type="password"
            required
          />
        </Form>
      </Modal.Content>

      <Modal.Footer>
        <Button variant="primary" type="submit" form="restore-session">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
