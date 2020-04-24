import React from "react";
import { Button, Confirm, Dropdown } from "semantic-ui-react";

class Logout extends React.Component {
  state = { open: false };

  show = () => this.setState({ open: true });

  handleConfirm = () => {
    this.props.logout();
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <Dropdown.Item onClick={this.show}>
        Logout
        <Confirm
          open={this.state.open}
          header="Are you sure?"
          confirmButton="Yes"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          size="small"
        />
      </Dropdown.Item>
    );
  }
}

export default Logout;
