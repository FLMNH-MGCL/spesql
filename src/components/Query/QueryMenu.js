import React, { useState } from "react";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import CreateSelectModal from "./CreateSelectModal";
import CreateCountModal from "./CreateCountModal";
import "./QueryGrid.css";
import CreateUpdateModal from "./CreateUpdateModal";

export default function QueryMenu(props) {
  const [showSelect, toggleSelect] = useState(false);
  const [showCount, toggleCount] = useState(false);
  const [showUpdate, toggleUpdate] = useState(false);

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
        />
      );
    }
  }

  return (
    <Dropdown
      className="hideIcon"
      trigger={
        <Button icon labelPosition="right">
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

        {!props.disabled && (
          <Dropdown.Item
            icon="cloud upload"
            text="Update"
            onClick={() => {
              toggleUpdate(true);
            }}
          />
        )}
        {renderSelectedModal()}
      </Dropdown.Menu>
    </Dropdown>
  );
}
