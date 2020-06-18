import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../redux/mapFunctions";
import { parseDate } from "../../functions/queryChecks";
import {
  Button,
  Icon,
  Table,
  Container,
  Loader,
  Segment,
  Header,
} from "semantic-ui-react";
import axios from "axios";
import AddUserModal from "./components/AddUserModal";
import EditUserModal from "./components/EditUserModal";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "./styles.css";
import AddTableModal from "./components/AddTableModal";
import EditTableModal from "./components/EditTableModal";
import CreateErrorLogModal from "../../components/Error/CreateErrorLogModal";

const createNotification = (content) => {
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
  const [tables, setTables] = useState();
  const [error, setError] = useState();

  async function checkAuth(user, password, callback) {
    // console.log(`${user} vs ${password}`);

    if (props.userData.username !== user) {
      // attempting auth with diff account
      createNotification({
        type: "error",
        message:
          "Attempting authentication with different account than logged in account.",
      });
      return;
    } else if (props.userData.privilege_level !== "admin") {
      // this should NEVER happen, however this is a sanity check
      createNotification({ type: "error", message: "Access denied!" });

      // forcibly log out
      props.logout();
      return;
    }

    const authData = await axios.post("/api/login/", {
      user: user,
      password: password,
    });

    // console.log(authData);

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
      console.log(error);
    } else {
      setUsers(res.data);
    }
  }

  async function getTables() {
    const res = await axios.get("/api/admin/list-tables/");

    if (res.status !== 200 || res.err) {
      setError(res.err);
    } else {
      setTables(res.data.tables);
    }
  }

  useEffect(() => {
    if (!users) {
      getUsers();
    }

    if (!tables) {
      getTables();
    }
  });

  function renderUserTable() {
    if (!users) return; // safety check
    // console.log(users);
    const userTable = users.map((user) => {
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
  }

  function renderTables() {
    if (!tables) return;

    const sqlTables = tables.map((table) => {
      return (
        <Table.Row>
          <Table.Cell>{table.tbl_name}</Table.Cell>
          <Table.Cell>{table.minimum_access_update}</Table.Cell>
          <Table.Cell>{table.minimum_access_select}</Table.Cell>
          <Table.Cell>{table.minimum_access_delete}</Table.Cell>
        </Table.Row>
      );
    });

    return sqlTables;
  }

  // const userSelection = () => {};

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "2rem",
          top: "2rem",
        }}
      >
        <Icon
          name="arrow left"
          size="large"
          className="hoverable"
          onClick={() => {
            window.location.hash = "/home";
          }}
        />
        Go Home
      </div>
      <Container style={{ marginTop: "2rem" }}>
        <Header textAlign="center">Hello, {props.userData.username}!</Header>
        <div style={{ textAlign: "center" }}>Welcome to the Admin Portal</div>

        {/* TABLE OF USERS */}
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
                renderUserTable()
              ) : (
                <div
                  style={{
                    display: "flex",
                    minHeight: "5rem",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
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
                    errors={props.errorMessages.adminUserError}
                    updateError={props.updateAdminUserErrorMessage}
                    checkAuth={checkAuth}
                  />
                  <EditUserModal
                    users={users}
                    createNotification={createNotification}
                    checkAuth={checkAuth}
                    errors={props.errorMessages.adminUserError}
                    updateError={props.updateAdminUserErrorMessage}
                    currentUser={props.userData}
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
                  <CreateErrorLogModal
                    type="Admin User Operations"
                    errors={props.errorMessages.adminUserError}
                    updateError={props.updateAdminUserErrorMessage}
                    inline
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>

        {/* TABLE OF SQL TABLES */}
        <Segment style={{ marginTop: "1.5rem" }}>
          <Header textAlign="center">SQL Tables</Header>
          <Table compact celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Table Name</Table.HeaderCell>
                <Table.HeaderCell>Minimum Insert Access</Table.HeaderCell>
                <Table.HeaderCell>Minimum Select Access</Table.HeaderCell>
                <Table.HeaderCell>Minimum Update Access</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{renderTables()}</Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <AddTableModal
                    tables={tables}
                    checkAuth={checkAuth}
                    createNotification={createNotification}
                    errors={props.errorMessages.adminTblError}
                    updateError={props.updateAdminTableErrorMessage}
                    refresh={() => getTables()}
                  />
                  <EditTableModal
                    tables={tables}
                    checkAuth={checkAuth}
                    createNotification={createNotification}
                    errors={props.errorMessages.adminTblError}
                    updateError={props.updateAdminTableErrorMessage}
                    refresh={() => getTables()}
                  />

                  <Button
                    size="small"
                    icon
                    onClick={() => {
                      setTables(null); // fake loading
                      getTables();
                    }}
                  >
                    <Icon name="refresh" />
                  </Button>
                  <CreateErrorLogModal
                    type="Admin Table Operations"
                    errors={props.errorMessages.adminTblError}
                    updateError={props.updateAdminTableErrorMessage}
                    inline
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
        <div style={{ marginBottom: "2rem" }}>
          <Button
            onClick={() =>
              props.updateAdminUserErrorMessage(["This is a test"])
            }
          >
            create a user operation error
          </Button>
          <Button onClick={() => props.updateAdminUserErrorMessage(null)}>
            reset user errors
          </Button>
        </div>
        <div>
          <Button
            onClick={() =>
              props.updateAdminTableErrorMessage(["This is also a test"])
            }
          >
            create a table operation error
          </Button>
          <Button onClick={() => props.updateAdminTableErrorMessage(null)}>
            reset table errors
          </Button>
        </div>
      </Container>
      <NotificationContainer />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal);
