import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { CSVLink } from "react-csv";

class DownloadDB extends React.Component {
  render() {
    return (
      <Modal
        trigger={
          <Button
            icon
            labelPosition="left"
            disabled={this.props.disabled}
            style={{ fontSize: "1rem" }}
          >
            <Icon name="download" />
            Download
          </Button>
        }
        size="small"
      >
        <Modal.Header>Download Options</Modal.Header>
        <Modal.Content>
          <p style={{ display: "block" }}>
            This action will download the entire query, not just what is
            currently visible / loaded. Do you wish to continue?
          </p>
          <div>
            <p style={{ display: "block" }}>
              <b>Current Query Size: </b> {this.props.data.length}
            </p>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <CSVLink data={this.props.data} target="_blank">
            <Button primary>Download All</Button>
          </CSVLink>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DownloadDB;

// https://stackoverflow.com/questions/48760815/export-to-csv-button-in-react-table
