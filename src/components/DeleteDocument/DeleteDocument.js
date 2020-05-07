import React from "react";
import { Button, Modal, Checkbox, Form } from "semantic-ui-react";
import "./DeleteDocument.css";
import ConfirmAuth from "../../views/Admin/components/ConfirmAuth";

class DeleteDocument extends React.Component {
  state = { open: false, understood: false };

  show = () => this.setState({ open: true });

  handleConfirm = () => {
    if (!this.state.understood) {
      this.props.notify({
        type: "error",
        message:
          "You must acknowledge the disclaimer before submitting delete query",
      });
    } else {
      let query = `DELETE FROM molecularLab WHERE id=${this.props.target};`;
      this.props.runQuery(query);
      this.setState({ open: false });
    }
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    if (this.props.disabled) {
      return <div></div>;
    }

    return (
      <div>
        <Modal
          open={this.state.open}
          size="mini"
          trigger={
            <Button
              negative
              disabled={this.props.disabled}
              onClick={this.show}
              style={{ marginBottom: ".25rem" }}
            >
              DELETE
            </Button>
          }
        >
          <Modal.Header>Are you sure?</Modal.Header>
          <Modal.Content>
            <p>Target (Specimen ID): {this.props.target}</p>
            <Form>
              <Form.Field
                control={Checkbox}
                label="I understand this cannot be undone"
                error={
                  !this.state.understood
                    ? { content: "You must acknowledge the disclaimer" }
                    : false
                }
                value={this.state.understood}
                onChange={() =>
                  this.setState({ understood: !this.state.understood })
                }
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <ConfirmAuth
              checkAuth={this.props.checkAuth}
              handleSubmit={this.handleConfirm}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default DeleteDocument;
