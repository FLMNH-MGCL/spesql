import React, { useState } from "react";
import { Button, Modal, Icon, Form, Input, Container } from "semantic-ui-react";

export default function({ checkAuth, handleSubmit }) {
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
          <Button color="green" onClick={() => setShow(true)}>
            Submit
          </Button>
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
