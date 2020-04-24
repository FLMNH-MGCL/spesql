import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { COUNT } from "./QueryTypes";
import OutsideClickHandler from "../utils/OutsideClickHandler";

export default function CreateCountModal({ trigger, open, props, closeModal }) {
  return (
    <Modal
      trigger={trigger}
      open={open}
      size="small"
      as={OutsideClickHandler}
      onOutsideClick={() => closeModal()}
    >
      <COUNT
        // dbSelection={dbSelection}
        runQuery={props.runQuery}
        countQueryCount={props.countQueryCount}
        closeModal={closeModal}
        updateCountQueryCount={props.updateCountQueryCount}
        errorMessages={props.errorMessages}
        updateCountErrorMessage={props.updateCountErrorMessage}
        notify={props.notify}
        userData={props.userData}
      />
    </Modal>
  );
}
