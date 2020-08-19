import React from "react";
import { Dropdown, Modal, Button } from "semantic-ui-react";
import useToggle from "../../utils/useBoolean";

function Logout(props) {
  const [open, { off, toggle }] = useToggle(false);
  return (
    <Modal
      open={open}
      trigger={<Dropdown.Item onClick={toggle}>Logout</Dropdown.Item>}
      size="mini"
    >
      <Modal.Header>Are you sure?</Modal.Header>
      <Modal.Actions>
        <Button onClick={off}>Cancel</Button>
        <Button
          onClick={() => {
            props.logout();
            toggle();
          }}
          style={{
            color: "#fff",
            backgroundColor: "#5c6ac4",
          }}
        >
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

// class Logout extends React.Component {
//   state = { open: false };

//   show = () => this.setState({ open: true });

//   handleConfirm = () => {
//     this.props.logout();
//     this.setState({ open: false });
//   };

//   handleCancel = () => this.setState({ open: false });

//   render() {
//     return (
//       <Dropdown.Item onClick={this.show}>
//         Logout
//         <Confirm
//           open={this.state.open}
//           header="Are you sure?"
//           confirmButton="Yes"
//           onCancel={this.handleCancel}
//           onConfirm={this.handleConfirm}
//           size="mini"
//         />
//       </Dropdown.Item>
//     );
//   }
// }

export default Logout;
