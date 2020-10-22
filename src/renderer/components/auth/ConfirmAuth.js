import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Container } from "semantic-ui-react";

export default function ({
  checkAuth,
  handleSubmit,
  buttonStyle,
  buttonLoading,
  passCredentials,
  disabled,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {}, [buttonLoading]);

  const authCallback = () => {
    checkAuth(username, password, handleSubmit);
    setShow(false);
  };

  return (
    <>
      <Modal
        trigger={
          buttonStyle ? (
            <Button
              icon={buttonStyle.icon ? true : false}
              labelPosition="left"
              color={buttonStyle.color}
              onClick={() => setShow(true)}
              loading={buttonLoading ? buttonLoading : false}
              disabled={disabled ? disabled : false}
            >
              {buttonStyle.icon ? buttonStyle.icon : null}
              {buttonStyle.text}
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "#5c6ac4", color: "#fff" }}
              onClick={() => setShow(true)}
              loading={buttonLoading ? buttonLoading : false}
              disabled={disabled ? disabled : false}
            >
              Submit
            </Button>
          )
        }
        size="mini"
        open={show}
        onClose={() => setShow(false)}
      >
        <Modal.Header>Confirm Authentication</Modal.Header>
        <Modal.Content>
          <Container>
            <Form>
              <Form.Field
                control={Input}
                label="Username"
                value={username}
                onChange={(e, { value }) => setUsername(value)}
              />
              <Form.Field
                control={Input}
                label="Password"
                type="password"
                value={password}
                onChange={(e, { value }) => setPassword(value)}
              />
            </Form>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button
            onClick={authCallback}
            style={{ backgroundColor: "#5c6ac4", color: "#fff" }}
          >
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
