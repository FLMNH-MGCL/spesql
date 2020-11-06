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
import "./styles.css";
import AddTableModal from "./components/AddTableModal";
import EditTableModal from "./components/EditTableModal";
import CreateErrorLogModal from "../../components/modals/CreateErrorLogModal";

const PREFIX = process.env.NODE_ENV === "production" ? PUBLIC_URL : "";

function AdminPortal(props) {
  const notify = props.notify;
  const [users, setUsers] = useState();
  const [tables, setTables] = useState();

  async function checkAuth(user, password, callback) {
    // console.log(`${user} vs ${password}`);

    if (props.userData.username !== user) {
      // attempting auth with diff account
      notify({
        type: "error",
        title: "Authorization failed",
        message:
          "Attempting authentication with different credentials than logged in account.",
      });
      return;
    } else if (props.userData.privilege_level !== "admin") {
      // this should NEVER happen, however this is a sanity check
      notify({
        type: "error",
        title: "Authorization failed",
        message: "Authorization failed or access was denied",
      });

      // forcibly log out
      props.logout();
      return;
    }

    const authData = await axios
      .post(PREFIX + "/api/login/", {
        user: user,
        password: password,
      })
      .catch((error) => {
        return null;
      });

    // console.log(authData);

    if (!authData || authData.data.err || authData.data.authed === false) {
      // credentials did not match
      notify({
        type: "error",
        title: "Authorization failed",
        message: "Authorization either failed or was denied",
      });
    } else {
      // allow whatever command to proceed
      callback({ username: user, pass: password });
    }
  }

  async function getUsers() {
    const res = await axios.get(PREFIX + "/api/admin/fetch-users/");
    // console.log(res);

    if (res.status !== 200 || res.err) {
      notify({
        type: "error",
        title: "Connection error",
        message: "Could not load users, please check internet/VPN connection",
      });
    } else {
      setUsers(res.data);
    }
  }

  async function getTables() {
    const res = await axios.get(PREFIX + "/api/admin/list-tables/");

    if (res.status !== 200 || res.err) {
      notify({
        type: "error",
        title: "Connection error",
        message: "Could not load tables, please check internet connection",
      });
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
        <Table.Row key={user.username}>
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
        <Table.Row key={table.tbl_name}>
          <Table.Cell>{table.tbl_name}</Table.Cell>
          <Table.Cell>{table.minimum_access_update}</Table.Cell>
          <Table.Cell>{table.minimum_access_select}</Table.Cell>
          <Table.Cell>{table.minimum_access_delete}</Table.Cell>
        </Table.Row>
      );
    });

    return sqlTables;
  }

  function refreshUsers() {
    setUsers(null);
    getUsers();
  }

  function refreshTables() {
    setTables(null); // fake loading
    getTables();
  }

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
            window.location.hash = "/";
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
                    notify={notify}
                    errors={props.errorMessages.adminUserError}
                    updateError={props.updateAdminUserErrorMessage}
                    checkAuth={checkAuth}
                    refreshUsers={refreshUsers}
                  />
                  <EditUserModal
                    users={users}
                    notify={notify}
                    checkAuth={checkAuth}
                    errors={props.errorMessages.adminUserError}
                    updateError={props.updateAdminUserErrorMessage}
                    currentUser={props.userData}
                    refreshUsers={refreshUsers}
                  />
                  <Button size="small" icon onClick={refreshUsers}>
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
                    notify={notify}
                    errors={props.errorMessages.adminTblError}
                    updateError={props.updateAdminTableErrorMessage}
                    refresh={refreshTables}
                  />
                  <EditTableModal
                    tables={tables}
                    checkAuth={checkAuth}
                    notify={notify}
                    errors={props.errorMessages.adminTblError}
                    updateError={props.updateAdminTableErrorMessage}
                    refresh={refreshTables}
                  />

                  <Button size="small" icon onClick={refreshTables}>
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
      </Container>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal);