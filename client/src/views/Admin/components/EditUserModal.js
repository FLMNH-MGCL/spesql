import React, { useState } from "react";
import { Modal, Button, Icon, Form } from "semantic-ui-react";

export default function EditUserModal({ users }) {
  const [selected, select] = useState();
  const handleSubmit = e => {};
  return (
    <Modal
      trigger={
        <Button
          floated="right"
          icon
          labelPosition="left"
          color="yellow"
          size="small"
        >
          <Icon name="edit" /> Edit User
        </Button>
      }
      closeIcon
    >
      <Modal.Header>Edit an Existing User</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}></Form>
      </Modal.Content>
    </Modal>
  );
}
