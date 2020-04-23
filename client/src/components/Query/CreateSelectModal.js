import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { SELECT } from "./QueryTypes";

export default function CreateSelectModal({
  trigger,
  open,
  props,
  closeModal,
}) {
  return (
    <Modal trigger={trigger} open={open} size="small">
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
