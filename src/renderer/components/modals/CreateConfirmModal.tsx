import React from "react";
import Button, { ButtonGroup } from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import Modal from "../ui/Modal";
import useToggle from "../utils/useToggle";

type Props = {
  details: string;
  onConfirm(): void;
  trigger: React.ReactNode;
};

export default function CreateConfirmModal({
  onConfirm,
  details,
  trigger,
}: Props) {
  const [open, { on, off }] = useToggle(false);

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="tiny">
        <Modal.Content title="Are you sure?">{details}</Modal.Content>
        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={off}>Cancel</Button>
            <Button variant="primary" onClick={onConfirm}>
              Confirm
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>

      <div onClick={on}>{trigger}</div>
    </React.Fragment>
  );
}
