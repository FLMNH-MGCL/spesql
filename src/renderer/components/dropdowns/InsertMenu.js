import React, { useState, useEffect } from "react";
import { Dropdown, Button, Icon } from "semantic-ui-react";
import CreatePasteModal from "../modals/CreatePasteModal";
import CreateManualModal from "../modals/CreateManualModal";
import axios from "axios";
import "./InsertDocument.css";

export default function InsertMenu(props) {
  const [showPaste, togglePaste] = useState(false);
  const [showManual, toggleManual] = useState(false);
  const [tableOptions, setTableOptions] = useState();

  useEffect(() => {
    if (!tableOptions) {
      async function initTableOptions(queryType) {
        let dbSelection = [];
        const { userData } = props;
        await axios
          .post("/api/list-tables/", {
            privilege_level: userData.privilege_level,
            query_type: queryType,
          })
          .then((response) => {
            if (response.data.error) {
              setTableOptions([]);
              // notify with error in getting tables
            } else {
              dbSelection = response.data.tables.map((table, index) => {
                return { key: index + 1 * 1002, text: table, value: table };
              });

              // console.log(dbSelection);
              // this.setState({ dbSelection: dbSelection, loadingOptions: false });
              setTableOptions(dbSelection);
            }
          });
      }
      initTableOptions("insert");
    }
  });

  async function checkAuth(user, password, callback) {
    if (props.userData.username !== user) {
      // attempting auth with diff account
      props.notify({
        type: "error",
        title: "Authorization failed",
        message:
          "Attempting authentication with different account than logged in account.",
      });
      return;
    } else if (
      props.userData.privilege_level !== "admin" &&
      props.userData.privilege_level !== "manager"
    ) {
      // this should NEVER happen, however this is a sanity check
      props.notify({ type: "error", message: "Access denied!" });

      // forcibly log out
      props.logout();
      return;
    }

    const authData = await axios
      .post("/api/login/", {
        user: user,
        password: password,
      })
      .catch((error) => {
        // resStatus = error.response.status;
        return null;
      });

    // console.log(authData);

    if (!authData || authData.data.err || authData.data.authed === false) {
      // credentials did not match
      props.notify({
        type: "error",
        title: "Authorization failed",
        message: "Authorization either failed or denied",
      });
    } else {
      // allow whatever command to proceed
      // props.notify({ type: "success", message: authData.data.message });
      callback();
    }
  }

  function renderSelectedModal() {
    if (showPaste) {
      return (
        <CreatePasteModal
          closeModal={() => togglePaste(false)}
          props={props}
          open={showPaste}
          checkAuth={checkAuth}
          tableOptions={tableOptions}
        />
      );
    } else if (showManual) {
      return (
        <CreateManualModal
          closeModal={() => toggleManual(false)}
          props={props}
          open={showManual}
          checkAuth={checkAuth}
          tableOptions={tableOptions}
        />
      );
    }
  }

  console.log(props);

  return (
    <>
      <Dropdown
        className="hideIcon"
        // open={open}
        trigger={
          <Button icon labelPosition="left">
            Insert <Icon name="angle down" />
          </Button>
        }
        closeOnChange
        floating
      >
        <Dropdown.Menu>
          <Dropdown.Header icon="upload" content="Select insert method" />
          <Dropdown.Item
            icon="paste"
            text="CSV"
            onClick={() => togglePaste(true)}
          />
          <Dropdown.Item
            icon="wordpress forms"
            text="Manual"
            onClick={() => toggleManual(true)}
          />
        </Dropdown.Menu>
      </Dropdown>
      {renderSelectedModal()}
    </>
  );
}
