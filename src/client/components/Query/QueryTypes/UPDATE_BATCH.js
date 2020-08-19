import React from "react";
import { Grid, Message, Header } from "semantic-ui-react";
// import ErrorTerminal from "../QueryTerminals/ErrorTerminal";
// import {
//   updateQueryOption,
//   headerSelection,
//   setOperatorOptions,
//   setCountOptions,
// } from "../QueryConstants/constants";

export default class UPDATE_BATCH extends React.Component {
  render() {
    if (this.props.disabled) {
      return <div></div>;
    }

    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h2" dividing style={{ paddingTop: "2rem" }}>
              UPDATE BATCH Query:{" "}
            </Header>
            <Message>
              <p>
                Under Construction... Will be an update query which will update
                all matches using a given list of conditions
              </p>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
