import React from "react";
import { Button, Confirm } from "semantic-ui-react";
import "./DeleteDocument.css";

class DeleteDocument extends React.Component {
  state = { open: false };

  show = () => this.setState({ open: true });

  handleConfirm = () => {
    // axios.post(`/api/delete/${this.props.target}`).then(res => {
    //     const data = res.data
    //     console.log(data)
    // })
    // this.props.updateList()
    let query = `DELETE FROM molecularLab WHERE id=${this.props.target};`;
    this.props.runQuery(query);
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    if (this.props.disabled) {
      return <div></div>;
    }

    return (
      <React.Fragment>
        <Button
          negative
          disabled={this.props.disabled}
          onClick={this.show}
          style={{ marginBottom: ".25rem" }}
        >
          DELETE
        </Button>
        <Confirm
          open={this.state.open}
          header="Are you sure?"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          size="small"
        />
      </React.Fragment>
    );
  }
}

export default DeleteDocument;
