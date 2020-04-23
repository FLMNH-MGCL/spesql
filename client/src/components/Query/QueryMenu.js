import React, { useState } from "react";
import { Button, Icon, Modal, Divider, Dropdown } from "semantic-ui-react";
import { SELECT, UPDATE, COUNT } from "./QueryTypes";
import CreateSelectModal from "./CreateSelectModal";
import CreateCountModal from "./CreateCountModal";
import "./QueryGrid.css";
import UPDATE_BATCH from "./QueryTypes/UPDATE_BATCH";
import CreateUpdateModal from "./CreateUpdateModal";

export default function QueryMenu(props) {
  // const { dbSelection, loading } = this.state;
  // if (dbSelection.length === 0 && loading) {
  //   this.initTableOptions();
  // }
  const [open, toggle] = useState(false);
  const [showSelect, toggleSelect] = useState(false);
  const [showCount, toggleCount] = useState(false);
  const [showUpdate, toggleUpdate] = useState(false);

  console.log(open);

  return (
    <Dropdown
      className="hideIcon"
      open={open}
      trigger={
        <Button icon labelPosition="right" onClick={() => toggle(!open)}>
          Query <Icon name="angle down" />
        </Button>
      }
      closeOnChange
      floating
    >
      <Dropdown.Menu onMouseLeave={() => setTimeout(() => toggle(false), 100)}>
        <Dropdown.Header icon="archive" content="Select a query type" />
        <Dropdown.Divider />
        <CreateSelectModal
          trigger={
            <Dropdown.Item
              icon="cloud download"
              text="Select"
              onClick={() => {
                toggle(!open);
                toggleSelect(true);
              }}
            />
          }
          open={showSelect}
          closeModal={() => {
            toggleSelect(false);
          }}
          props={props}
        />
        <CreateCountModal
          trigger={
            <Dropdown.Item
              icon="info"
              text="Count"
              onClick={() => {
                toggle(!open);
                toggleCount(true);
              }}
            />
          }
          open={showCount}
          closeModal={() => {
            toggleCount(false);
          }}
          props={props}
        />
        {props.disabled ? (
          ""
        ) : (
          <CreateUpdateModal
            trigger={
              <Dropdown.Item
                icon="cloud upload"
                text="Update"
                onClick={() => {
                  toggle(!open);
                  toggleUpdate(true);
                }}
              />
            }
            open={showUpdate}
            closeModal={() => {
              toggleUpdate(false);
            }}
            props={props}
          />
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
