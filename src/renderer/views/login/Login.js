import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Message,
  Segment,
  Header,
  Image,
  Icon,
} from "semantic-ui-react";
import "./Login.css";
import axios from "axios";
import { mapStateToProps, mapDispatchToProps } from "../../redux/mapFunctions";
import { connect } from "react-redux";
import flmnhLogo from "../../assets/flmnhLogo.png";
// import HeaderBase from '../../components/Header/HeaderBase'

const PREFIX = process.env.NODE_ENV === "production" ? PUBLIC_URL : "";

function Login(props) {
  const notify = props.notify;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [showPass, setShowPass] = useState(false);

  const attemptLogin = async () => {
    let resStatus = null;
    let authData = await axios
      .post(PREFIX + "/api/login/", {
        user: username,
        password: password,
      })
      .catch((error) => {
        resStatus = error.response.status;
        return null;
      });

    if (!authData || resStatus === 401) {
      notify({
        type: "error",
        title: "Authentication failed",
        message: "Authentication either failed or was denied",
      });
      return;
    }

    if (authData.data.error) {
      if (resStatus === 503) {
        window.location.hash = "/fourohfour";
      }
    } else {
      notify({
        type: "success",
        title: "Authentication successful",
        message: "You will be redirected shortly",
      });

      setTimeout(() => {
        const { userData, authed } = authData.data;

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
    window.location.hash = "/";
  }

  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: "2rem",
          top: "2rem",
        }}
        title="See Config Settings"
      >
        <Icon
          name="cog"
          size="big"
          className="hoverable"
          onClick={() => {
            window.location.hash = "/settings";
          }}
        />
      </div>
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
            src={flmnhLogo}
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
                icon="user"
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
                icon={
                  <Icon
                    name={showPass ? "eye" : "eye slash"}
                    link
                    onClick={() => setShowPass(!showPass)}
                  />
                }
                type={showPass ? "text" : "password"}
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
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
