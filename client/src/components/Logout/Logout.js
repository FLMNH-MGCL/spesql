import React from "react";
import { Button, Confirm } from "semantic-ui-react";

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
      <React.Fragment>
        <Button negative size="small" basic onClick={this.show}>
          Logout
        </Button>
        <Confirm
          open={this.state.open}
          header="Are you sure?"
          confirmButton="Yes"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          size="small"
        />
      </React.Fragment>
    );
  }
}

export default Logout;
