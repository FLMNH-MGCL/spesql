import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { UPDATE } from "./QueryTypes";
import OutsideClickHandler from "../utils/OutsideClickHandler";

export default function CreateUpdateModal({
  trigger,
  open,
  props,
  closeModal,
}) {
  console.log(props.disabled);
  return (
    <Modal
      trigger={trigger}
      open={open}
      size="small"
      as={OutsideClickHandler}
      onOutsideClick={() => closeModal()}
    >
      <UPDATE
        // dbSelection={dbSelection}
        runQuery={props.runQuery}
        clearQuery={props.clearQuery}
        closeModal={closeModal}
        errorMessages={props.errorMessages}
        updateUpdateErrorMessage={props.updateUpdateErrorMessage}
        notify={props.notify}
        disabled={props.disabled}
        userData={props.userData}
      />
    </Modal>
  );
}
