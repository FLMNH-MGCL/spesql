import React, { useState } from "react";
import {
  Modal,
  Button,
  Icon,
  Form,
  Select,
  Input,
  Checkbox,
  Divider,
  Popup,
} from "semantic-ui-react";
import ConfirmAuth from "./ConfirmAuth";
// import axios from "axios";

const ACCESS_LEVELS = [
  { key: "Guest", text: "Guest", value: "guest" },
  { key: "Manager", text: "Manager", value: "manager" },
  { key: "Admin", text: "Admin", value: "admin" },
];

export default function EditTableModal({
  tables,
  checkAuth,
  createNotification,
}) {
  const [open, setOpen] = useState(false);
  const [selected, select] = useState();
  const [name, setName] = useState("");
  const [minSel, setMinSel] = useState("");
  const [minIns, setMinIns] = useState("");
  const [minUp, setMinUp] = useState("");
  const [hasError, setHasError] = useState(false);
  const [understood, setUnderstood] = useState(false);

  const tableNames = tables ? tables.map((table) => table.tbl_name) : [];
  const tableOptions = tables
    ? tables.map((table) => {
        return {
          key: table.tbl_name,
          text: table.tbl_name,
          value: table,
        };
      })
    : [];

  function resetState() {}

  function initForm(table) {
    setName(table.tbl_name);
    setMinSel(table.minimum_access_select);
    setMinIns(table.minimum_access_update);
    setMinUp(table.minimum_access_delete);
  }

  function checkName(tables) {
    if (!tables) return;
    if (
      tables
        .filter((name) => {
          return name !== selected.tbl_name;
        })
        .indexOf(name) > -1
    ) {
      if (!hasError) {
        setHasError(true);
      }
      return { content: "Must enter unique table name" };
    }

    if (name.length < 4) {
      return { content: "Name must be at least 4 characters long." };
    }

    if (hasError) setHasError(false);
  }

  function handleSubmit() {
    createNotification({
      type: "warning",
      message: "I cant do this yet! (but soon!!)",
    });
  }

  function handleDelete() {
    createNotification({
      type: "warning",
      message: "I cant do this yet! (but soon!!)",
    });
  }

  function renderEditForm() {
    return (
      <>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Table Name"
            value={name}
            onChange={(e, { value }) => setName(value)}
            error={checkName(tableNames)}
          />
          <Form.Field
            control={Select}
            options={ACCESS_LEVELS}
            label="Minimum Role for Insert"
            value={minIns}
            onChange={(e, { value }) => setMinIns(value)}
          />
        </Form.Group>
        <Form.Group widths="equal" style={{ paddingBottom: "1rem" }}>
          <Form.Field
            control={Select}
            options={ACCESS_LEVELS}
            label="Minimum Role for Update"
            value={minUp}
            onChange={(e, { value }) => setMinUp(value)}
          />
          <Form.Field
            control={Select}
            options={ACCESS_LEVELS}
            label="Minimum Role for Select"
            value={minSel}
            onChange={(e, { value }) => setMinSel(value)}
          />
        </Form.Group>

        <Divider horizontal>Or</Divider>
        <Form.Group
          style={{
            justifyContent: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Form.Field>
            <Popup
              content="This cannot be undone!"
              trigger={
                // <Button icon labelPosition="left" color="red">
                //   <Icon name="user delete" />
                //   Delete User
                // </Button>
                <ConfirmAuth
                  handleSubmit={() => {
                    if (!understood) {
                      createNotification({
                        type: "error",
                        message:
                          "You must check the disclaimer before attempting a delete.",
                      });
                    } else {
                      handleDelete();
                    }
                  }}
                  checkAuth={checkAuth}
                  buttonStyle={{
                    color: "red",
                    icon: <Icon name="trash" />,
                    labelPosition: "left",
                    text: "Delete Table",
                  }}
                />
              }
            />
          </Form.Field>
        </Form.Group>
        <Form.Group
          style={{
            justifyContent: "center",
          }}
        >
          <Form.Field
            control={Checkbox}
            label="I understand that this cannot be undone, and all data in the table would be lost."
            value={understood}
            onChange={() => setUnderstood(!understood)}
            error={!understood}
          />
        </Form.Group>
      </>
    );
  }

  return (
    <Modal
      trigger={
        <Button
          floated="right"
          icon
          labelPosition="left"
          color="yellow"
          size="small"
          onClick={() => setOpen(true)}
        >
          <Icon name="edit" /> Edit
        </Button>
      }
      size="small"
      onClose={resetState}
      open={open}
    >
      <Modal.Header>Edit a Table</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field
            control={Select}
            label="Select an existing table"
            options={tableOptions}
            value={selected}
            onChange={(e, { value }) => {
              select(value);
              initForm(value);
            }}
          />
          {selected ? renderEditForm() : null}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button icon basic color="linkedin" floated="left">
          <Icon name="question" />
        </Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <ConfirmAuth handleSubmit={handleSubmit} checkAuth={checkAuth} />
      </Modal.Actions>
    </Modal>
  );
}
