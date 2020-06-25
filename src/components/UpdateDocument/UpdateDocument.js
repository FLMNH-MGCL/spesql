import React from "react";
import {
  Button,
  Modal,
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
      otherCollectors: this.props.selectedSpecimen.otherCollectors,
      updateReason: "",
    };
  }

  show = () => this.setState({ open: true });
  close = () => {
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
    this.props.updateSingleUpdateErrorMessage(null);
  };

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
    const canContinue = this.checkPages();

    if (!canContinue) {
      return;
    }

    let changes = [];
    let errors = [];

    const fields =
      this.state.selectedFields.indexOf("*") > -1
        ? headerSelection.map((header) => header.value)
        : this.state.selectedFields;

    // console.log(fields);

    fields.forEach((field) => {
      // if (this.state[field] && !this.props.selectedSpecimen[field]) {
      //   // property in state doesn't exist in selected specimen
      //   // this means I need to update the DB to reflect the program
      //   // this if should never hit after production, but for now it will just
      //   // log the occurrence
      //   console.log(`DB / Software conflict: check the ${field} field`);
      // } else if (this.state[field] !== this.props.selectedSpecimen[field]) {

      // console.log(
      //   `${field}: ${this.state[field]} vs ${this.props.selectedSpecimen[field]}`
      // );

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
      // console.log(changes);

      console.log(errors);

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;

      // console.log(today)

      let modification = {
        [today]: {
          modifiedBy: this.props.userData.username,
          fieldsChanged: changes,
          reasonForChanges: this.state.updateReason,
        },
      };

      let allModifications = [];
      if (this.props.selectedSpecimen.modifiedInfo !== "") {
        allModifications = JSON.parse(this.props.selectedSpecimen.modifiedInfo);
        allModifications.push(modification);
      } else {
        allModifications = [modification];
      }

      // console.log(allModifications);
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

      // console.log(updateCommand);

      this.props.runQuery(updateCommand, "single");
      this.props.runQuery(this.props.currentQuery);
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

  checkPages() {
    // will check for errors on current page
    // will not allow for pagination if errors present

    let errors = [];

    this.state.tablePages.forEach((value, key, map) => {
      const currentPage = value;

      currentPage.forEach((field) => {
        errors = errors.concat(checkField(field, this.state[field]));
      });
    });

    console.log(errors);

    if (errors.length > 0) {
      this.props.notify({
        type: "error",
        message: "Please check logs for errors",
      });

      this.props.updateSingleUpdateErrorMessage(errors);

      return false;
    } else {
      return true;
    }
  }

  canContinue() {
    const { page, updateReason } = this.state;

    let errors = [];

    if (page === 0) {
      // check reason
      const reasonError = checkField("updateReason", updateReason);
      const fieldSelErr = checkField(
        "selectedFields",
        this.state.selectedFields
      );

      // console.log(reasonError, fieldSelErr);

      if (reasonError.length > 0 || fieldSelErr.length > 0) {
        this.props.notify({
          type: "error",
          message: "Please fix errors on this page before you continue.",
        });
        return false;
      } else {
        this.generateTablePages();
        return true;
      }
    } else {
      this.state.tablePages.get(this.state.tablePage).forEach((field) => {
        errors = errors.concat(checkField(field, this.state[field]));
      });

      if (errors.length > 0) {
        this.props.notify({
          type: "error",
          message: "Please fix errors on this page before you continue.",
        });
        return false;
      }

      return true;
    }
  }

  paginateTableFoward() {
    if (this.state.tablePage === this.state.tablePages.size - 1) {
      return;
    } else if (this.canContinue()) {
      this.setState({ tablePage: this.state.tablePage + 1 });
    }
  }

  paginateTableBackward() {
    if (this.state.tablePage === 0) {
      return;
    } else {
      this.setState({ tablePage: this.state.tablePage - 1 });
    }
  }

  paginateForward() {
    if (this.state.page === 0 && this.canContinue()) {
      this.setState({ page: 1 });
    } else if (this.state.page > 0 && this.state.page < 2) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  paginateBackward() {
    if (this.state.page === 0) {
      return;
    } else {
      this.setState({ page: this.state.page - 1 });
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
          onClick={() => {
            if (this.state.tablePage < i) {
              // check if can continue
              if (this.canContinue()) {
                this.setState({ tablePage: i });
              }
            } else {
              this.setState({ tablePage: i });
            }
          }}
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

      case "preparations":
        return (
          <Form.Field
            control={Select}
            options={preparationsControl}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "identificationQualifier":
        return (
          <Form.Field
            control={Select}
            options={identificationQualifierControl}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "tubeSize":
        return (
          <Form.Field
            control={Select}
            options={tubeSizeControl}
            name={fieldName}
            value={this.state[fieldName]}
            onChange={this.onChange}
            error={this.basicErrorCheck(fieldName, this.state[fieldName])}
          />
        );
      case "disposition":
        return (
          <Form.Field
            control={Select}
            options={dispositionControl}
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
                      <Form.Group>{this.getFieldForm(field)}</Form.Group>
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
                <Menu.Item
                  as="a"
                  icon
                  onClick={() => this.paginateTableBackward()}
                >
                  <Icon name="chevron left" />
                </Menu.Item>
                {this.renderChevron()}
                <Menu.Item
                  as="a"
                  icon
                  onClick={() => this.paginateTableFoward()}
                >
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
      const { selectedFields, updateReason } = this.state;

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
              <Form style={{ width: "90%", margin: "auto" }}>
                <Form.Group widths="sixteen">
                  <Form.Field
                    width="sixteen"
                    label={
                      <Header size="small">
                        Please enter the reason for this update
                      </Header>
                    }
                    control={TextArea}
                    name="updateReason"
                    value={this.state.updateReason}
                    onChange={this.onChange}
                    error={this.basicErrorCheck("updateReason", updateReason)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Field
                    width="8"
                    label={
                      <Header size="small">
                        Please select the fields you want to update
                      </Header>
                    }
                    control={Select}
                    options={headerSelection}
                    search
                    multiple
                    name="selectedFields"
                    value={selectedFields}
                    error={this.basicErrorCheck(
                      "selectedFields",
                      selectedFields
                    )}
                    onChange={this.onChange}
                  />
                </Form.Group>
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
              <Button onClick={this.paginateForward.bind(this)}>
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
              <Button onClick={this.paginateBackward.bind(this)}>Back</Button>
              <ConfirmAuth
                checkAuth={this.checkAuth.bind(this)}
                handleSubmit={this.onSubmit}
              />
            </Modal.Actions>
          )}
        </Modal>
      );
    }
  }
}

export default UpdateDocument;
