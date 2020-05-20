import React, { useState } from "react";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import CreateSelectModal from "./CreateSelectModal";
import CreateCountModal from "./CreateCountModal";
import "./QueryGrid.css";
import CreateUpdateModal from "./CreateUpdateModal";
import axios from "axios";
import useBoolean from "../../utils/useBoolean";
import OutsideClickHandler from "react-outside-click-handler";

export default function QueryMenu(props) {
  const [showSelect, toggleSelect] = useState(false);
  const [showCount, toggleCount] = useState(false);
  const [showUpdate, toggleUpdate] = useState(false);
  const [open, { off, toggle }] = useBoolean(false);

  // console.log(`${user} vs ${password}`);

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
    <OutsideClickHandler onOutsideClick={off}>
      <Dropdown
        className="hideIcon"
        open={open}
        trigger={
          <Button icon labelPosition="right" onClick={toggle}>
            Query <Icon name="angle down" />
          </Button>
        }
        closeOnChange
        floating
      >
        <Dropdown.Menu>
          <Dropdown.Header icon="archive" content="Select a query type" />
          <Dropdown.Divider />
          <Dropdown.Item
            icon="cloud download"
            text="Select"
            onClick={() => {
              toggle();
              toggleSelect(true);
            }}
          />
          <Dropdown.Item
            icon="info"
            text="Count"
            onClick={() => {
              toggle();
              toggleCount(true);
            }}
          />

          {!props.disabled && (
            <Dropdown.Item
              icon="cloud upload"
              text="Update"
              onClick={() => {
                toggle();
                toggleUpdate(true);
              }}
            />
          )}
          {renderSelectedModal()}
        </Dropdown.Menu>
      </Dropdown>
    </OutsideClickHandler>
  );
}
