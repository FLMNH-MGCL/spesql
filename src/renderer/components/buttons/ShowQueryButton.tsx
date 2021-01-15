import { Badge, Button, Code, Modal } from '@flmnh-mgcl/ui';
import React from 'react';
import { useStore } from '../../../stores';
import useToggle from '../utils/useToggle';
import CopyButton from './CopyButton';

type Props = {
  disabled?: boolean;
};

export default function ShowQueryButton({ disabled }: Props) {
  const [visible, { on, off }] = useToggle(false);

  const queryString = useStore((state) => state.queryData.queryString);

  if (disabled) {
    return null;
  }

  return (
    <div className="flex items-center ">
      <Modal open={visible} onClose={off} size="almostMassive">
        <Modal.Content title="Query String">
          <Code rounded language="sql" codeString={queryString} />
        </Modal.Content>
        <Modal.Footer>
          <Button.Group>
            <CopyButton title="Query Copied" value={queryString} />
            <Button onClick={off}>Close</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>
      <Badge onClick={on}>Show Query</Badge>
    </div>
  );
}
