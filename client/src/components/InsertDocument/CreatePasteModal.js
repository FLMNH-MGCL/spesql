import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import PASTE from "./InsertTypes/PASTE";

export default function CreatePasteModal({ trigger, open, props, closeModal }) {
  return (
    <Modal trigger={trigger} open={open} size="small">
      <PASTE {...props} closeModal={closeModal} />
    </Modal>
  );
}
