import React from "react";
import { Modal } from "semantic-ui-react";
import CSVInsert from "./forms/CSVInsert";
// import "./../../assets/globals.css";

export default function CreatePasteModal({
  props,
  open,
  closeModal,
  checkAuth,
  tableOptions,
}) {
  return (
    <Modal open={open} size="small" onClose={closeModal}>
      <CSVInsert
        {...props}
        tableOptions={tableOptions}
        closeModal={closeModal}
        checkAuth={checkAuth}
      />
    </Modal>
  );
}
