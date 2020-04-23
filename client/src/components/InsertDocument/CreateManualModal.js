import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import MANUAL from "./InsertTypes/MANUAL";

export default function CreatePasteModal({ trigger, open, props, closeModal }) {
  return (
    <Modal trigger={trigger} open={open} size="small">
      {/* <MANUAL {...props} closeModal={closeModal} /> */}
      TODO
    </Modal>
  );
}
