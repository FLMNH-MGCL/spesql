import {
  Button,
  Code,
  Form,
  FormSubmitValues,
  Modal,
  Text,
} from '@flmnh-mgcl/ui';
import React from 'react';
import mysql from 'mysql';
import { useStore } from '../../../stores';
import shallow from 'zustand/shallow';
import { BACKEND_URL, RequestType } from '../../types';
import axios from 'axios';
import useToggle from '../utils/useToggle';
import { useNotify } from '../utils/context';

type Props = {
  open: boolean;
  onClose(): void;
  query: string;
  conditions: any[];
  updates: any;
};

export default function CreateRequestSingleUpdateModal({
  open,
  onClose,
  query,
  conditions,
  updates,
}: Props) {
  const { notify } = useNotify();
  const user = useStore((state) => state.user, shallow);
  const selectedSpecimen = useStore((state) => state.selectedSpecimen, shallow);

  const [loading, { on, off }] = useToggle(false);

  async function makeRequest(values: FormSubmitValues) {
    on();

    const userRequest = {
      _type: RequestType.UPDATE,
      title: `Update ${selectedSpecimen?.catalogNumber ?? 'Request'}`,
      from: user!.fullName,
      username: user!.username,
      description: values.description,
      query: mysql.format(query, [updates, ...conditions]),
    };

    const res = await axios.post(BACKEND_URL + '/api/request-update', {
      ...userRequest,
    });

    off();

    if (res.status !== 201) {
      notify(
        {
          title: 'Update Request Failed',
          message:
            'An unknown error occurred, please create a bug report on GitHub and inform an admin.',
          level: 'error',
        },
        'error'
      );
    } else {
      // can close the modal on success
      notify({
        title: 'Update Request Sent',
        message:
          'An admin should review the request shortly and get back to you.',
        level: 'success',
      });

      onClose();
    }
  }

  return (
    <React.Fragment>
      <Modal open={loading ? true : open} onClose={onClose}>
        <Modal.Content title="Single Update Request">
          <div className="py-2">
            <Text>You have requested the following updates: </Text>
            <Code
              language="json"
              rounded
              codeString={JSON.stringify(updates, null, 2)}
              maxHeight="12rem"
            />
          </div>

          <div className="py-2">
            <Text>This results in the following query string:</Text>
            <Code
              language="sql"
              rounded
              codeString={mysql.format(query, [updates, ...conditions])}
              maxHeight="12rem"
            />
          </div>

          <Form onSubmit={makeRequest} id="single-update-req">
            <Form.Group flex>
              <Form.Area
                id="description"
                name="description"
                label="Description / Reason for Update(s)"
                rows={4}
                fullWidth
                required
              />
            </Form.Group>
          </Form>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button disabled={loading} onClick={onClose}>
              Close
            </Button>
            <Button
              loading={loading}
              variant="primary"
              type="submit"
              form="single-update-req"
            >
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
