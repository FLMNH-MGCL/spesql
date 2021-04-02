import { Button, FormSubmitValues, Modal } from '@flmnh-mgcl/ui';
import axios from 'axios';
import React from 'react';
import { BACKEND_URL, RequestType } from '../../types';
import NewUserRequestForm from '../forms/NewUserRequestForm';
import { useNotify } from '../utils/context';
import useToggle from '../utils/useToggle';

export default function CreateRequestUserAccountModal() {
  const { notify } = useNotify();
  const [open, { on, off }] = useToggle(false);
  const [loading, { toggle }] = useToggle(false);

  async function handleSubmit(values: FormSubmitValues) {
    toggle();
    const {
      firstName,
      lastName,
      institution,
      email,
      username,
      message,
      password,
    } = values;

    const name = [firstName, lastName].join(' ');

    const userRequest = {
      _type: RequestType.ACCOUNTCREATION,
      title: 'New Account Request',
      from: name,
      username,
      institution,
      email,
      description: message,
      password,
    };

    console.log(userRequest);

    const res = await axios.post(BACKEND_URL + '/api/request-account', {
      ...userRequest,
    });

    toggle();

    // connection to database was lost
    if (res.status === 502) {
      notify(
        {
          title: 'Account Request Failed',
          message:
            'The server could not connect, please ensure you have your UF VPN enabled and connected and restart the app',
          level: 'error',
        },
        'error'
      );
    } else if (res.status === 400) {
      // bad params! hmm. this really should not hit unless pinging the endpoint directly but..
      notify(
        {
          title: 'Account Request Failed',
          message:
            'The server found missing/invalid values in you request, please ensure the form was filled out entirely',
          level: 'error',
        },
        'error'
      );
    } else if (res.status !== 201) {
      // should not really be any other status at this point, so I consider this a bug.
      notify(
        {
          title: 'Account Request Failed',
          message:
            'An unknown error occurred, please create a bug report on GitHub and inform an admin.',
          level: 'error',
        },
        'error'
      );
    } else {
      // can close the modal on success
      notify({
        title: 'Account Request Sent',
        message:
          'An admin should review the request shortly and get back to you.',
        level: 'success',
      });

      off();
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Request Account Creation">
          <NewUserRequestForm onSubmit={handleSubmit} />
        </Modal.Content>
        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Cancel</Button>
            <Button
              type="submit"
              form="user-req-form"
              variant="primary"
              loading={loading}
            >
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <span
        onClick={on}
        className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
      >
        Request one here
      </span>
    </React.Fragment>
  );
}
