import React from "react";
import { Modal } from "semantic-ui-react";
import SelectForm from "./forms/SelectForm";

export default function CreateSelectModal({ open, props, closeModal }) {
  return (
    <Modal open={open} size="small" onClose={closeModal}>
      <SelectForm
        // dbSelection={dbSelection}
        runSelectQuery={props.runSelectQuery}
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