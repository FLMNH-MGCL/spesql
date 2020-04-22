import React from "react";
import axios from "axios";
import { Button, Icon, Modal, Divider } from "semantic-ui-react";
import { SELECT, UPDATE, COUNT } from "./QueryTypes";
import "./QueryGrid.css";
import UPDATE_BATCH from "./QueryTypes/UPDATE_BATCH";

class QueryGrid extends React.Component {
  state = {
    showModal: false,
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    // const { dbSelection, loading } = this.state;
    // if (dbSelection.length === 0 && loading) {
    //   this.initTableOptions();
    // }
    const { userData } = this.props;
    return (
      <Modal
        trigger={
          <Button
            icon
            labelPosition="left"
            onClick={() => this.setState({ showModal: true })}
            size="small"
          >
            <Icon name="archive" />
            Query
          </Button>
        }
        centered
        open={this.state.showModal}
        onClose={this.closeModal}
        style={{ maxHeight: "85vh" }}
      >
        <Modal.Header>Query Selector</Modal.Header>
        <Modal.Content scrolling style={{ minHeight: "80vh" }}>
          <SELECT
            // dbSelection={dbSelection}
            runQuery={this.props.runQuery}
            clearQuery={this.props.clearQuery}
            closeModal={this.closeModal}
            errorMessages={this.props.errorMessages}
            updateSelectErrorMessage={this.props.updateSelectErrorMessage}
            notify={this.props.notify}
            userData={userData}
          />
          <Divider />
          <COUNT
            // dbSelection={dbSelection}
            runQuery={this.props.runQuery}
            countQueryCount={this.props.countQueryCount}
            updateCountQueryCount={this.props.updateCountQueryCount}
            errorMessages={this.props.errorMessages}
            updateCountErrorMessage={this.props.updateCountErrorMessage}
            notify={this.props.notify}
            userData={userData}
          />
          <Divider />
          <UPDATE
            // dbSelection={dbSelection}
            runQuery={this.props.runQuery}
            clearQuery={this.props.clearQuery}
            closeModal={this.closeModal}
            errorMessages={this.props.errorMessages}
            updateUpdateErrorMessage={this.props.updateUpdateErrorMessage}
            notify={this.props.notify}
            disabled={this.props.disabled}
            userData={userData}
          />
          <Divider />
          <UPDATE_BATCH disabled={this.props.disabled} />
        </Modal.Content>
      </Modal>
    );
  }
}

export default QueryGrid;
