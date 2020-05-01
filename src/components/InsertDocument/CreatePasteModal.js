import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import PASTE from "./InsertTypes/PASTE";
import "./../../assets/globals.css";

export default function CreatePasteModal({ props, open, closeModal }) {
  return (
    <Modal open={open} size="small" onClose={closeModal}>
      <PASTE {...props} closeModal={closeModal} />
    </Modal>
  );
}
