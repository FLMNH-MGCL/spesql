import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import PASTE from "./InsertTypes/PASTE";
// import OutsideClickHandler from "react-outside-click-handler";
import OutsideClickHandler from "../utils/OutsideClickHandler";
import "./../../assets/globals.css";

export default function CreatePasteModal({ trigger, open, props, closeModal }) {
  return (
    // pending a merge from a pull request I made to airbnb about this component,
    // I will either wait for the merge or just copy the component over with my own
    // edits manually...
    // issue itself has to do with the trigger for the modal being wrapped in the
    // rendered div from the outside click handler. By default,
    // the handler is not able to have any classes/styling injected to it, which
    // hinders me using it while maintaining the UI effects of the trigger.
    // allowing classNames and styles would let me just overwrite the rendered
    // div to include the styles I am missing.

    <Modal
      trigger={trigger}
      open={open}
      size="small"
      as={OutsideClickHandler}
      onOutsideClick={() => closeModal()}
    >
      <PASTE {...props} closeModal={closeModal} />
    </Modal>
  );
}
