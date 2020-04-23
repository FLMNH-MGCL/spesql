import React, { useState } from "react";
import { Dropdown, Button, Icon } from "semantic-ui-react";
import CreatePasteModal from "./CreatePasteModal";
import CreateManualModal from "./CreateManualModal";

export default function InsertMenu(props) {
  const [open, toggle] = useState(false);
  const [showPaste, togglePaste] = useState(false);
  const [showManual, toggleManual] = useState(false);

  return (
    <Dropdown
      className="hideIcon"
      open={open}
      trigger={
        <Button icon labelPosition="right" onClick={() => toggle(!open)}>
          Insert <Icon name="angle down" />
        </Button>
      }
      closeOnChange
      floating
    >
      <Dropdown.Menu onMouseLeave={() => setTimeout(() => toggle(false), 100)}>
        <Dropdown.Header icon="upload" content="Select insert method" />
        <CreatePasteModal
          trigger={
            <Dropdown.Item
              icon="paste"
              text="Paste"
              onClick={() => {
                toggle(!open);
                togglePaste(true);
              }}
            />
          }
          open={showPaste}
          closeModal={() => {
            togglePaste(false);
          }}
          props={props}
        />

        <CreateManualModal
          trigger={
            <Dropdown.Item
              icon="wordpress forms"
              text="Manual"
              onClick={() => {
                toggle(!open);
                toggleManual(true);
              }}
            />
          }
          open={showManual}
          closeModal={() => {
            toggleManual(false);
          }}
          props={props}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}
