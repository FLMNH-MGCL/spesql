import React from "react";
import { Modal } from "semantic-ui-react";
import FormInsert from "./InsertTypes/FormInsert";

export default function CreatePasteModal({
  props,
  open,
  closeModal,
  checkAuth,
  tableOptions,
}) {
  return (
    <Modal open={open} size="small">
      <FormInsert
        {...props}
        closeModal={closeModal}
        checkAuth={checkAuth}
        tableOptions={tableOptions}
      />
    </Modal>
  );
}
