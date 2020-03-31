import React, { useState } from "react";
import { Form, Grid, Input, Button, Message, Segment } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { mapStateToProps, mapDispatchToProps } from "../../redux/mapFunctions";
import { connect } from "react-redux";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
// import HeaderBase from '../../components/Header/HeaderBase'

// async function attemptLogin(username, password) {
//   let loggedIn = axios
//     .post("/api/login/", { user: username, password: password })
//     .then(response => {
//       console.log(response);
//       const data = response.data;
//       return data.logged_in;
//     });

//   return loggedIn;
// }

// async function onSubmit() {
//   let loggedIn = await attemptLogin(this.state.username, this.state.password);
//   console.log(loggedIn);

//   if (loggedIn) {
//     sessionStorage.setItem("authenticated", true);
//     this.onSuccess();
//   } else {
//     sessionStorage.setItem("authenticated", false);
//     this.onFail();
//   }
// }

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  //const [userData, setUserData] = useState();
  // const [sucess, setSucess] = useState(false)

  const createNotification = content => {
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

  const attemptLogin = () => {
    let authData = axios
      .post("/api/login/", {
        user: username,
        password: password
      })
      .then(response => {
        if (response.err) {
          console.log(response.err);
        } else {
          const { message, userData, authed } = response.data;
          console.log(message);

          props.setUserData(userData);
          props.setAuth(authed);
        }
      })
      .catch(error => {
        console.log("login failed...");
        console.log(error);
        createNotification({
          type: "error",
          message: "Authentication failed."
        });
      });
  };

  const onSubmit = () => {
    if (username.length < 1 || password.length < 1) {
      setErrorMessage("Please enter non-null values");
    } else {
      attemptLogin();
    }
  };

  if (props.authenticated) {
    return <Redirect to="/Home" />;
  }

  return (
    <div>
      <div className="form-pad">
        <Grid centered padded>
          <Grid.Column textAlign="left" width={5}>
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Field
                  control={Input}
                  placeholder="Username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e, { value }) => setUsername(value)}
                  width={16}
                />
              </Form.Group>
              <Form.Group>
                <Form.Field
                  control={Input}
                  type="password"
                  placeholder="Password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e, { value }) => setPassword(value)}
                  width={16}
                />
              </Form.Group>
              <Form.Group className="form-button">
                <Form.Field control={Button} content="Submit" />
              </Form.Group>
            </Form>

            <div style={{ textAlign: "center" }}>
              Don't have an account? You can{" "}
              <a href="mailto:kawahara@flmnh.ufl.edu">request</a> one here.
            </div>

            <Message
              error
              hidden={!errorMessage}
              style={{ textAlign: "center" }}
            >
              <Message.Header>Login error</Message.Header>
              <p>{errorMessage}</p>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
