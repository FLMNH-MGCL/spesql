import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import MANUAL from "./InsertTypes/MANUAL";
import OutsideClickHandler from "../utils/OutsideClickHandler";

export default function CreatePasteModal({ trigger, open, props, closeModal }) {
  return (
    <Modal
      trigger={trigger}
      open={open}
      size="small"
      as={OutsideClickHandler}
      onOutsideClick={() => closeModal()}
    >
      <MANUAL {...props} closeModal={closeModal} />
    </Modal>
  );
}
