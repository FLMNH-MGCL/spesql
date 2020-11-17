import React, { useState } from 'react';
import { MySqlCredentials } from '../../../main/server/types';
import JsonFileUpload from '../JsonFileUpload';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useNotify } from '../utils/context';
import useToggle from '../utils/useToggle';

type Props = {
  setJson: React.Dispatch<React.SetStateAction<{} | MySqlCredentials>>;
};

export default function CreateUpdateConfigModal({ setJson }: Props) {
  const { notify } = useNotify();
  const [open, { on, off }] = useToggle(false);

  const [config, setConfig] = useState<string>('');

  function onConfirm() {
    // console.log(config as MySqlCredentials);
    if (config && Object.keys(JSON.parse(config)).length) {
      setJson(JSON.parse(config) as MySqlCredentials);
      off();
    } else {
      notify({
        title: 'Invalid Config',
        message: 'Detected an empty config',
        level: 'error',
      });
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Upload Config">
          <JsonFileUpload setJson={setConfig} />
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Close</Button>
            <Button variant="primary" onClick={onConfirm}>
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <Button onClick={on} variant="primary">
        Update Config
      </Button>
    </React.Fragment>
  );
}
