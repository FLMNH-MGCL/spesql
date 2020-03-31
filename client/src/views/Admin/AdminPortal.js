import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../redux/mapFunctions";
import { parseDate } from "../../functions/queryChecks";
import {
  Button,
  Checkbox,
  Icon,
  Table,
  Container,
  Loader,
  Dimmer,
  Segment,
  Header
} from "semantic-ui-react";
import axios from "axios";
import AddUserModal from "./components/AddUserModal";
import EditUserModal from "./components/EditUserModal";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "./styles.css";

const createNotification = content => {
  switch (content.type) {
    case "success":
      NotificationManager.success(`${content.message}`, "Success!");
      break;
    case "warning":
      NotificationManager.warning(`${content.message}`, "Warning!", 4000);
      break;
    case "error":
      NotificationManager.error(`${content.message}`, "Error!");
      break;
    default:
  }
};

function AdminPortal(props) {
  const [users, setUsers] = useState();
  const [error, setError] = useState();

  async function checkAuth(user, password, callback) {
    console.log(`${user} vs ${password}`);
    const authData = await axios.post("/api/login/", {
      user: user,
      password: password
    });

    console.log(authData);

    if (authData.data.err || authData.data.authed === false) {
      // credentials did not match
      createNotification({ type: "error", message: authData.data.err });
    } else {
      // allow whatever command to proceed
      createNotification({ type: "success", message: authData.data.message });
      callback();
    }
  }

  async function getUsers() {
    const res = await axios.get("/api/admin/fetch-users/");
    // console.log(res);

    if (res.status !== 200 || res.err) {
      setError(res.err);
    } else {
      setUsers(res.data);
    }
  }

  useEffect(() => {
    if (!users) {
      getUsers();
    }
  });

  const renderTable = () => {
    if (!users) return; // safety check
    // console.log(users);
    const userTable = users.map(user => {
      return (
        <Table.Row>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.privilege_level}</Table.Cell>
          <Table.Cell>{parseDate(new Date(user.created_at))}</Table.Cell>
        </Table.Row>
      );
    });

    return userTable;
  };

  const userSelection = () => {};

  return (
    <>
      {/* <div style={{ textAlign: "center", paddingTop: "3rem" }}>
        <h3>Wow, such empty.</h3>
        <p style={{ display: "block" }}>
          (Don't worry content is coming soon!)
        </p>
        <button onClick={() => (window.location.href = "/Home")}>
          Click to go back!
        </button>
      </div> */}
      <div
        style={{
          position: "absolute",
          left: "2rem",
          top: "2rem"
        }}
      >
        <Icon
          name="arrow left"
          size="large"
          className="hoverable"
          onClick={() => {
            window.location.href = "/Home";
          }}
        />
        Go Home
      </div>
      <Container style={{ marginTop: "2rem" }}>
        <Header textAlign="center">Hello, {props.userData.username}!</Header>
        <div style={{ textAlign: "center" }}>Welcome to the Admin Portal</div>
        <Segment>
          <Header textAlign="center">Authorized Users</Header>
          <Table compact celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Access Level</Table.HeaderCell>
                <Table.HeaderCell>Created On</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users ? (
                renderTable()
              ) : (
                <div
                  style={{
                    display: "flex",
                    minHeight: "5rem",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                  }}
                >
                  <Loader active inline />
                </div>
              )}
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <AddUserModal
                    users={users}
                    createNotification={createNotification}
                    checkAuth={checkAuth}
                  />
                  <EditUserModal
                    users={users}
                    createNotification={createNotification}
                    checkAuth={checkAuth}
                  />
                  <Button
                    size="small"
                    icon
                    onClick={() => {
                      setUsers(null); // fake loading
                      getUsers();
                    }}
                  >
                    <Icon name="refresh" />
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </Container>
      <NotificationContainer />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal);
