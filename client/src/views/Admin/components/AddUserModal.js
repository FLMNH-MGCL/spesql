import React, { useState } from "react";
import {
  Modal,
  Button,
  Icon,
  Form,
  Input,
  Select,
  Checkbox
} from "semantic-ui-react";
import axios from "axios";
import { capsChecks } from "../../../functions/queryChecks";
import ConfirmAuth from "./ConfirmAuth";

const ACCESS_LEVELS = [
  { key: "Guest", text: "Guest", value: "guest" },
  { key: "Manager", text: "Manager", value: "manager" },
  { key: "Admin", text: "Admin", value: "admin" }
];

export default function AddUserModal({ users, checkAuth, createNotification }) {
  // const [selected, select] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("guest");
  const [understood, setUnderstood] = useState(false);

  const resetState = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setAccessLevel("");
    setUnderstood(false);
  };

  async function generateSecurePass() {
    const res = await axios.get("/api/admin/generate-password/");

    if (res.status === 200 || !res.err) {
      const _password = res.data.char[0].concat(res.data.char[1]);
      //console.log(_password);
      setPassword(_password);
    }
  }

  const errorChecks = field => {
    switch (field) {
      case "firstName":
        if (firstName === "") {
          return true;
        }

        const firstNameChecks = capsChecks(field, firstName, true);
        if (firstNameChecks.length > 0) {
          return firstNameChecks[0].split(":")[1];
        }

        break;
      case "lastName":
        if (lastName === "") {
          return true;
        }

        const lastNameChecks = capsChecks(field, lastName, true);
        if (lastNameChecks.length > 0) {
          return lastNameChecks[0].split(":")[1];
        }

        break;

      case "username":
        if (username === "") {
          return true;
        }

        if (username.length < 10) {
          return { content: "Must be at least 10 characters long." };
        }

        break;

      case "password":
        if (password === "") {
          return true;
        }
        break;
    }
  };

  const finalCheck = () => {};

  const handleSubmit = async e => {
    let hasError = false;

    if (
      errorChecks("firstName") ||
      errorChecks("lastName") ||
      errorChecks("username") ||
      errorChecks("password") ||
      errorChecks("accessLevel") ||
      !understood
    ) {
      hasError = true;
    }

    if (hasError) {
      createNotification({
        type: "error",
        message: "You must fix errors in form."
      });
      return;
    }

    const user = {
      name: firstName.concat(` ${lastName}`),
      user: username,
      password: password,
      privilege_level: accessLevel
    };

    if (JSON.stringify(users).includes(username)) {
      createNotification({
        type: "error",
        message: "Entered Username already exists"
      });
    }

    console.log(JSON.stringify(user));
    const res = await axios.post("/api/admin/create-user/", user);

    console.log(res);

    if (res.data.data) {
      createNotification({ type: "success", message: res.data.data });
    } else {
      createNotification({ type: "error", message: res.data.err.sqlMessage });
    }
  };

  return (
    <Modal
      trigger={
        <Button
          floated="right"
          icon
          labelPosition="left"
          color="green"
          size="small"
        >
          <Icon name="add user" /> Add User
        </Button>
      }
      onClose={resetState}
      closeIcon
    >
      <Modal.Header>Add a User</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="First Name"
              value={firstName}
              onChange={(e, { value }) => setFirstName(value)}
              error={errorChecks("firstName")}
            />
            <Form.Field
              control={Input}
              label="Last Name"
              value={lastName}
              onChange={(e, { value }) => setLastName(value)}
              error={errorChecks("lastName")}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Username"
              value={username}
              onChange={(e, { value }) => setUsername(value)}
              error={errorChecks("username")}
            />
            <Form.Field
              control={Select}
              options={ACCESS_LEVELS}
              label="Access Level"
              value={accessLevel}
              onChange={(e, { value }) => setAccessLevel(value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              width={11}
              control={Input}
              value={password}
              onChange={(e, { value }) => setPassword(value)}
              error={errorChecks("password")}
            />
            <Form.Field width={5}>
              <Button color="yellow" onClick={() => generateSecurePass()}>
                Generate Strong Password
              </Button>
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field
              control={Checkbox}
              label="I understand that, once created, this password may not be retrieved. Admins may reset and change it only."
              value={understood}
              onChange={() => setUnderstood(!understood)}
              error={!understood}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Button icon labelPosition="left" color="linkedin">
                <Icon name="question circle outline" />
                See Help
              </Button>
            </Form.Field>
            <Form.Field>
              {/* <Button color="green" onClick={handleSubmit}>
                Submit
              </Button> */}
              <ConfirmAuth handleSubmit={handleSubmit} checkAuth={checkAuth} />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
