import React, { useState } from "react";
import { Button, Modal, Form, Input, Container, Icon } from "semantic-ui-react";

export default function ({ checkAuth, handleSubmit, buttonStyle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

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
            >
              {buttonStyle.icon ? buttonStyle.icon : null}
              {buttonStyle.text}
            </Button>
          ) : (
            <Button
              icon
              labelPosition="left"
              color="green"
              onClick={() => setShow(true)}
            >
              <Icon name="check" />
              Submit
            </Button>
          )
        }
        open={show}
        onClose={() => setShow(false)}
      >
        <Modal.Header>Confirm Authentication</Modal.Header>
        <Modal.Content>
          <Container>
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="username"
                  value={username}
                  onChange={(e, { value }) => setUsername(value)}
                />
                <Form.Field
                  control={Input}
                  label="password"
                  type="password"
                  value={password}
                  onChange={(e, { value }) => setPassword(value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <Button onClick={authCallback} color="green">
                    Confirm
                  </Button>
                </Form.Field>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Content>
      </Modal>
    </>
  );
}
