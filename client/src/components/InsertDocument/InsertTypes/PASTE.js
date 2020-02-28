import React from "react";
import { Button, Grid, Form, TextArea, Message } from "semantic-ui-react";
import ErrorTerminal from "../../Query/QueryTerminals/ErrorTerminal";
import QueryHelp from "../../Query/QueryHelp";
// import { checkEntryControlFields } from "../../../functions/queryChecks";
import { runInsertQuery } from "../../../functions/queries";

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default class PASTE extends React.Component {
  state = {
    text_area: "",
    hasError: false,
    loading: false
  };

  async runQuery(insertions) {
    this.props.notify({
      type: "warning",
      message:
        "Analyzing entries and sending to server, please be patient and leave this window open until completed."
    });
    let errors = [];
    let insertData = await runInsertQuery(insertions);
    console.log(insertData);
    setTimeout(() => {
      asyncForEach(insertData, async (insertion, index) => {
        console.log(index);
        if (!insertion.data.success) {
          console.log("error found");
          errors.push(
            `SQL ERROR: Code: ${insertion.data.data.code}, Message: ${insertion.data.data.sqlMessage}`
          );
        }

        if (index === insertData.length - 1) {
          if (errors.length > 0) {
            this.props.notify({
              type: "error",
              message:
                "Uh oh, some errors detected. Please check INSERT error log"
            });
            this.props.updateInsertErrorMessage(errors);
            this.setState({ hasError: true });
          } else {
            this.props.notify({
              type: "success",
              message: "Entries successfully submitted without errors"
            });
          }

          this.setState({ loading: false });
        }
      });
    }, 500 * insertions.length);
  }

  handleCSVSubmit = () => {
    // check valid data
    // if data is valid, loop through and axios.post each item
    this.setState({ loading: true });
    const ret = this.props.isValidCSV(this.state.text_area);

    if (!ret.valid) {
      this.props.notify({
        type: "error",
        message: "Uh oh, some errors detected. Please check INSERT error log"
      });
      this.props.updateInsertErrorMessage(ret.data);
      this.setState({ hasError: true, loading: false });
      return;
    }

    // ret.data[0] is header row

    let insertions = [];

    for (var i = 1; i < ret.data.length; i++) {
      let specimen = ret.data[i];
      const doc = {
        catalogNumber: specimen[0],
        recordNumber: specimen[1],
        otherRecordNumber: specimen[2],
        order_: specimen[3],
        superfamily: specimen[4],
        family: specimen[5],
        subfamily: specimen[6],
        tribe: specimen[7],
        genus: specimen[8],
        subgenus: specimen[9],
        specificEpithet: specimen[10],
        infraspecificEpithet: specimen[11],
        identificationQualifier: specimen[12],
        recordedBy: specimen[13],
        identifiedBy: specimen[14],
        dateIdentified: specimen[15],
        sex: specimen[16],
        lifeStage: specimen[17],
        habitat: specimen[18],
        occurrenceRemarks: specimen[19],
        molecularOccurrenceRemarks: specimen[20],
        samplingProtocol: specimen[21],
        country: specimen[22],
        stateProvince: specimen[23],
        county: specimen[24],
        municipality: specimen[25],
        locality: specimen[26],
        verbatimElevation: specimen[27],
        decimalLatitude: specimen[28],
        decimalLongitude: specimen[29],
        geodeticDatum: specimen[30],
        coordinateUncertainty: specimen[31],
        verbatimLatitude: specimen[32],
        verbatimLongitude: specimen[33],
        georeferencedBy: specimen[34],
        disposition: specimen[35],
        loanInfo: specimen[36],
        preparations: specimen[37],
        freezer: specimen[38],
        rack: specimen[39],
        box: specimen[40],
        tubeSize: specimen[41],
        associatedSequences: specimen[42],
        associatedReferences: specimen[43],
        withholdData: specimen[44],
        reared: specimen[45],
        fieldNotes: specimen[46],
        collectors: specimen[47],
        modifiedInfo: ""
      };

      insertions.push(doc);

      // console.log(doc)
      // axios.post("/api/insert", doc).then(response => {
      //   console.log(response);
      //   let responseData = response.data;
      //   if (responseData.success === false) {
      //     let errorHeading = responseData.data.code;
      //     let errorMessage = responseData.data.sqlMessage;
      //     errors.push(
      //       `SQL Error around row ${i}. Code: ${errorHeading}, Message: ${errorMessage}`
      //     );
      //   } else {
      //     console.log("Sucess! Inserted document.");
      //   }
      // });

      // rerender the component for errors
      // if (i === ret.data.length - 1) {
      //   if (errors !== []) {
      //     console.log(errors);
      //     this.props.updateInsertErrorMessage(errors);
      //     setTimeout(
      //       () => this.setState({ hasError: true, loading: false }),
      //       1000
      //     );
      //   }
      //   console.log(errors);
      // }
    }

    console.log(insertions);

    this.runQuery(insertions);
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  renderErrorTerminal = () => (
    <React.Fragment>
      <ErrorTerminal errorLog={this.props.errorMessages.insertError} />
      <Button
        onClick={() => {
          this.props.updateInsertErrorMessage(null);
          this.setState({ hasError: false });
        }}
        color="red"
        style={{ float: "right" }}
      >
        Clear
      </Button>
    </React.Fragment>
  );

  render() {
    if (!this.state.hasError && this.props.errorMessages.insertError !== null) {
      this.setState({ hasError: true });
    }

    const { text_area } = this.state;

    if ((this.state.text_area.match(/\n/g) || []).length >= 500) {
      this.props.notify({
        type: "warning",
        message:
          "Large insertion detected. Please limit to 1000 entries maximum and be patient when submitted."
      });
    }

    return (
      <React.Fragment>
        <Grid padded="vertically">
          <Grid.Row>
            <Grid.Column width={16}>
              <Message>
                <Message.Header>Usage:</Message.Header>
                <p>
                  Copy & paste CSV data into this text area. Be sure to include
                  the proper headers.{" "}
                  <a href="../../assets/CORRECT_HEADERS_TEMPLATE.csv" download>
                    Click here
                  </a>{" "}
                  to download an example template for the correct headers.
                </p>
              </Message>
              <Form padded="vertically" onSubmit={this.handleCSVSubmit}>
                <Form.Group>
                  <TextArea
                    id="form-text-area"
                    name="text_area"
                    value={text_area}
                    onChange={this.handleChange}
                    style={{ minHeight: "30vh" }}
                  />
                </Form.Group>
                {this.state.loading
                  ? "Loading... This may take some time, please wait."
                  : null}
                <Form.Group style={{ float: "right" }}>
                  <QueryHelp queryType="PASTE_INSERT" />
                  <Button
                    type="button"
                    color="yellow"
                    onClick={() => this.setState({ text_area: "" })}
                    style={{ marginLeft: ".5rem" }}
                  >
                    Clear
                  </Button>
                  <Form.Field
                    id="form-button-control-ta-submit"
                    control={Button}
                    content="Confirm"
                  />
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.state.hasError ? this.renderErrorTerminal() : null}
      </React.Fragment>
    );
  }
}
