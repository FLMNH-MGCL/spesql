import React, { useState, useEffect } from "react";
import * as fs from "fs";
import axios from "axios";
import {
  Segment,
  Header,
  Container,
  Form,
  Input,
  Icon,
  Button,
  Loader,
} from "semantic-ui-react";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import _ from "lodash";
import CreateConfigModal from "./CreateConfigModal";

function createNotification(content) {
  switch (content.type) {
    case "success":
      NotificationManager.success(`${content.message}`, "Success!");
      break;
    case "warning":
      NotificationManager.warning(`${content.message}`, "Warning!", 4000);
      break;
    case "error":
      NotificationManager.error(`${content.message}`, "Error!");
      break;
    default:
  }
}

function ConfigInputField(props) {
  const { label, update } = props;
  const currentValue = props.value;

  const [show, setShow] = useState(false);
  return (
    <Form.Field
      control={Input}
      icon={
        <Icon
          name={show ? "eye" : "eye slash"}
          link
          onClick={() => setShow(!show)}
        />
      }
      type={show ? "text" : "password"}
      placeholder="Password"
      label={label}
      name={label}
      value={currentValue}
      error={!currentValue}
      onChange={(e, { value }) => update(value)}
      required
    />
  );
}

export default function Settings() {
  const [configExists, setExistence] = useState(undefined);
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [fetching, setFetching] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    async function fetchConfig() {
      const config = await axios.post("/api/config-check").catch((error) => {
        // console.log(error.response);
        return null;
      });

      if (config && config.data) {
        setExistence(config.data);

        setHost(config.data.host);
        setPort(config.data.port);
        setUser(config.data.user);
        setPassword(config.data.password);
        setDatabase(config.data.database);
      }

      setFetching(false);
    }

    if (!configExists || shouldRefetch) {
      // fetch
      fetchConfig();
      setShouldRefetch(false);
    }

    setFetching(false);
  }, [configExists, shouldRefetch]);

  function getNewValues() {
    if (configExists) {
      return {
        host: configExists.host !== host ? host : configExists.host,
        port: configExists.port !== port ? port : configExists.port,
        user: configExists.user !== user ? user : configExists.user,
        password:
          configExists.password !== password ? password : configExists.password,
        database:
          configExists.database !== database ? database : configExists.database,
      };
    }

    return {
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
    };
  }

  async function updateConfig(newConfig) {
    const updateResponse = await axios.post("/api/update-config", {
      newConfig,
    });

    // console.log(updateResponse);
    setShouldRefetch(true);
  }

  async function createConfig(newConfig) {
    const createResponse = await axios
      .post("/api/create-config", {
        newConfig,
      })
      .catch((error) => {});

    if (createResponse) {
      createNotification({
        type: "success",
        message: "Created JSON configuration file",
      });
    } else {
      createNotification({
        type: "error",
        message: "Server error: Could not create JSON file.",
      });
    }

    // console.log(updateResponse);
    setShouldRefetch(true);
  }

  function getJSON(text) {
    try {
      const json = JSON.parse(text);
      if (
        json.host &&
        json.port &&
        json.user &&
        json.password &&
        json.database &&
        Object.keys(json).length === 5
      ) {
        return json;
      }
    } catch {
      return null;
    }
  }

  function textToJson(text) {
    const json = getJSON(text);

    if (!json) {
      // create notif
      createNotification({
        type: "error",
        message: "Either invalid JSON entered or JSON is missing keys",
      });
    } else {
      setHost(json.host);
      setPort(json.port);
      setUser(json.user);
      setPassword(json.password);
      setDatabase(json.database);

      createNotification({
        type: "success",
        message: "Imported JSON configuration",
      });
    }
  }

  function submit() {
    const newConfig = getNewValues();

    if (configExists && !_.isEqual(configExists, newConfig)) {
      // UPDATE
      updateConfig(newConfig);
    } else if (!configExists) {
      // CREATE
      createConfig(newConfig);
    } else {
      // NOTHING
      // newConfig === configExits
      createNotification({ type: "warning", message: "No changes detected" });
    }
  }

  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          left: "2rem",
          top: "2rem",
        }}
      >
        <Icon
          name="arrow left"
          size="large"
          className="hoverable"
          onClick={() => {
            window.history.back();
          }}
        />
        Go back
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "auto",
          minHeight: "100vh",
        }}
      >
        <Segment>
          <Header textAlign="center" style={{ paddingTop: "1rem" }}>
            Config Data
          </Header>
          <Container>
            {fetching ? (
              <div
                style={{
                  height: "30rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  margin: "auto",
                }}
              >
                <Loader active inline />
              </div>
            ) : (
              <React.Fragment>
                {!configExists && (
                  <div style={{ textAlign: "center" }}>
                    <p>
                      A config could not be located in the file system. Please
                      fill out the form below with valid credentials to start
                      using spesql.{" "}
                    </p>
                    <br />
                    <p style={{ color: "#5c6ac4" }}>
                      You must restart the application <b>fully</b> after
                      updating the config file.
                    </p>
                  </div>
                )}

                {configExists && (
                  <div style={{ textAlign: "center" }}>
                    <p>
                      A config file was detected in the file system. If you
                      would like to make edits, please fill out the entire form
                      below with valid credentials.{" "}
                    </p>
                    <br />
                    <p style={{ color: "#5c6ac4" }}>
                      You must restart the application <b>fully</b> after
                      updating the config file.
                    </p>
                  </div>
                )}

                <Form
                  style={{
                    padding: "6rem",
                    paddingTop: "2rem",
                    paddingBottom: "3rem",
                  }}
                  onSubmit={submit}
                >
                  <ConfigInputField
                    label="Host"
                    value={host}
                    update={setHost}
                  />
                  <ConfigInputField
                    label="Port"
                    value={port}
                    update={setPort}
                  />
                  <ConfigInputField
                    label="User"
                    value={user}
                    update={setUser}
                  />
                  <ConfigInputField
                    label="Password"
                    value={password}
                    update={setPassword}
                  />
                  <ConfigInputField
                    label="Database"
                    value={database}
                    update={setDatabase}
                  />
                  <Button.Group>
                    <Button
                      style={{ backgroundColor: "#5c6ac4", color: "#fff" }}
                      type="submit"
                    >
                      {configExists ? "Update" : "Create"}
                    </Button>
                    <Button.Or />
                    <CreateConfigModal
                      populate={textToJson}
                      createError={createNotification}
                    />
                  </Button.Group>
                </Form>
              </React.Fragment>
            )}
          </Container>
        </Segment>
      </div>
      {/* <NotificationContainer /> */}
    </React.Fragment>
  );
}
