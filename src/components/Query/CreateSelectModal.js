import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { SELECT } from "./QueryTypes";

export default function CreateSelectModal({ open, props, closeModal }) {
  return (
    <Modal open={open} size="small" onClose={closeModal}>
      <SELECT
        // dbSelection={dbSelection}
        runQuery={props.runQuery}
        clearQuery={props.clearQuery}
        closeModal={closeModal}
        errorMessages={props.errorMessages}
        updateSelectErrorMessage={props.updateSelectErrorMessage}
        notify={props.notify}
        userData={props.userData}
      />
    </Modal>
  );
}
