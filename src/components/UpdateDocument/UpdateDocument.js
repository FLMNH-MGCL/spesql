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
  Header,
  Icon,
  Form,
  Popup,
  Menu,
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
  headerSelection,
  geodeticDatumControl,
  // units,
} from "../Query/QueryConstants/constants";
// import ErrorTerminal from "../Query/QueryTerminals/ErrorTerminal";
import ConfirmAuth from "../../views/Admin/components/ConfirmAuth";
import CreateErrorLogModal from "../Error/CreateErrorLogModal";
import axios from "axios";

class UpdateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      selectedFields: ["*"],
      tablePages: undefined,
      tablePage: 0,
      numPages: 0,
      page: 0,
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
  close = () =>
    this.setState({
      open: false,
      loading: false,
      selectedFields: ["*"],
      tablePages: undefined,
      tablePage: 0,
      numPages: 0,
      page: 0,
      catalogNumber: this.props.selectedSpecimen.catalogNumber,
      otherCatalogNumber: this.props.selectedSpecimen.otherCatalogNumber,
      recordNumber: this.props.selectedSpecimen.recordNumber,
      order_: this.props.selectedSpecimen.order_,
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
      updateReason: "",
    });

  onChange = (e, { name, value }) => this.setState({ [name]: value });

  async checkAuth(user, password, callback) {
    // console.log(`${user} vs ${password}`);

    if (this.props.userData.username !== user) {
      // attempting auth with diff account
      this.props.notify({
        type: "error",
        message:
          "Attempting authentication with different account than logged in account.",
      });
      return;
    }

    const authData = await axios.post("/api/login/", {
      user: user,
      password: password,
    });

    // console.log(authData);

    if (authData.data.err || authData.data.authed === false) {
      // credentials did not match
      this.props.notify({ type: "error", message: authData.data.err });
    } else {
      // allow whatever command to proceed
      this.props.notify({ type: "success", message: authData.data.message });
      callback();
    }
  }

  onSubmit = (e) => {
    if (this.state.updateReason === "") {
      this.props.notify({
        type: "error",
        message: "Please enter a reason for updating.",
      });
      return;
    }

    let changes = [];
    let errors = [];

    this.state.selectedFields.forEach((field) => {
      // if (this.state[field] && !this.props.selectedSpecimen[field]) {
      //   // property in state doesn't exist in selected specimen
      //   // this means I need to update the DB to reflect the program
      //   // this if should never hit after production, but for now it will just
      //   // log the occurrence
      //   console.log(`DB / Software conflict: check the ${field} field`);
      // } else if (this.state[field] !== this.props.selectedSpecimen[field]) {
      if (this.state[field] !== this.props.selectedSpecimen[field]) {
        let change = {
          field: field,
          oldValue: this.props.selectedSpecimen[field],
          newValue: this.state[field],
        };
        changes.push(change);
        errors = errors.concat(checkField(field, this.state[field]));
      }
    });

    // for (var field of Object.keys(this.props.selectedSpecimen)) {
    //   // console.log(field);
    //   // console.log(
    //   //   `${this.state[field]} vs ${this.props.selectedSpecimen[field]}`
    //   // );

    //   // skip fields not modified or entered by any user
    //   if (
    //     field === "id" ||
    //     field === "modifiedInfo" ||
    //     field === "recordEnteredBy" ||
    //     field === "dateEntered"
    //   )
    //     continue;

    //   if (this.state[field] === this.props.selectedSpecimen[field]) {
    //     // console.log('same values')
    //   } else if (!this.state[field] && this.props.selectedSpecimen[field]) {
    //     // property in state doesn't exist in selected specimen
    //     // this means I need to update the DB to reflect the program
    //     // this if should never hit after production, but for now it will just
    //     // log the occurrence
    //     console.log(`DB / Software conflict: check the ${field} field`);
    //   } else {
    //     let change = {
    //       field: field,
    //       oldValue: this.props.selectedSpecimen[field],
    //       newValue: this.state[field],
    //     };
    //     changes.push(change);
    //     errors = errors.concat(checkField(field, this.state[field]));
    //   }
    // }

    this.setState({ loading: true });

    console.log(errors);

    if (errors.length !== 0) {
      // update error log
      this.props.updateSingleUpdateErrorMessage(errors);
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

      console.log(allModifications);
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

      // this.props.runQuery(updateCommand);
      this.setState({ loading: false });
    } else {
      this.props.notify({
        type: "warning",
        message: "No changes were detected",
      });
      this.setState({ loading: false });
    }
  };

  basicErrorCheck(field, fieldValue) {
    if (!fieldValue) {
      fieldValue = "";
    }

    const errors = checkField(field, fieldValue);
    if (errors.length > 0) {
      const error = errors[0].split(":")[1];
      return { content: error };
    }
  }

  checkPage() {
    // will check for errors on current page
    // will not allow for pagination if errors present
  }

  canContinue() {}

  paginateForward() {
    if (this.state.tablePage === this.state.tablePages.size - 1) {
      return;
    } else {
      this.setState({ tablePage: this.state.tablePage + 1 });
    }
  }

  paginateBackward() {
    if (this.state.tablePage === 0) {
      return;
    } else {
      this.setState({ tablePage: this.state.tablePage - 1 });
    }
  }

  generateTablePages() {
    let { selectedFields } = this.state;

    if (selectedFields.indexOf("*") > -1) {
      selectedFields = headerSelection
        .filter((field, index) => index !== 0)
        .map((header) => {
          return header.value;
        });
    }

    // we only want about 5 fields per page
    let tablePages = new Map();
    if (selectedFields.length <= 5) {
      tablePages.set(0, selectedFields);
    } else {
      let currentPage = [];
      let currentPageNum = 0;
      selectedFields.forEach((field, index) => {
        if (index !== 0 && index % 5 === 0) {
          tablePages.set(currentPageNum++, currentPage);
          currentPage = [];
          currentPage.push(field);
        } else {
          currentPage.push(field);
        }
      });

      if (currentPage.length !== 0) {
        tablePages.set(currentPageNum++, currentPage);
        currentPage = [];
      }
    }

    this.setState({ tablePages: tablePages });
  }

  renderChevron() {
    let chevrons = [];

    for (let i = 0; i < this.state.tablePages.size; i++) {
      chevrons.push(
        <Menu.Item
          active={this.state.tablePage === i}
          as="a"
          onClick={() => this.setState({ tablePage: i })}
        >
          {i + 1}
        </Menu.Item>
      );
    }

    return chevrons;
  }

  getFieldForm(fieldName) {
    switch (fieldName) {
      case "dateIdentified":
      case "loanDate":
      case "loanReturnDate":
        return (
          <SemanticDatepicker
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "country":
        return (
          <Form.Field
            control={Select}
            options={countryControl}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "sex":
        return (
          <Form.Field
            control={Select}
            options={sexControl}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "lifeStage":
        return (
          <Form.Field
            control={Select}
            options={lifeStageControl}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "samplingProtocol":
        return (
          <Form.Field
            control={Select}
            options={samplingProtocolControl}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "isLoaned":
        return (
          <Form.Field
            control={Select}
            options={yesOrNo}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "loanInstitution":
      case "loaneeName":
        return (
          <Form.Field
            control={Input}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "elevationInMeters":
        return (
          <Form.Field
            control={Input}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(
              "elevationInMetersUPDATE",
              this.state[fieldName]
            )}
          />
        );
      case "geodeticDatum":
        return (
          <Form.Field
            control={Select}
            options={geodeticDatumControl}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      default:
        return (
          <Form.Field
            control={Input}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
    }
  }

  // ONE FIELD CHECIK
  renderTable() {
    return (
      <Table celled>
        {/* for field in tablePage (record int:string[]) */}
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>fieldName</Table.HeaderCell>
            <Table.HeaderCell>currentValue</Table.HeaderCell>
            <Table.HeaderCell>proposedChange</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.tablePages.get(this.state.tablePage).map((field) => {
            return (
              <>
                <Table.Row>
                  <Table.Cell>{field}</Table.Cell>
                  <Table.Cell>{this.props.selectedSpecimen[field]}</Table.Cell>
                  <Table.Cell>
                    <Form>
                      {this.getFieldForm(field)}
                      {/* <Form.Field
                        control={Input}
                        name={field}
                        value={this.state[field]}
                        onChange={this.onChange}
                        error={this.basicErrorCheck(field, this.state[field])}
                      /> */}
                    </Form>
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon onClick={() => this.paginateBackward()}>
                  <Icon name="chevron left" />
                </Menu.Item>
                {this.renderChevron()}
                <Menu.Item as="a" icon onClick={() => this.paginateForward()}>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }

  render() {
    if (this.props.disabled) {
      return <div></div>;
    }

    if (!this.props.currentQuery.startsWith("SELECT *")) {
      return (
        <Popup
          on="click"
          basic
          offset="-1000x, 10px"
          position="bottom left"
          content="You must make a 'select all' query to access single update"
          trigger={
            <Icon
              className="expand-on-hover"
              name="edit"
              style={
                // this.props.selectedSpecimen.id === specimen.id
                { float: "right" }
                // : { display: "none" }
              }
            />
          }
        />
      );
    } else {
      const {
        selectedFields,
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
        updateReason,
      } = this.state;

      // console.log(selectedFields);

      return (
        <Modal
          trigger={
            <Icon
              className="expand-on-hover"
              name="edit"
              onClick={() => this.setState({ open: true })}
              style={
                // this.props.selectedSpecimen.id === specimen.id
                { float: "right" }
                // : { display: "none" }
              }
            />
          }
          centered
          scrolling
          open={this.state.open}
          onClose={this.close}
        >
          <Modal.Header>Single Specimen Update</Modal.Header>
          {this.state.page === 0 ? (
            <Modal.Content>
              <Form style={{ display: "2rem" }}>
                <Header size="small">
                  Please select the fields you want to update
                </Header>
                <Form.Field
                  width="8"
                  control={Select}
                  options={headerSelection}
                  search
                  multiple
                  name="selectedFields"
                  value={selectedFields}
                  onChange={this.onChange}
                />
                <Header size="small">
                  Please enter the reason for this update
                </Header>

                <Form.Field
                  control={TextArea}
                  name="updateReason"
                  value={this.state.updateReason}
                  onChange={this.onChange}
                  error={this.basicErrorCheck("updateReason", updateReason)}
                />
              </Form>
            </Modal.Content>
          ) : (
            <Modal.Content>{this.renderTable()}</Modal.Content>
          )}

          {this.state.page === 0 ? (
            <Modal.Actions>
              <CreateHelpModal queryType="UPDATE_SINGLE" />
              <CreateErrorLogModal
                type="Single Update"
                errors={this.props.errorMessages.singleUpdate}
                updateError={this.props.updateSingleUpdateErrorMessage}
              />
              <Button onClick={this.close}>Cancel</Button>
              <Button
                onClick={() => {
                  // generate array of forms or sm, then change page
                  if (this.state.updateReason !== "") {
                    this.generateTablePages();
                    this.setState({ page: 1 });
                  } else {
                    this.props.notify({
                      type: "error",
                      message: "You must enter a reason before continuing",
                    });
                  }
                }}
              >
                Continue
              </Button>
            </Modal.Actions>
          ) : (
            <Modal.Actions>
              <CreateHelpModal queryType="UPDATE_SINGLE" />
              <CreateErrorLogModal
                type="Single Update"
                errors={this.props.errorMessages.singleUpdate}
                updateError={this.props.updateSingleUpdateErrorMessage}
              />
              <Button onClick={() => this.setState({ page: 0 })}>Back</Button>
              <ConfirmAuth
                checkAuth={this.checkAuth.bind(this)}
                handleSubmit={this.onSubmit}
              />
            </Modal.Actions>
          )}
        </Modal>
      );

      return (
        <React.Fragment>
          <Modal
            trigger={
              <Icon
                className="expand-on-hover"
                name="edit"
                onClick={() => this.setState({ open: true })}
                style={
                  // this.props.selectedSpecimen.id === specimen.id
                  { float: "right" }
                  // : { display: "none" }
                }
              />
            }
            centered
            scrolling
            open={this.state.open}
            onClose={this.close}
          >
            <Modal.Header>UPDATE Single Specimen</Modal.Header>
            <Modal.Content>
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

                    <Header size="small">
                      Please enter the reason for this update
                    </Header>
                    {/* <Form>
                      <Form.Field
                        control={Input}
                        fluid
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
                    </Form> */}

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
                              fluid
                              name="collectors"
                              placeholder="Last1,First1 | Last2,First2"
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
              <CreateErrorLogModal
                type="Single Update"
                errors={this.props.errorMessages.singleUpdate}
                updateError={this.props.updateSingleUpdateErrorMessage}
              />
              <ConfirmAuth
                checkAuth={this.props.checkAuth}
                handleSubmit={this.onSubmit}
              />
              {/* <Button onClick={this.onSubmit} color="red">
                  UPDATE
                </Button> */}
            </Modal.Actions>
            {/* {this.props.errorMessages.updateError
              ? this.renderErrorTerminal()
              : null} */}
          </Modal>
        </React.Fragment>
      );
    }
  }
}

export default UpdateDocument;
