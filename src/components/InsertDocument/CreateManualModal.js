import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import MANUAL from "./InsertTypes/MANUAL";
import OutsideClickHandler from "../utils/OutsideClickHandler";

export default function CreatePasteModal({ props, open, closeModal }) {
  return (
    <Modal open={open} size="small" onClose={closeModal}>
      <MANUAL {...props} closeModal={closeModal} />
    </Modal>
  );
}
