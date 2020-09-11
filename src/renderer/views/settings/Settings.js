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
import _ from "lodash";
import CreateConfigModal from "./CreateConfigModal";

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

const PREFIX = process.env.NODE_ENV === "production" ? PUBLIC_URL : "";

export default function Settings(props) {
  const notify = props.notify;
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
      const config = await axios
        .post(PREFIX + "/api/config-check")
        .catch((error) => {
          console.log(error.response);
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
    const updateResponse = await axios
      .post(PREFIX + "/api/update-config", {
        newConfig,
      })
      .catch((error) => {
        return error.response;
      });

    if (updateResponse && updateResponse.data) {
      if (updateResponse.data === "Updated config file") {
        notify({
          title: "Updated JSON configuration file",
          type: "success",
          message: "Please fully close and restart the application",
        });
      } else {
        notify({
          title: "Failed to update JSON configuration file",
          type: "error",
          message: updateResponse.data,
        });
      }
    }

    setShouldRefetch(true);
  }

  async function createConfig(newConfig) {
    const createResponse = await axios
      .post(PREFIX + "/api/create-config", {
        newConfig,
      })
      .catch((error) => {});

    if (createResponse) {
      notify({
        title: "Created JSON configuation file",
        type: "success",
        message: "Please fully close and restart the application",
      });
    } else {
      notify({
        title: "Server Error: Could not create JSON file or directory.",
        type: "error",
        message:
          "This may be a permissions issue, please restart and try again.",
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
      notify({
        title: "Invalid JSON",
        type: "error",
        message: "Either invalid format entered or JSON object is missing keys",
      });
    } else {
      setHost(json.host);
      setPort(json.port);
      setUser(json.user);
      setPassword(json.password);
      setDatabase(json.database);

      notify({
        title: "Successfully imported JSON configuration",
        type: "success",
        message: "Please hit create / update to apply changes",
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
      notify({
        title: "No changes detected",
        type: "warning",
        message: "An update / creation was attempted without any new data",
      });
    }
  }

  return (
    <>
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
              <>
                {!configExists && (
                  <div style={{ textAlign: "center" }}>
                    <p>
                      A config could not be located in the file system. Please
                      fill out the form below with valid credentials to start
                      using spesql.{" "}
                    </p>
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
                      createError={notify}
                    />
                  </Button.Group>
                </Form>
              </>
            )}
          </Container>
        </Segment>
      </div>
    </>
  );
}
