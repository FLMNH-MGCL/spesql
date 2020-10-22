import React, { useState } from "react";
import { Modal, Form, Checkbox, Button } from "semantic-ui-react";
import useBoolean from "../../utils/useBoolean";
import ConfirmAuth from "../auth/ConfirmAuth";
import axios from "axios";

const PREFIX = process.env.NODE_ENV === "production" ? PUBLIC_URL : "";

export default function DeleteDocument({
  selectedSpecimen,
  disabled,
  userData,
  notify,
  props,
}) {
  const [open, { toggle }] = useBoolean();
  const [understood, setUnderstanding] = useState(false);

  if (disabled || !selectedSpecimen) {
    return <div></div>;
  }

  async function checkAuth(user, password, callback) {
    if (userData.username !== user) {
      // attempting auth with diff account
      notify({
        type: "error",
        title: "Authorization failed",
        message:
          "Attempting authentication with different account than logged in account.",
      });
      return;
    } else if (
      userData.privilege_level !== "admin" &&
      userData.privilege_level !== "manager"
    ) {
      // this should NEVER happen, however this is a sanity check
      notify({
        type: "error",
        title: "Authorization failed",
        message: "Authorization failed or access denied",
      });

      // forcibly log out
      props.logout();
      return;
    }

    // let resStatus = null;

    const authData = await axios
      .post(PREFIX + "/api/login/", {
        user: user,
        password: password,
      })
      .catch((error) => {
        // resStatus = error.response.status;
        return null;
      });

    if (!authData || authData.data.err || authData.data.authed === false) {
      // credentials did not match
      props.notify({
        type: "error",
        title: "Authorization failed",
        message: "Authorization failed or access denied",
      });
    } else {
      // allow whatever command to proceed
      // props.notify({ type: "success", message: "Authorization successful" });
      callback({ username: user, password: password });
    }
  }

  function handleConfirm(userData) {
    if (!understood) {
      props.notify({
        type: "error",
        title: "Form error",
        message:
          "You must acknowledge the disclaimer before submitting delete query",
      });
    } else {
      console.log(userData);
      let query = `DELETE FROM molecularLab WHERE id=${selectedSpecimen.id};`;
      props.runDeleteQuery(query, {
        user: userData.username,
        password: userData.password,
      });
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
        <Button color="red" onClick={toggle}>
          Delete
        </Button>
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
        <ConfirmAuth checkAuth={checkAuth} handleSubmit={handleConfirm} />
      </Modal.Actions>
    </Modal>
  );
}
