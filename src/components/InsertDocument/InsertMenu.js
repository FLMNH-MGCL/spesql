import React, { useState } from "react";
import { Dropdown, Button, Icon } from "semantic-ui-react";
import CreatePasteModal from "./CreatePasteModal";
import CreateManualModal from "./CreateManualModal";
import "./InsertDocument.css";

export default function InsertMenu(props) {
  // const [open, toggle] = useState(false);
  const [showPaste, togglePaste] = useState(false);
  const [showManual, toggleManual] = useState(false);

  function renderSelectedModal() {
    if (showPaste) {
      return (
        <CreatePasteModal
          closeModal={() => togglePaste(false)}
          props={props}
          open={showPaste}
        />
      );
    } else if (showManual) {
      return (
        <CreateManualModal
          closeModal={() => toggleManual(false)}
          props={props}
          open={showManual}
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
