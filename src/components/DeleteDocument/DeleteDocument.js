import React, { useState } from "react";
import { Modal, Icon, Form, Checkbox, Button } from "semantic-ui-react";
import useBoolean from "../../utils/useBoolean";
import ConfirmAuth from "../../views/Admin/components/ConfirmAuth";

export default function DeleteDocument({
  selectedSpecimen,
  specimen,
  disabled,
  props,
}) {
  const [open, { toggle }] = useBoolean();
  const [understood, setUnderstanding] = useState(false);

  if (disabled || !selectedSpecimen) {
    return <div></div>;
  }

  function handleConfirm() {
    if (!understood) {
      props.notify({
        type: "error",
        message:
          "You must acknowledge the disclaimer before submitting delete query",
      });
    } else {
      let query = `DELETE FROM molecularLab WHERE id=${this.props.target};`;
      props.runQuery(query);
      toggle();
    }
  }

  function handleCancel() {
    toggle();
    setUnderstanding(false);
  }

  return (
    <Modal
      size="mini"
      open={open}
      trigger={
        <Icon
          className={
            selectedSpecimen.id === specimen.id
              ? "expand-on-hover active"
              : "expand-on-hover hidden"
          }
          name="trash alternate"
          onClick={toggle}
          style={
            selectedSpecimen.id === specimen.id
              ? { float: "right", marginLeft: ".25rem" }
              : { display: "none" }
          }
        />
      }
    >
      <Modal.Header>Are you sure?</Modal.Header>
      <Modal.Content>
        <p>Target (Specimen ID): {selectedSpecimen.id}</p>
        <Form>
          <Form.Field
            control={Checkbox}
            label="I understand this cannot be undone"
            error={
              !understood
                ? { content: "You must acknowledge the disclaimer" }
                : false
            }
            value={understood}
            onChange={() => setUnderstanding(!understood)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleCancel}>Cancel</Button>
        {/* <ConfirmAuth
          checkAuth={this.props.checkAuth}
          handleSubmit={this.handleConfirm}
        /> */}
      </Modal.Actions>
    </Modal>
  );
}
