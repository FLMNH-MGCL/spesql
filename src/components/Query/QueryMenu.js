import React, { useState } from "react";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import "./QueryGrid.css";
import CreateSelectModal from "./CreateSelectModal";
import CreateCountModal from "./CreateCountModal";
import CreateUpdateModal from "./CreateUpdateModal";
import axios from "axios";

export default function QueryMenu(props) {
  const [showSelect, toggleSelect] = useState(false);
  const [showCount, toggleCount] = useState(false);
  const [showUpdate, toggleUpdate] = useState(false);

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
    if (showSelect) {
      return (
        <CreateSelectModal
          closeModal={() => toggleSelect(false)}
          props={props}
          open={showSelect}
        />
      );
    } else if (showCount) {
      return (
        <CreateCountModal
          closeModal={() => toggleCount(false)}
          props={props}
          open={showCount}
        />
      );
    } else if (showUpdate) {
      return (
        <CreateUpdateModal
          closeModal={() => toggleUpdate(false)}
          props={props}
          open={showUpdate}
          checkAuth={checkAuth}
        />
      );
    }
  }

  return (
    <>
      <Dropdown
        className="hideIcon"
        trigger={
          <Button icon labelPosition="left">
            Query <Icon name="angle down" />
          </Button>
        }
        closeOnChange
        floating
      >
        <Dropdown.Menu>
          <Dropdown.Header icon="upload" content="Select query type" />
          <Dropdown.Item
            icon="cloud download"
            text="Select"
            onClick={() => {
              toggleSelect(true);
            }}
          />
          <Dropdown.Item
            icon="info"
            text="Count"
            onClick={() => {
              toggleCount(true);
            }}
          />

          <Dropdown.Item
            icon="cloud upload"
            text="Update"
            disabled={props.disabled}
            onClick={() => {
              if (!props.disabled) {
                toggleUpdate(true);
              }
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
      {renderSelectedModal()}
    </>
  );
}
