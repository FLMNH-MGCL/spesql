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
  Popup,
} from "semantic-ui-react";
import ConfirmAuth from "./ConfirmAuth";
import axios from "axios";

const ACCESS_LEVELS = [
  { key: "Guest", text: "Guest", value: "guest" },
  { key: "Manager", text: "Manager", value: "manager" },
  { key: "Admin", text: "Admin", value: "admin" },
];

export default function EditUserModal({
  users,
  checkAuth,
  createNotification,
  currentUser,
}) {
  const [open, setOpen] = useState(false);
  const [selected, select] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [understood, setUnderstood] = useState(false);

  const userSelection = users
    ? users
        .filter((user) => {
          return user.username !== currentUser.username;
        })
        .map((user) => {
          return {
            key: user.name,
            text: `${user.name} : ${user.username}`,
            value: user,
          };
        })
    : null;

  function resetState() {
    select(undefined);
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setAccessLevel("");
    setUnderstood(false);
  }

  const getUser = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === selected) {
        return users[i];
      }
    }
  };

  const initForm = (user) => {
    // get user by username
    //const user = getUser()
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
    if (!selected) return [];

    // let changes = [];
    const user = selected;
    let newUser = user;

    // manually check each field, for each on thats diff append to changes
    let fullName = firstName + " " + lastName;
    if (user.name !== fullName) {
      newUser.name = fullName;
    }

    if (user.username !== username) {
      newUser.username = username;
    }

    if (user.accessLevel !== accessLevel) {
      newUser.privilege_level = accessLevel;
    }

    if (password && password !== "") {
      newUser.password = password;
    }

    return { id: user.id, newUser: newUser };
  };

  // TODO: axios request, check if sucess
  const deleteUser = async () => {
    // axios to delete
    const res = await axios
      .post("/api/admin/delete-user/", {
        username: username,
      })
      .catch((err) => {
        console.log(err);
        createNotification({
          type: "error",
          message:
            "404 error code returned. Likely cause is user requested for delete does not exist.",
        });
      });

    if (res) {
      createNotification({
        type: "success",
        message: `Sucessfully deleted user ${username}`,
      });
    } else {
      createNotification({
        type: "error",
        message: "Failed to delete user.",
      });
    }
  };

  const errorChecks = (field) => {
    return false;
  };

  // TODO: axios request, check if sucess
  const updateUser = async (e) => {
    // get user and get changes
    // const user = selected;
    // const changes = getChanges();

    let hasError = false;

    if (
      errorChecks("firstName") ||
      errorChecks("lastName") ||
      errorChecks("username") ||
      errorChecks("password") ||
      errorChecks("accessLevel")
      // || !understood
    ) {
      hasError = true;
    }

    if (hasError) {
      createNotification({
        type: "error",
        message: "You must fix errors in form.",
      });
      return;
    }

    // console.log("cant do this yet :)");

    // update user
    // const res = await axios.post("/api/admin/update-user", changes);
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
            error={!understood}
          />
        </Form.Group>

        <Divider horizontal>Or</Divider>
        <Form.Group
          style={{
            justifyContent: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem",
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
                  handleSubmit={deleteUser}
                  checkAuth={checkAuth}
                  buttonStyle={{
                    color: "red",
                    icon: <Icon name="user delete" />,
                    labelPosition: "left",
                    text: "Delete User",
                  }}
                />
              }
            />
          </Form.Field>
        </Form.Group>
      </>
    );
  };

  // console.log(selected);
  // console.log(selected);

  // console.log(username);

  return (
    <Modal
      trigger={
        <Button
          floated="right"
          icon
          labelPosition="left"
          color="yellow"
          size="small"
          onClick={() => setOpen(true)}
        >
          <Icon name="edit" /> Edit
        </Button>
      }
      size="small"
      onClose={resetState}
      open={open}
    >
      <Modal.Header>Edit an Existing User</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field
            control={Select}
            label="Select an existing user"
            options={userSelection}
            value={selected}
            onChange={(e, { value }) => {
              select(value);
              initForm(value);
            }}
          />
          {selected ? renderEditForm() : null}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button icon basic color="linkedin" floated="left">
          <Icon name="question" />
        </Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <ConfirmAuth handleSubmit={updateUser} checkAuth={checkAuth} />
      </Modal.Actions>
    </Modal>
  );
}
