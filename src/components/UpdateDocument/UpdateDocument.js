import React from "react";
import {
  Button,
  Modal,
  Message,
  Grid,
  Table,
  Input,
  TextArea,
  Select,
} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import CreateHelpModal from "../Help/CreateHelpModal";
import { checkField } from "../../functions/queryChecks";
import {
  identificationQualifierControl,
  samplingProtocolControl,
  dispositionControl,
  preparationsControl,
  tubeSizeControl,
  lifeStageControl,
  sexControl,
  countryControl,
  yesOrNo,
  // units,
} from "../Query/QueryConstants/constants";
import ErrorTerminal from "../Query/QueryTerminals/ErrorTerminal";
import ConfirmAuth from "../../views/Admin/components/ConfirmAuth";

class UpdateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      catalogNumber: props.selectedSpecimen.catalogNumber,
      otherCatalogNumber: props.selectedSpecimen.otherCatalogNumber,
      recordNumber: props.selectedSpecimen.recordNumber,
      order_: props.selectedSpecimen.order_,
      superfamily: this.props.selectedSpecimen.superfamily,
      family: this.props.selectedSpecimen.family,
      subfamily: this.props.selectedSpecimen.subfamily,
      tribe: this.props.selectedSpecimen.tribe,
      genus: this.props.selectedSpecimen.genus,
      subgenus: this.props.selectedSpecimen.subgenus,
      specificEpithet: this.props.selectedSpecimen.specificEpithet,
      infraspecificEpithet: this.props.selectedSpecimen.infraspecificEpithet,
      identificationQualifier: this.props.selectedSpecimen
        .identificationQualifier,
      recordedBy: this.props.selectedSpecimen.recordedBy,
      identifiedBy: this.props.selectedSpecimen.identifiedBy,
      dateIdentified: this.props.selectedSpecimen.dateIdentified,
      verbatimDate: this.props.selectedSpecimen.verbatimDate,
      collectedYear: this.props.selectedSpecimen.collectedYear,
      collectedMonth: this.props.selectedSpecimen.collectedMonth,
      collectedDay: this.props.selectedSpecimen.collectedDay,
      sex: this.props.selectedSpecimen.sex,
      lifeStage: this.props.selectedSpecimen.lifeStage,
      habitat: this.props.selectedSpecimen.habitat,
      occurrenceRemarks: this.props.selectedSpecimen.occurrenceRemarks,
      molecularOccurrenceRemarks: this.props.selectedSpecimen
        .molecularOccurrenceRemarks,
      samplingProtocol: this.props.selectedSpecimen.samplingProtocol,
      country: this.props.selectedSpecimen.country,
      stateProvince: this.props.selectedSpecimen.stateProvince,
      county: this.props.selectedSpecimen.county,
      municipality: this.props.selectedSpecimen.municipality,
      locality: this.props.selectedSpecimen.locality,
      elevationInMeters: this.props.selectedSpecimen.elevationInMeters,
      decimalLatitude: this.props.selectedSpecimen.decimalLatitude,
      decimalLongitude: this.props.selectedSpecimen.decimalLongitude,
      geodeticDatum: this.props.selectedSpecimen.geodeticDatum,
      coordinateUncertainty: this.props.selectedSpecimen.coordinateUncertainty,
      verbatimLatitude: this.props.selectedSpecimen.verbatimLatitude,
      verbatimLongitude: this.props.selectedSpecimen.verbatimLongitude,
      georeferencedBy: this.props.selectedSpecimen.georeferencedBy,
      disposition: this.props.selectedSpecimen.disposition,
      isLoaned: this.props.selectedSpecimen.isLoaned,
      loanInstitution: this.props.selectedSpecimen.loanInstitution,
      loaneeName: this.props.selectedSpecimen.loaneeName,
      loanDate: this.props.selectedSpecimen.loanDate,
      loanReturnDate: this.props.selectedSpecimen.loanReturnDate,
      preparations: this.props.selectedSpecimen.preparations,
      freezer: this.props.selectedSpecimen.freezer,
      rack: this.props.selectedSpecimen.rack,
      box: this.props.selectedSpecimen.box,
      tubeSize: this.props.selectedSpecimen.tubeSize,
      associatedSequences: this.props.selectedSpecimen.associatedSequences,
      associatedReferences: this.props.selectedSpecimen.associatedReferences,
      withholdData: this.props.selectedSpecimen.withholdData,
      reared: this.props.selectedSpecimen.reared,
      fieldNotes: this.props.selectedSpecimen.fieldNotes,
      collectors: this.props.selectedSpecimen.collectors,
      reason: "",
    };
  }

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  onChange = (e, { name, value }) => this.setState({ [name]: value });

  renderErrorTerminal = () => (
    <React.Fragment>
      <ErrorTerminal errorLog={this.props.errorMessages.updateError} />
      <Button
        onClick={() => {
          this.props.updateUpdateErrorMessage(null);
          this.setState({ loading: false });
        }}
        color="red"
        style={{ float: "right" }}
      >
        Clear
      </Button>
    </React.Fragment>
  );

  onSubmit = (e) => {
    if (this.state.reason === "") {
      this.props.notify({
        type: "error",
        message: "Please enter a reason for updating.",
      });
      return;
    }

    let changes = [];
    let errors = [];
    for (var field of Object.keys(this.props.selectedSpecimen)) {
      // console.log(field);
      // console.log(
      //   `${this.state[field]} vs ${this.props.selectedSpecimen[field]}`
      // );

      // skip fields not modified or entered by any user
      if (
        field === "id" ||
        field === "modifiedInfo" ||
        field === "recordEnteredBy" ||
        field === "dateEntered"
      )
        continue;

      if (this.state[field] === this.props.selectedSpecimen[field]) {
        // console.log('same values')
      } else if (!this.state[field] && this.props.selectedSpecimen[field]) {
        // property in state doesn't exist in selected specimen
        // this means I need to update the DB to reflect the program
        // this if should never hit after production, but for now it will just
        // log the occurrence
        console.log(`DB / Software conflict: check the ${field} field`);
      } else {
        let change = {
          field: field,
          oldValue: this.props.selectedSpecimen[field],
          newValue: this.state[field],
        };
        changes.push(change);
        errors = errors.concat(checkField(field, this.state[field]));
      }
    }

    this.setState({ loading: true });

    if (errors.length !== 0) {
      // update error log
      this.props.updateUpdateErrorMessage(errors);
      // send notification
      this.props.notify({
        type: "error",
        message: "Errors detected. Please check error log.",
      });

      this.setState({ loading: false });

      return;
    }

    if (changes.length > 0) {
      console.log("Changes were detected");
      console.log(changes);

      console.log(errors);

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;

      // console.log(today)

      let modification = {
        [today]: {
          modifiedBy: this.props.userData.name,
          fieldsChanged: changes,
          reasonForChanges: this.state.reason,
        },
      };

      let allModifications = [];
      if (this.props.selectedSpecimen.modifiedInfo !== "") {
        allModifications = JSON.parse(this.props.selectedSpecimen.modifiedInfo);
        allModifications.push(modification);
      } else {
        allModifications = [modification];
      }

      allModifications = JSON.stringify(allModifications);
      // console.log(allModifications)

      let updateCommand = `UPDATE molecularLab SET `;

      changes.forEach((change, index) => {
        if (index !== changes.length - 1) {
          updateCommand += `${change.field}='${change.newValue}', `;
        } else {
          updateCommand += `${change.field}='${change.newValue}', `;
          updateCommand += `modifiedInfo='${allModifications}'`;
        }
      });

      updateCommand += `WHERE id=${this.props.selectedSpecimen.id};`;

      // console.log(updateCommand)

      this.props.runQuery(updateCommand);
      this.setState({ loading: false });
    } else {
      this.props.notify({
        type: "warning",
        message: "No changes were detected",
      });
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.props.disabled) {
      return <div></div>;
    }

    if (!this.props.currentQuery.startsWith("SELECT *")) {
      return (
        <Modal
          trigger={
            <Button
              color="yellow"
              disabled={this.props.disabled}
              onClick={this.show}
            >
              UPDATE
            </Button>
          }
          centered
          open={this.state.open}
          onClose={this.close}
          size="small"
        >
          <Modal.Header>Invalid usage!</Modal.Header>
          <Modal.Content>
            <p>
              Updating a single specimen requires a current loaded SELECT query
              that contains all existing headers. This means you must have made
              a SELECT ALL (SELECT *) query. This is so data isn't changed
              because it is thought to be empty, when it may just be missing
              because of a narrow query. See the Query Selector Menu for more
              help (the Query button on the header menu).
            </p>
          </Modal.Content>
        </Modal>
      );
    } else {
      const {
        catalogNumber,
        recordNumber,
        otherCatalogNumber,
        order_,
        superfamily,
        family,
        subfamily,
        tribe,
        genus,
        subgenus,
        specificEpithet,
        infraspecificEpithet,
        identificationQualifier,
        recordedBy,
        identifiedBy,
        dateIdentified,
        verbatimDate,
        collectedYear,
        collectedMonth,
        collectedDay,
        sex,
        lifeStage,
        habitat,
        occurrenceRemarks,
        molecularOccurrenceRemarks,
        samplingProtocol,
        country,
        stateProvince,
        county,
        municipality,
        locality,
        elevationInMeters,
        decimalLatitude,
        decimalLongitude,
        geodeticDatum,
        coordinateUncertainty,
        verbatimLatitude,
        verbatimLongitude,
        georeferencedBy,
        disposition,
        isLoaned,
        loanInstitution,
        loaneeName,
        loanDate,
        loanReturnDate,
        preparations,
        freezer,
        rack,
        box,
        tubeSize,
        associatedSequences,
        associatedReferences,
        withholdData,
        reared,
        fieldNotes,
        collectors,
        reason,
      } = this.state;

      return (
        <React.Fragment>
          <Modal
            trigger={
              <Button
                color="yellow"
                disabled={this.props.disabled}
                onClick={this.show}
              >
                UPDATE
              </Button>
            }
            centered
            open={this.state.open}
            onClose={this.close}
            style={{ maxHeight: "85vh" }}
          >
            <Modal.Header>UPDATE Single Specimen</Modal.Header>
            <Modal.Content scrolling style={{ minHeight: "80vh" }}>
              <Grid padded>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Message>
                      <p>
                        This is the menu for updating a single, selected
                        specimen in the database table. If you require more
                        functionality than a single UPDATE query on one
                        specimen, please navigate to the Query Selector menu
                        (click the button entitled 'Query' on the header menu).
                        If you need more help with this section, click the Help
                        button at the bottom of the form.
                        <br />
                        <br />
                        Please note, proposed values will be initialized to
                        existing values. They will be updated only if new values
                        differ from what already is stored.
                      </p>
                    </Message>

                    <Input
                      fluid
                      label="Please enter the reason for this update"
                      placeholder="new data recieved, incorrect field update, etc"
                      name="reason"
                      value={reason}
                      onChange={this.onChange}
                      error={
                        this.state.reason === ""
                          ? {
                              content: "You must provide a reason",
                              pointing: "below",
                            }
                          : false
                      }
                    />

                    <Table singleLine>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Field</Table.HeaderCell>
                          <Table.HeaderCell>Current Data</Table.HeaderCell>
                          <Table.HeaderCell>Proposed Update</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>catalogNumber</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.catalogNumber}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="catalogNumber"
                              value={catalogNumber}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>otherCatalogNumber</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.otherCatalogNumber}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="otherCatalogNumber"
                              value={otherCatalogNumber}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>recordNumber</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.recordNumber}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="recordNumber"
                              value={recordNumber}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>order_</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.order_}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="order_"
                              value={order_}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>superfamily</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.superfamily}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="superfamily"
                              value={superfamily}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>family</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.family}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="family"
                              value={family}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>subfamily</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.subfamily}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="subfamily"
                              value={subfamily}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>tribe</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.tribe}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="tribe"
                              value={tribe}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>genus</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.genus}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="genus"
                              value={genus}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>subgenus</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.section}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="subgenus"
                              value={subgenus}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>specificEpithet</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.specificEpithet}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="specificEpithet"
                              value={specificEpithet}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>infraspecificEpithet</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.infraspecificEpithet}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="infraspecificEpithet"
                              value={infraspecificEpithet}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>identificationQualifier</Table.Cell>
                          <Table.Cell>
                            {
                              this.props.selectedSpecimen
                                .identificationQualifier
                            }
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="identificationQualifier"
                              options={identificationQualifierControl}
                              value={identificationQualifier}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>recordedBy</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.recordedBy}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="recordedBy"
                              value={recordedBy}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>identifiedBy</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.identifiedBy}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="identifiedBy"
                              value={identifiedBy}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>dateIdentified</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.dateIdentified}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              as={SemanticDatepicker}
                              name="dateIdentified"
                              value={dateIdentified}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>verbatimDate</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.verbatimDate}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="verbatimDate"
                              value={verbatimDate}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>collectedYear</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.collectedYear}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="collectedYear"
                              placeholder="YYYY"
                              value={collectedYear}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>collectedMonth</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.collectedMonth}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="collectedMonth"
                              placeholder="MM"
                              value={collectedMonth}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>collectedDay</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.collectedDay}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="collectedDay"
                              placeholder="DD"
                              value={collectedDay}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>sex</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.sex}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="sex"
                              placeholder="Select One"
                              options={sexControl}
                              value={sex}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>lifeStage</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.lifeStage}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="lifeStage"
                              placeholder="Select One"
                              options={lifeStageControl}
                              value={lifeStage}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>habitat</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.habitat}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="habitat"
                              value={habitat}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>occurrenceRemarks</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.occurrenceRemarks}
                          </Table.Cell>
                          <Table.Cell>
                            <TextArea
                              name="occurrenceRemarks"
                              value={occurrenceRemarks}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>molecularOccurrenceRemarks</Table.Cell>
                          <Table.Cell>
                            {
                              this.props.selectedSpecimen
                                .molecularOccurrenceRemarks
                            }
                          </Table.Cell>
                          <Table.Cell>
                            <TextArea
                              name="molecularOccurrenceRemarks"
                              value={molecularOccurrenceRemarks}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>samplingProtocol</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.samplingProtocol}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="samplingProtocol"
                              placeholder="Select One"
                              options={samplingProtocolControl}
                              value={samplingProtocol}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>country</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.country}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="country"
                              placeholder="Select One"
                              options={countryControl}
                              value={country}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>stateProvince</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.stateProvince}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="stateProvince"
                              value={stateProvince}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>county</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.county}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="county"
                              value={county}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>municipality</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.municipality}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="municipality"
                              value={municipality}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>locality</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.locality}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="locality"
                              value={locality}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>elevationInMeters</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.elevationInMeters}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="elevationInMeters"
                              value={elevationInMeters}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>decimalLatitude</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.decimalLatitude}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="decimalLatitude"
                              value={decimalLatitude}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>decimalLongitude</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.decimalLongitude}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="decimalLongitude"
                              value={decimalLongitude}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>geodeticDatum</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.geodeticDatum}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="geodeticDatum"
                              value={geodeticDatum}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>coordinateUncertainty</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.coordinateUncertainty}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="coordinateUncertainty"
                              value={coordinateUncertainty}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>verbatimLatitude</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.verbatimLatitude}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="verbatimLatitude"
                              value={verbatimLatitude}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>verbatimLongitude</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.verbatimLongitude}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="verbatimLongitude"
                              value={verbatimLongitude}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>georeferencedBy</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.georeferencedBy}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="georeferencedBy"
                              value={georeferencedBy}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>disposition</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.disposition}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="disposition"
                              placeholder="Select One"
                              options={dispositionControl}
                              value={disposition}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>isLoaned</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.isLoaned}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="isLoaned"
                              placeholder="Select One"
                              options={yesOrNo}
                              value={isLoaned}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        {/* render loan form if is loaned */}
                        {this.state.isLoaned === "Y" ? (
                          <>
                            <Table.Row>
                              <Table.Cell>loanInstitution</Table.Cell>
                              <Table.Cell>
                                {this.props.selectedSpecimen.loanInstitution}
                              </Table.Cell>
                              <Table.Cell>
                                <Input
                                  name="loanInstitution"
                                  value={loanInstitution}
                                  onChange={this.onChange}
                                />
                              </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                              <Table.Cell>loaneeName</Table.Cell>
                              <Table.Cell>
                                {this.props.selectedSpecimen.loaneeName}
                              </Table.Cell>
                              <Table.Cell>
                                <Input
                                  name="loaneeName"
                                  placeholder="Last,First"
                                  value={loaneeName}
                                  onChange={this.onChange}
                                />
                              </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                              <Table.Cell>loanDate</Table.Cell>
                              <Table.Cell>
                                {this.props.selectedSpecimen.loanDate}
                              </Table.Cell>
                              <Table.Cell>
                                <Select
                                  as={SemanticDatepicker}
                                  name="loanDate"
                                  value={loanDate}
                                  onChange={this.onChange}
                                />
                              </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                              <Table.Cell>loanReturnDate</Table.Cell>
                              <Table.Cell>
                                {this.props.selectedSpecimen.loanReturnDate}
                              </Table.Cell>
                              <Table.Cell>
                                <Select
                                  as={SemanticDatepicker}
                                  name="loanReturnDate"
                                  value={loanReturnDate}
                                  onChange={this.onChange}
                                />
                              </Table.Cell>
                            </Table.Row>
                          </>
                        ) : (
                          ""
                        )}

                        <Table.Row>
                          <Table.Cell>preparations</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.preparations}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="preparations"
                              placeholder="Select One"
                              options={preparationsControl}
                              value={preparations}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>freezer</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.freezer}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="freezer"
                              value={freezer}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>rack</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.rack}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="rack"
                              value={rack}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>box</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.box}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="box"
                              value={box}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>tubeSize</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.tubeSize}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="tubeSize"
                              placeholder="Select One"
                              options={tubeSizeControl}
                              value={tubeSize}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>associatedSequences</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.associatedSequences}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="associatedSequences"
                              value={associatedSequences}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>associatedReferences</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.associatedReferences}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="associatedReferences"
                              value={associatedReferences}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>withholdData</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.withholdData}
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              name="withholdData"
                              value={withholdData}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>reared</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.reared}
                          </Table.Cell>
                          <Table.Cell>
                            <Select
                              name="reared"
                              placeholder="Select One"
                              options={yesOrNo}
                              value={reared}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>fieldNotes</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.fieldNotes}
                          </Table.Cell>
                          <Table.Cell>
                            <TextArea
                              name="fieldNotes"
                              value={fieldNotes}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>collectors</Table.Cell>
                          <Table.Cell>
                            {this.props.selectedSpecimen.collectors}
                          </Table.Cell>
                          <Table.Cell>
                            <TextArea
                              name="collectors"
                              placeholder="Last1,First1 Last2,First2"
                              value={collectors}
                              onChange={this.onChange}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <CreateHelpModal queryType="UPDATE_SINGLE" />
              <ConfirmAuth
                checkAuth={this.props.checkAuth}
                handleSubmit={this.onSubmit}
              />
              {/* <Button onClick={this.onSubmit} color="red">
                  UPDATE
                </Button> */}
            </Modal.Actions>
            {this.props.errorMessages.updateError
              ? this.renderErrorTerminal()
              : null}
          </Modal>
        </React.Fragment>
      );
    }
  }
}

export default UpdateDocument;
