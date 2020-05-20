import React, { useState } from "react";
import { Dropdown, Button, Icon } from "semantic-ui-react";
import CreatePasteModal from "./CreatePasteModal";
import CreateManualModal from "./CreateManualModal";
import axios from "axios";
import "./InsertDocument.css";

export default function InsertMenu(props) {
  // const [open, toggle] = useState(false);
  const [showPaste, togglePaste] = useState(false);
  const [showManual, toggleManual] = useState(false);

  async function checkAuth(user, password, callback) {
    if (props.userData.username !== user) {
      // attempting auth with diff account
      props.notify({
        type: "error",
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

    const authData = await axios.post("/api/login/", {
      user: user,
      password: password,
    });

    // console.log(authData);

    if (authData.data.err || authData.data.authed === false) {
      // credentials did not match
      props.notify({ type: "error", message: authData.data.err });
    } else {
      // allow whatever command to proceed
      props.notify({ type: "success", message: authData.data.message });
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
        />
      );
    } else if (showManual) {
      return (
        <CreateManualModal
          closeModal={() => toggleManual(false)}
          props={props}
          open={showManual}
          checkAuth={checkAuth}
        />
      );
    }
  }

  return (
    <>
      <Dropdown
        className="hideIcon"
        // open={open}
        trigger={
          <Button icon labelPosition="right">
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