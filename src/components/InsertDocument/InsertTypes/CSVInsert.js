import React from "react";
import {
  Button,
  Form,
  TextArea,
  Message,
  Modal,
  Divider,
} from "semantic-ui-react";
import ErrorTerminal from "../../Query/QueryTerminals/ErrorTerminal";
import CreateHelpModal from "../../Help/CreateHelpModal";
import { checkSpecimen } from "../../../functions/queryChecks";
import { runInsertQuery } from "../../../functions/queries";
import CSVDrop from "./CSVDrop";

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default class CSVInsert extends React.Component {
  state = {
    text_area: "",
    hasError: false,
    loading: false,
  };

  setCSV(text) {
    this.setState({ text_area: text });
  }

  async runQuery(insertions) {
    this.props.notify({
      type: "warning",
      message:
        "Analyzing entries and sending to server, please be patient and leave this window open until completed.",
    });
    let errors = [];
    let insertData = await runInsertQuery(insertions);
    // console.log(insertData);
    setTimeout(() => {
      asyncForEach(insertData, async (insertion, index) => {
        // console.log(index);
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
                "Uh oh, some errors detected. Please check INSERT error log",
            });
            this.props.updateInsertErrorMessage(errors);
            this.setState({ hasError: true });
          } else {
            this.props.notify({
              type: "success",
              message: "Entries successfully submitted without errors",
            });
          }

          this.setState({ loading: false });
        }
      });
    }, 500 * insertions.length);
  }

  handleSubmit = () => {
    // check valid data
    // if data is valid, loop through and axios.post each item
    this.setState({ loading: true });
    const ret = this.props.isValidCSV(this.state.text_area);

    if (!ret.valid) {
      this.props.notify({
        type: "error",
        message: "Uh oh, some errors detected. Please check INSERT error log",
      });
      this.props.updateInsertErrorMessage(ret.data);
      this.setState({ hasError: true, loading: false });
      return;
    }

    // ret.data[0] is header row

    let insertions = [];
    let errors = [];

    for (var i = 1; i < ret.data.length; i++) {
      let specimen = ret.data[i];
      const doc = {
        catalogNumber: specimen[0],
        otherCatalogNumber: specimen[1],
        recordNumber: specimen[2],
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
        otherCollectors: specimen[14], // FIX DOWN
        identifiedBy: specimen[15],
        dateIdentified: specimen[16],
        verbatimDate: specimen[17], // FIX DOWN
        collectedYear: specimen[18],
        collectedMonth: specimen[19],
        collectedDay: specimen[20],
        sex: specimen[21],
        lifeStage: specimen[22],
        habitat: specimen[23],
        occurrenceRemarks: specimen[24],
        molecularOccurrenceRemarks: specimen[25],
        samplingProtocol: specimen[26],
        country: specimen[27],
        stateProvince: specimen[28],
        county: specimen[29],
        municipality: specimen[30],
        locality: specimen[31],
        elevationInMeters: specimen[32],
        decimalLatitude: specimen[33],
        decimalLongitude: specimen[34],
        geodeticDatum: specimen[35],
        coordinateUncertainty: specimen[36],
        verbatimLatitude: specimen[37],
        verbatimLongitude: specimen[38],
        georeferencedBy: specimen[39],
        disposition: specimen[40],
        isLoaned: specimen[41],
        loanInstitution: specimen[42],
        loaneeName: specimen[43],
        loanDate: specimen[44],
        loanReturnDate: specimen[45],
        preparations: specimen[46],
        freezer: specimen[47],
        rack: specimen[48],
        box: specimen[49],
        tubeSize: specimen[50],
        associatedSequences: specimen[51],
        associatedReferences: specimen[52],
        withholdData: specimen[53],
        reared: specimen[54],
        fieldNotes: specimen[55],
        modifiedInfo: "",
      };

      // console.log(doc);

      let specimenErrors = checkSpecimen(doc);
      if (specimenErrors.length > 0) {
        errors = errors.concat(specimenErrors);
      } else {
        insertions.push(doc);
      }
    }

    if (errors.length > 0) {
      this.props.notify({
        type: "warning",
        message:
          "Errors were detected. Skipping rows that are invalid, please wait until valid entries have been uploaded fully before retrying invalid rows.",
      });

      //   console.log(errors);
      this.props.updateInsertErrorMessage(errors);
    }

    if (insertions.length > 0) {
      this.runQuery(insertions);
    } else {
      this.props.notify({
        type: "warning",
        message: "Please check submission. No valid entries were found.",
      });
      this.setState({ loading: false });
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  renderErrorTerminal = () => (
    <div style={{ marginBottom: "3rem" }}>
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
    </div>
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
          "Large insertion detected. Please limit to 1000 entries maximum and be patient when submitted.",
      });
    }

    return (
      <>
        <Modal.Header>CSV Insert Query</Modal.Header>
        <Modal.Content>
          <Message>
            <Message.Header>Usage:</Message.Header>
            <p>
              Copy & paste CSV data into this text area. Be sure to include the
              proper headers.{" "}
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
          </Form>

          <Divider horizontal>OR</Divider>

          <CSVDrop setCSV={this.setCSV.bind(this)} />

          {this.state.hasError ? this.renderErrorTerminal() : null}
        </Modal.Content>
        <Modal.Actions>
          <CreateHelpModal queryType="PASTE_INSERT" />
          <Button onClick={() => this.props.closeModal()}>Cancel</Button>
          <Button
            type="button"
            color="yellow"
            onClick={() => this.setState({ text_area: "" })}
          >
            Clear
          </Button>
          <Button
            style={{ backgroundColor: "#5c6ac4", color: "#fff" }}
            onClick={this.handleSubmit}
            loading={this.state.loading}
          >
            Submit
          </Button>
        </Modal.Actions>
      </>
    );
  }
}
