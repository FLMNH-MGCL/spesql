import React from "react";
import {
  Button,
  Form,
  TextArea,
  Modal,
  Divider,
  Header,
  Select,
} from "semantic-ui-react";
import CreateHelpModal from "../CreateHelpModal";
import {
  checkSpecimen,
  checkField,
  parseMeasurement,
} from "../../../functions/queryChecks";
import { runSingleInsert } from "../../../functions/queries";
import CSVDrop from "./CSVDrop";
import ConfirmAuth from "../../auth/ConfirmAuth";
import CreateErrorLogModal from "../CreateErrorLogModal";

export default class CSVInsert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text_area: "",
      hasError: false,
      loading: false,
      databaseTable: undefined,
    };
  }

  setCSV(text) {
    this.setState({ text_area: text });
  }

  async runQuery(insertions) {
    this.props.notify({
      type: "warning",
      title: "Don't close this window",
      message:
        "Analyzing entries and sending to server, please be patient and leave this window open until completed.",
    });

    let errors = [];

    for (let i = 0; i < insertions.length; i++) {
      const insertData = await runSingleInsert(
        insertions[i],
        this.state.databaseTable
      );
      // console.log(insertData);

      if (!insertData.data.success) {
        errors.push(
          `SQL ERROR: Code: ${insertData.data.data.code}, Message: ${
            insertData.data.data.sqlMessage
          }\nError around row #${i + 1}`
        );
      }
    }

    if (errors.length > 0) {
      this.props.notify({
        type: "error",
        title: "Errors detected",
        message: "Please check the corresponding error log",
      });

      if (this.props.errorMessages.csvInsert) {
        errors = errors.concat(this.props.errorMessages.csvInsert);
      }

      this.props.updateCSVInsertErrorMessage(errors);
      this.setState({ hasError: true });
    } else {
      this.props.notify({
        type: "success",
        title: "Insertion Successful",
        message: "Entries successfully submitted without errors",
      });
    }

    this.setState({ loading: false });
  }

  handleSubmit = () => {
    // check valid data
    // if data is valid, loop through and axios.post each item
    this.setState({ loading: true });
    const ret = this.props.isValidCSV(this.state.text_area);

    if (!ret.valid) {
      this.props.notify({
        type: "error",
        title: "Errors detected",
        message: "Please check the corresponding error log",
      });
      this.props.updateCSVInsertErrorMessage(ret.data);
      this.setState({ hasError: true, loading: false });
      return;
    }

    // ret.data[0] is header row
    let insertions = [];
    let errors = [];

    for (var i = 1; i < ret.data.length; i++) {
      let specimen = ret.data[i];
      const elevationInMeters = parseMeasurement(specimen[32]);
      const coordinateUncertainty = parseMeasurement(specimen[36]);

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
        elevationInMeters: elevationInMeters,
        decimalLatitude: specimen[33],
        decimalLongitude: specimen[34],
        geodeticDatum: specimen[35],
        coordinateUncertainty: coordinateUncertainty,
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

      let specimenErrors = checkSpecimen(doc);

      specimenErrors = specimenErrors.concat(
        checkField("coordinateUncertaintyCSV", coordinateUncertainty)
      );

      specimenErrors = specimenErrors.concat(
        checkField("elevationInMetersCSV", elevationInMeters)
      );

      if (specimenErrors.length > 0) {
        errors = errors.concat(specimenErrors);
      } else {
        insertions.push(doc);
      }
    }

    if (errors.length > 0) {
      this.props.notify({
        type: "warning",
        title: "Invalid entries detected",
        message:
          "The insertion will skip entries that are invalid, please wait until valid entries have been uploaded fully before retrying the invalid entries.",
      });

      //   console.log(errors);
      this.props.updateCSVInsertErrorMessage(errors);
    }

    if (insertions.length > 0) {
      this.runQuery(insertions);
    } else {
      this.props.notify({
        type: "warning",
        title: "Invalid data",
        message: "Please check submission. No valid entries were found.",
      });
      this.setState({ loading: false });
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    if (!this.state.hasError && this.props.errorMessages.insertError !== null) {
      this.setState({ hasError: true });
    }

    const { text_area } = this.state;

    if ((this.state.text_area.match(/\n/g) || []).length >= 500) {
      this.props.notify({
        type: "warning",
        title: "Large insertion detected",
        message:
          "Please limit to 1000 entries maximum and be patient when submitted (do not close window until completion)",
      });
    }

    const { databaseTable } = this.state;

    return (
      <>
        <Modal.Header>CSV Insertion</Modal.Header>

        <Modal.Content>
          <Form>
            <Form.Field
              control={Select}
              options={this.props.tableOptions}
              label="To which table are these going?"
              placeholder="Select One"
              name="databaseTable"
              value={databaseTable}
              onChange={this.handleChange}
              error={
                !this.state.databaseTable
                  ? { content: "Must select database table" }
                  : null
              }
            />
          </Form>
          <Header size="small">Paste CSV Data here</Header>
          <p>
            Be sure to include the headers, and if you need to view the template
            for CSV files, donwload it from{" "}
            <a
              // href={require("../../../assets/CORRECT_HEADERS_TEMPLATE.csv")}
              download
            >
              here
            </a>{" "}
          </p>
          <Form padded="vertically" onSubmit={this.handleCSVSubmit}>
            <Form.Group>
              <TextArea
                id="form-text-area"
                name="text_area"
                value={text_area}
                onChange={this.handleChange}
                style={{ minHeight: "20vh" }}
              />
            </Form.Group>
            {this.state.loading
              ? "Loading... This may take some time, please wait."
              : null}
          </Form>

          <Divider horizontal>OR</Divider>

          <CSVDrop setCSV={this.setCSV.bind(this)} />
        </Modal.Content>
        <Modal.Actions>
          <CreateHelpModal queryType="PASTE_INSERT" />
          <CreateErrorLogModal
            type="CSV Insert"
            errors={this.props.errorMessages.csvInsert}
            updateError={this.props.updateCSVInsertErrorMessage}
          />
          <Button onClick={() => this.props.closeModal()}>Cancel</Button>
          <Button
            type="button"
            color="yellow"
            onClick={() => this.setState({ text_area: "" })}
          >
            Clear
          </Button>
          <ConfirmAuth
            checkAuth={this.props.checkAuth}
            handleSubmit={this.handleSubmit.bind(this)}
            buttonLoading={this.state.loading}
          />
          {/* <Button
            style={{ backgroundColor: "#5c6ac4", color: "#fff" }}
            onClick={this.handleSubmit}
            loading={this.state.loading}
          >
            Submit
          </Button> */}
        </Modal.Actions>
      </>
    );
  }
}
