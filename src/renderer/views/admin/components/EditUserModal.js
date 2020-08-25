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
  errors,
  updateError,
}) {
  const [open, setOpen] = useState(false);
  const [selected, select] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [understood, setUnderstood] = useState(false);
  const [showPass, setShowPass] = useState(false);

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
    setShowPass(false);
    setUnderstood(false);
  }

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
    let atleastOneChange = false;

    // manually check each field, for each on thats diff append to changes
    let fullName = firstName + " " + lastName;
    if (user.name !== fullName) {
      // console.log(user.name, fullName);
      newUser.name = fullName;
      atleastOneChange = true;
    }

    if (user.username !== username) {
      // console.log(user.username, username);

      newUser.username = username;
      atleastOneChange = true;
    }

    if (user.privilege_level !== accessLevel) {
      // console.log(user.accessLevel, accessLevel);

      newUser.privilege_level = accessLevel;
      atleastOneChange = true;
    }

    if (password && password !== "") {
      // console.log(password);
      newUser.password = password;
      atleastOneChange = true;
    }

    if (!atleastOneChange) {
      return undefined;
    } else {
      return { id: user.id, newUser: newUser };
    }
  };

  async function deleteUser(adminData) {
    const res = await axios
      .post("/api/admin/delete-user/", {
        username: username,
        adminUser: adminData.username,
        adminPass: adminData.pass,
      })
      .catch((error) => {
        return { error: error.response };
      });

    if (res.data) {
      if (res.data.err) {
        updateError([res.data.err.sqlMessage]);
        createNotification({
          type: "error",
          message: `Query failed. ${res.data.err.sqlMessage}`,
        });
      } else {
        createNotification({
          type: "success",
          message: `Sucessfully deleted user ${username}`,
        });
      }
    } else {
      const error = res.error;

      if (error.status === 503) {
        createNotification({
          type: "error",
          message: "Bad VPN/Internet connection detected",
        });
        return;
      } else if (error.status === 400) {
        createNotification({
          type: "error",
          message: "Missing admin credentials",
        });
        return;
      } else if (error.status === 401) {
        createNotification({ type: "error", message: "Authorization failed" });
        return;
      }
    }
  }

  const errorChecks = (field) => {
    let errors = [];

    switch (field) {
      case "firstName":
        if (firstName === "" || firstName.length < 2) {
          errors.push(
            "Please enter a value for firstName longer than 2 characters."
          );
        }

        return errors;

      case "lastName":
        if (lastName === "" || lastName.length < 2) {
          errors.push(
            "Please enter a value for lastName longer than 2 characters."
          );
        }
        return errors;

      case "username":
        if (username === "" || username.length < 5) {
          errors.push(
            "Please enter a value for username longer than 5 characters."
          );
        }

        const usersExcludeTarget = users.filter(
          (user) => user.username !== selected.username
        );

        // console.log(usersExcludeTarget);

        if (JSON.stringify(usersExcludeTarget).includes(username)) {
          errors.push("Entered username already exists.");
        }

        return errors;

      case "password":
        if (password !== "" && password.length < 6) {
          errors.push("Your altered password must be 6 or more characters.");
        }
        return errors;

      // case "accessLevel":
      //   return errors;

      case "understood":
        if (!understood && password !== "") {
          errors.push(
            "You must acknowledge the disclaimer when changing the password and check the box."
          );
        }

        return errors;

      default:
        return errors;
    }
  };

  const updateUser = async (adminData) => {
    // get user and get changes
    // const user = selected;
    const changes = getChanges();

    // console.log(changes);

    if (!changes) {
      createNotification({
        type: "error",
        message: "No changes detected.",
      });

      return;
    }

    let errors = [];

    errors = errors.concat(errorChecks("firstName"));
    errors = errors.concat(errorChecks("lastName"));
    errors = errors.concat(errorChecks("username"));
    errors = errors.concat(errorChecks("password"));
    errors = errors.concat(errorChecks("understood"));

    if (errors.length > 0) {
      createNotification({
        type: "error",
        message: "You must fix errors in form.",
      });

      updateError(errors);
      return;
    }

    // console.log("cant do this yet :)");

    // update user
    const res = await axios
      .post("/api/admin/update-user", {
        id: changes.id,
        newUser: changes.newUser,
        adminUser: adminData.username,
        adminPass: adminData.pass,
      })
      .catch((error) => {
        return { error: error.response };
      });

    if (res.err) {
      createNotification({ type: "error", message: res.err.sqlMessage });
    } else if (res.error) {
      const error = res.error;

      if (error.status === 503) {
        createNotification({
          type: "error",
          message: "Bad VPN/Internet connection detected",
        });
        return;
      } else if (error.status === 400) {
        createNotification({
          type: "error",
          message: "Missing admin credentials",
        });
        return;
      } else if (error.status === 401) {
        createNotification({ type: "error", message: "Authorization failed" });
        return;
      }
    } else {
      createNotification({ type: "success", message: "Updated user" });
    }
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
            icon={
              <Icon
                name={showPass ? "eye" : "eye slash"}
                link
                onClick={() => setShowPass(!showPass)}
              />
            }
            control={Input}
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e, { value }) => setPassword(value)}
            // error={errorChecks("password")}
          />
          {/* <Icon name="eye" /> */}
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
            disabled={password === ""}
            onChange={() => setUnderstood(!understood)}
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
