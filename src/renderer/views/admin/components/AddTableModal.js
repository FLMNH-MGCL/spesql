import React, { useState } from "react";
import { Modal, Button, Icon, Form, Select, Input } from "semantic-ui-react";
import ConfirmAuth from "./ConfirmAuth";
import axios from "axios";

const ACCESS_LEVELS = [
  { key: "Guest", text: "Guest", value: "guest" },
  { key: "Manager", text: "Manager", value: "manager" },
  { key: "Admin", text: "Admin", value: "admin" },
];

const PREFIX = process.env.NODE_ENV === "production" ? PUBLIC_URL : "";

export default function AddTableModal({
  tables,
  checkAuth,
  notify,
  refresh,
  errors,
  updateError,
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [minSel, setMinSel] = useState("guest");
  const [minIns, setMinIns] = useState("manager");
  const [minUp, setMinUp] = useState("manager");
  const [hasError, setHasError] = useState(false);

  const tableNames = tables ? tables.map((table) => table.tbl_name) : [];

  function resetState() {
    setOpen(false);
    setName("");
    setMinSel("guest");
    setMinIns("manager");
    setMinUp("manager");
    setHasError(false);
  }

  async function registerTable(tableAttributes) {
    // axios to register table to admin table of tables
    const registerResponse = await axios.post(
      PREFIX + "/api/admin/register-table/",
      {
        tableAttributes: tableAttributes,
      }
    );

    // console.log(registerResponse);
    if (registerResponse.data.data) {
      // notify({
      //   type: "success",
      //   message: registerResponse.data.data,
      // });
      return true;
    } else {
      notify({
        type: "error",
        title: "Errors occurred",
        message: registerResponse.data.sqlMessage.sqlMessage,
      });

      updateError([registerResponse.data.sqlMessage.sqlMessage]);
      return false;
    }
  }

  async function handleSubmit(adminData) {
    if (hasError) {
      notify({
        type: "error",
        title: "Errors in form",
        message: "You must fix errors in form.",
      });

      return;
    }

    const tableAttributes = {
      tbl_name: name,
      minimum_access_update: minUp,
      minimum_access_insert: minIns,
      minimum_access_select: minSel,
    };

    // axios to create table
    let resStatus = 200;
    const creationResponse = await axios
      .post(PREFIX + "/api/admin/create-table/", {
        tableName: name,
        adminUser: adminData.username,
        adminPass: adminData.pass,
      })
      .catch((error) => {
        return { error: error.response };
      });

    if (creationResponse.error) {
      const error = creationResponse.error;
      updateError([error.data]);

      if (error.status === 503) {
        notify({
          type: "error",
          title: "Connection error",
          message: "Bad VPN/Internet connection detected",
        });
        return;
      } else if (error.status === 400) {
        notify({
          type: "error",
          title: "Authorization failed",
          message: "Missing admin credentials",
        });
        return;
      } else if (error.status === 401) {
        notify({
          type: "error",
          title: "Authorization failed",
          message: "Authorization either failed or was denied",
        });
        return;
      }
    }

    const registeredResponse = await registerTable(tableAttributes);

    if (!registeredResponse) {
      // this should never happen
      notify({
        type: "warning",
        title: "Unable to register table",
        message:
          "Table successfully created, however could not register as interactable. Please contact support and check the corresponding logs.",
      });
    } else {
      notify({
        type: "success",
        title: "Table creation completed",
        message: "Successfully created and registered table",
      });
    }
  }

  function checkName(tables) {
    if (!tables) return;
    // console.log(tables);
    if (tables.indexOf(name) > -1) {
      if (!hasError) {
        setHasError(true);
      }
      return { content: "Must enter unique table name" };
    }

    if (name.length < 4) {
      if (!hasError) {
        setHasError(true);
      }
      return { content: "Name must be at least 4 characters long." };
    }

    if (hasError) setHasError(false);
  }

  return (
    <Modal
      trigger={
        <Button
          floated="right"
          icon
          labelPosition="left"
          color="green"
          size="small"
          onClick={() => setOpen(true)}
        >
          <Icon name="table" /> Create
        </Button>
      }
      onClose={resetState}
      open={open}
      size="small"
    >
      <Modal.Header>Create a New Table</Modal.Header>
      <Modal.Content>
        <Form>
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
          <Form.Group widths="equal">
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
