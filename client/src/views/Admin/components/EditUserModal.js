import React, { useState } from "react";
import {
  Modal,
  Button,
  Icon,
  Form,
  Select,
  Input,
  Checkbox,
  Divider,
  Popup
} from "semantic-ui-react";
import ConfirmAuth from "./ConfirmAuth";
import axios from "axios";

const ACCESS_LEVELS = [
  { key: "Guest", text: "Guest", value: "guest" },
  { key: "Manager", text: "Manager", value: "manager" },
  { key: "Admin", text: "Admin", value: "admin" }
];

export default function EditUserModal({
  users,
  checkAuth,
  createNotification
}) {
  const [selected, select] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [understood, setUnderstood] = useState(false);

  const userSelection = users
    ? users.map(user => {
        return {
          key: user.name,
          text: `${user.name} : ${user.username}`,
          value: user.username
        };
      })
    : null;

  const getUser = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === selected) {
        return users[i];
      }
    }
  };

  const initSelected = () => {
    // get user by username
    const user = getUser();
    console.log(user);
    const firstName = user.name.split(" ")[0];
    const lastName = user.name.split(" ")[1];
    setFirstName(firstName);
    setLastName(lastName);
    setUsername(user.username);
    setAccessLevel(user.privilege_level);
  };

  async function generateSecurePass() {
    const res = await axios.get("/api/admin/generate-password/");

    if (res.status === 200 || !res.err) {
      const _password = res.data.char[0].concat(res.data.char[1]);
      //console.log(_password);
      setPassword(_password);
    }
  }

  const getChanges = () => {
    let changes = [];
  };

  // TODO: axios request, check if sucess
  const deleteUser = () => {
    // error check
    // axios to delete
    // notify success or failure
  };

  const errorChecks = () => {};

  // TODO: axios request, check if sucess
  const handleSubmit = async e => {
    // get user and get changes
    const user = getUser();
    const changes = getChanges();

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

    console.log("cant do this yet :)");

    // update user
    // notify
  };

  const renderEditForm = () => {
    return (
      <>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="First Name"
            value={firstName}
            onChange={(e, { value }) => setFirstName(value)}
            // error={errorChecks("firstName")}
          />
          <Form.Field
            control={Input}
            label="Last Name"
            value={lastName}
            onChange={(e, { value }) => setLastName(value)}
            // error={errorChecks("lastName")}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Username"
            value={username}
            onChange={(e, { value }) => setUsername(value)}
            // error={errorChecks("username")}
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
            // error={errorChecks("password")}
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
            // error={!understood}
          />
        </Form.Group>

        <Divider horizontal>Or</Divider>
        <Form.Group
          style={{
            justifyContent: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem"
          }}
        >
          <Form.Field>
            <Popup
              content="This cannot be undone!"
              trigger={
                // <Button icon labelPosition="left" color="red">
                //   <Icon name="user delete" />
                //   Delete User
                // </Button>
                <ConfirmAuth
                  handleSubmit={handleSubmit}
                  checkAuth={checkAuth}
                  buttonStyle={{
                    color: "red",
                    icon: <Icon name="user delete" />,
                    labelPosition: "left",
                    text: "Delete User"
                  }}
                />
              }
            />
          </Form.Field>
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
      </>
    );
  };

  if (selected && !username && !firstName && !lastName && !accessLevel) {
    initSelected();
  }

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
        <Form>
          <Form.Field
            control={Select}
            label="Select an existing user"
            options={userSelection}
            value={selected}
            onChange={(e, { value }) => select(value)}
          />
          {selected ? renderEditForm() : null}
        </Form>
      </Modal.Content>
    </Modal>
  );
}
