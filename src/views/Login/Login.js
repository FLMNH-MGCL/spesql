import React, { useState } from "react";
import {
  Form,
  Grid,
  Input,
  Button,
  Message,
  Segment,
  Header,
  Image,
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { mapStateToProps, mapDispatchToProps } from "../../redux/mapFunctions";
import { connect } from "react-redux";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
// import HeaderBase from '../../components/Header/HeaderBase'

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  //const [userData, setUserData] = useState();
  // const [sucess, setSucess] = useState(false)

  const createNotification = (content) => {
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
  };

  const attemptLogin = async () => {
    let authData = await axios.post("/api/login/", {
      user: username,
      password: password,
    });

    console.log(authData);

    if (authData.data.err) {
      createNotification({
        type: "error",
        message: "Authentication failed.",
      });
    } else {
      createNotification({
        type: "success",
        message: "Authentication successful.",
      });

      setTimeout(() => {
        const { message, userData, authed } = authData.data;
        console.log(message);

        props.setUserData(userData);
        props.setAuth(authed);
      }, 1000);
    }
  };

  const onSubmit = () => {
    if (username.length < 1 || password.length < 1) {
      setErrorMessage("Please enter non-null values");
    } else {
      attemptLogin();
    }
  };

  if (props.authenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <div className="login-container">
        <Segment
          style={{
            display: "grid",
            minWidth: "30%",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <Header
            textAlign="center"
            style={{ paddingBottom: ".5rem", marginTop: "1rem" }}
          >
            Welcome to SpeSQL!
          </Header>
          <Image
            src={require("../../assets/flmnhLogo.png")}
            size="small"
            style={{ margin: "0 auto", marginBottom: "1rem" }}
            bordered
          />
          <p
            style={{
              width: "80%",
              justifySelf: "center",
              marginBottom: "2rem",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            The database management application for the Florida Museum of
            Natural History
          </p>
          <Form
            onSubmit={onSubmit}
            style={{ display: "grid", justifyContent: "center" }}
          >
            <Form.Group style={{ padding: ".5rem" }}>
              <Form.Field
                control={Input}
                placeholder="Username"
                label="Username"
                name="username"
                value={username}
                onChange={(e, { value }) => setUsername(value)}
              />
            </Form.Group>
            <Form.Group style={{ padding: ".5rem" }}>
              <Form.Field
                control={Input}
                type="password"
                placeholder="Password"
                label="Password"
                name="password"
                value={password}
                onChange={(e, { value }) => setPassword(value)}
              />
            </Form.Group>

            <Form.Group
              style={{
                justifySelf: "center",
                padding: ".5rem",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {/* <Button fluid>Login</Button> */}
              <Form.Field
                style={{
                  width: "100%",
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "#5c6ac4",
                    color: "#fff",
                  }}
                >
                  Login
                </Button>
              </Form.Field>
            </Form.Group>
          </Form>

          <div
            style={{
              textAlign: "center",
              padding: ".5rem",
              marginBottom: "2rem",
            }}
          >
            Don't have an account? You can{" "}
            <a href="mailto:kawahara@flmnh.ufl.edu">request</a> one here.
          </div>

          <Message error hidden={!errorMessage} style={{ textAlign: "center" }}>
            <Message.Header>Login error</Message.Header>
            <p>{errorMessage}</p>
          </Message>
        </Segment>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
