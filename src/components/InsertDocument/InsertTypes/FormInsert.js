import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Message,
  TextArea,
  Modal,
  Header,
  Dropdown,
  Icon,
  Segment,
  Checkbox,
  // Checkbox,
  // Dropdown,
} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
// import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import {
  // checkManualEntry,
  // checkRandomCaps,
  checkField,
  checkSpecimen,
  parseDate,
  parseMeasurement,
  parseRawMonth,
} from "../../../functions/queryChecks";
// import { runSingleInsert } from "../../../functions/queries";
import ErrorTerminal from "../../Query/QueryTerminals/ErrorTerminal";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

import "../InsertDocument.css";

import {
  familyControl,
  identificationQualifierControl,
  samplingProtocolControl,
  dispositionControl,
  preparationsControl,
  tubeSizeControl,
  lifeStageControl,
  sexControl,
  setCountOptions,
  countryControl,
  yesOrNo,
  units,
  conditionalCountOptions,
} from "../../Query/QueryConstants/constants";
import CreateHelpModal from "../../Help/CreateHelpModal";
import ConfirmAuth from "../../../views/Admin/components/ConfirmAuth";

export default class FormInsert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: "Manual Insert",
      catalogNumber: "",
      recordNumber: "",
      otherCatalogNumber: "",
      order_: "",
      superfamily: "",
      family: "",
      subfamily: "",
      tribe: "",
      genus: "",
      subgenus: "",
      specificEpithet: "",
      infraspecificEpithet: "",
      identificationQualifier: "",
      recordedBy: "",
      recordedByFirst: "",
      recordedByLast: "",
      otherCollectorsPresent: false,
      identifiedBy: "",
      identifiedByLast: "",
      identifiedByFirst: "",
      dateIdentified: "",
      verbatimDate: "",
      collectedYear: "",
      collectedMonth: "",
      collectedDay: "",
      sex: "",
      lifeStage: "",
      habitat: "",
      occurrenceRemarks: "",
      isMolecular: false,
      molecularOccurrenceRemarks: "",
      samplingProtocol: "",
      country: "",
      stateProvince: "",
      county: "",
      municipality: "",
      locality: "",
      elevationInMeters: "",
      elevationUnit: "",
      decimalLatitude: "",
      decimalLongitude: "",
      geodeticDatum: "",
      coordinateUncertainty: "",
      verbatimLatitude: "",
      verbatimLongitude: "",
      georeferencedBy: "",
      disposition: "",
      isLoaned: false,
      loanInstitution: "",
      loaneeLast: "",
      loaneeFirst: "",
      loaneeName: "",
      loanReturnDate: "",
      loanRemarks: "",
      loanInfo: "",
      preparations: "",
      freezer: "",
      rack: "",
      box: "",
      tubeSize: "",
      associatedSequences: "",
      associatedReferences: "",
      withholdData: "",
      reared: "",
      fieldNotes: "",
      collectors: [{ firstName: "", lastName: "" }],
      modifiedInfo: "",
      hasError: false,
      loading: false,
      // countryList: [],
      numCollectors: 1,
    };
  }

  resetState = () => {
    this.setState({
      activePage: "Manual Insert",
      catalogNumber: "",
      recordNumber: "",
      otherCatalogNumber: "",
      order_: "",
      superfamily: "",
      family: "",
      subfamily: "",
      tribe: "",
      genus: "",
      subgenus: "",
      specificEpithet: "",
      infraspecificEpithet: "",
      identificationQualifier: "",
      recordedBy: "",
      recordedByFirst: "",
      recordedByLast: "",
      identifiedBy: "",
      identifiedByLast: "",
      identifiedByFirst: "",
      dateIdentified: "",
      verbatimDate: "",
      collectedYear: "",
      collectedMonth: "",
      collectedDay: "",
      sex: "",
      lifeStage: "",
      habitat: "",
      occurrenceRemarks: "",
      molecularOccurrenceRemarks: "",
      samplingProtocol: "",
      country: "",
      stateProvince: "",
      county: "",
      municipality: "",
      locality: "",
      elevationInMeters: "",
      elevationUnit: "",
      decimalLatitude: "",
      decimalLongitude: "",
      geodeticDatum: "",
      coordinateUncertainty: "",
      verbatimLatitude: "",
      verbatimLongitude: "",
      georeferencedBy: "",
      disposition: "",
      loanInstitution: "",
      loaneeName: "",
      loanReturnDate: "",
      loanRemarks: "",
      loanInfo: "",
      preparations: "",
      freezer: "",
      rack: "",
      box: "",
      tubeSize: "",
      associatedSequences: "",
      associatedReferences: "",
      withholdData: "",
      reared: "",
      fieldNotes: "",
      collectors: [{ firstName: "", lastName: "" }],
      numCollectors: 1,
      modifiedInfo: "",
      hasError: false,
      loading: false,
    });
  };

  includesPunctuation = (field) => {
    if (
      field.includes("'") ||
      field.includes(".") ||
      field.includes('"') ||
      field.includes(",")
    ) {
      return true;
    } else return false;
  };

  // FIXME: BROKEN
  handleSubmit = async () => {
    this.setState({ loading: true });

    //let errors = this.checkBasicPostSubmit()
    if (this.state.isLoaned) {
      var today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;

      var loanInfo = {
        [today]: {
          institution: this.state.loanInstitution,
          person: this.state.loaneeLast + ", " + this.state.loaneeFirst,
          expectedReturn: parseDate(this.state.loanReturnDate),
          remarks: this.state.loanRemarks,
          isReturned: "No",
        },
      };

      loanInfo = JSON.stringify([loanInfo]);
      // alert(loanInfo);
      // return;
    }

    const specimen = {
      catalogNumber: this.state.catalogNumber,
      recordNumber: this.state.recordNumber,
      otherCatalogNumber: this.state.otherCatalogNumber,
      order_: this.state.order_,
      superfamily: this.state.superfamily,
      family: this.state.family,
      subfamily: this.state.subfamily,
      tribe: this.state.tribe,
      genus: this.state.genus,
      subgenus: this.state.subgenus,
      specificEpithet: this.state.specificEpithet,
      infraspecificEpithet: this.state.infraspecificEpithet,
      identificationQualifier: this.state.identificationQualifier,
      recordedBy: `${this.state.recordedByLast}, ${this.state.recordedByFirst}`,
      identifiedBy: `${this.state.identifiedByLast}, ${this.state.identifiedByFirst}`,
      dateIdentified: parseDate(this.state.dateIdentified),
      verbatimDate: this.state.verbatimDate,
      collectedYear: this.state.collectedYear,
      collectedMonth: parseRawMonth(this.state.collectedMonth),
      collectedDay: this.state.collectedDay,
      sex: this.state.sex,
      lifeStage: this.state.lifeStage,
      habitat: this.state.habitat,
      occurrenceRemarks: this.state.occurrenceRemarks,
      molecularOccurrenceRemarks: this.state.molecularOccurrenceRemarks,
      samplingProtocol: this.state.samplingProtocol,
      country: this.state.country,
      stateProvince: this.state.stateProvince,
      county: this.state.county,
      municipality: this.state.municipality,
      locality: this.state.locality,
      elevationInMeters: this.state.elevationInMeters,
      decimalLatitude: this.state.decimalLatitude,
      decimalLongitude: this.state.decimalLongitude,
      geodeticDatum: this.state.geodeticDatum,
      coordinateUncertainty: this.state.coordinateUncertainty,
      verbatimLatitude: this.state.verbatimLatitude,
      verbatimLongitude: this.state.verbatimLongitude,
      georeferencedBy: this.state.georeferencedBy,
      disposition: this.state.disposition,
      loanInfo: loanInfo,
      preparations: this.state.preparations,
      freezer: this.state.freezer,
      rack: this.state.rack,
      box: this.state.box,
      tubeSize: this.state.tubeSize,
      associatedSequences: this.state.associatedSequences,
      associatedReferences: this.state.associatedReferences,
      withholdData: this.state.withholdData,
      reared: this.state.reared,
      fieldNotes: this.state.fieldNotes,
      collectors: this.state.collectors,
    };

    let errors = checkSpecimen(specimen);

    console.log(errors);

    alert(JSON.stringify(specimen, null, 2));
    this.setState({ loading: false });

    // if (errors.length === 0) {
    //   // TODO: uncomment when ready
    //   const insertData = await runSingleInsert(specimen);
    //   console.log(insertData);

    //   if (!insertData.data.success) {
    //     let error = [
    //       `SQL ERROR: Code: ${insertData.data.data.code}, Message: ${insertData.data.data.sqlMessage}`,
    //     ];
    //     this.props.notify({
    //       type: "error",
    //       message: "Uh oh, an error detected. Please check INSERT error log",
    //     });
    //     this.props.updateInsertErrorMessage(error);
    //     this.setState({ hasError: true, loading: false });
    //   } else {
    //   }
    // } else {
    //   this.props.updateInsertErrorMessage(errors);
    //   this.setState({ hasError: true, loading: false });
    // }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleChangeDate = (date, { name }) => {
    this.setState({ [name]: date });
  };

  handleCollectorChange = (e, { name, value, id }) => {
    id = parseInt(id);
    const newCollector = {
      ...this.state.collectors[id],
      [name]: value,
    };

    this.setState({
      collectors: [
        ...this.state.collectors.slice(0, id),
        Object.assign({}, this.state.collectors[id], newCollector),
        ...this.state.collectors.slice(id + 1),
      ],
    });
  };

  handleCollectorCountChange = (e, { name, value, id }) => {
    // get previous count
    let prevCount = this.state.numCollectors;

    // if previous if smaller, concat more items to array
    if (prevCount < value) {
      let newCollectors = [...this.state.collectors].concat(
        Array.from({ length: value - prevCount }, () => {
          return {
            firstName: "",
            lastName: "",
          };
        })
      );

      this.setState({
        [name]: value,
        collectors: newCollectors,
      });
    } else if (prevCount > value) {
      let newCollectors = [...this.state.collectors].slice(0, value);
      this.setState({
        [name]: value,
        collectors: newCollectors,
      });
    }
  };

  checkCollectorErrors = (field, index) => {
    let collector = this.state.collectors[index];
    if (collector[field] === "") {
      return { content: `You must enter a value for ${field}` };
    } else if (
      collector[field].startsWith("'") ||
      collector[field].endsWith("'") ||
      collector[field].startsWith('"') ||
      collector[field].endsWith('"') ||
      collector[field].startsWith(".") ||
      collector[field].endsWith(".")
    ) {
      return {
        content: "Remove starting/trailing punctuation/quotations.",
      };
    }
  };

  checkBasicPreSubmit = (field, value) => {
    let errors = checkField(field, value);

    if (errors.length > 0) {
      let displayError =
        errors[0].indexOf(": ") > -1 ? errors[0].split(": ")[1] : errors[0];

      return { content: displayError };
    } else {
      return false;
    }
  };

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

  renderCollectorForm = () => {
    let collectorForm = Array.from({
      length: this.state.numCollectors,
    }).map((collector, index) => {
      return (
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="First Name"
            name="firstName"
            error={this.checkCollectorErrors("firstName", index)}
            value={this.state.collectors[index].firstName}
            onChange={this.handleCollectorChange}
            id={String(index)}
          />

          <Form.Field
            control={Input}
            label="Last Name"
            name="lastName"
            error={this.checkCollectorErrors("lastName", index)}
            value={this.state.collectors[index].lastName}
            onChange={this.handleCollectorChange}
            id={String(index)}
          />
        </Form.Group>
      );
    });

    return collectorForm;
  };

  renderLoanForm = () => (
    <React.Fragment>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="loanInstitution"
          name="loanInstitution"
          value={this.state.loanInstitution}
          onChange={this.handleChange}
          id="loanInstitution"
        />
        <Form.Field
          control={Input}
          label="loaneeLast"
          name="loaneeLast"
          value={this.state.loaneeLast}
          onChange={this.handleChange}
          id="loaneeLast"
        />
        <Form.Field
          control={Input}
          label="loaneeFirst"
          name="loaneeFirst"
          value={this.state.loaneeFirst}
          onChange={this.handleChange}
          id="loaneeFirst"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <SemanticDatepicker
          label="loanReturnDate"
          placeholder="YYYY-MM-DD"
          name="loanReturnDate"
          value={this.state.loanReturnDate}
          // error={this.checkBasicPreSubmit(
          //     "expectedReturn",
          //     expectedReturn
          // )}
          onChange={this.handleChange}
        />
        <SemanticDatepicker
          label="loanStartDate"
          placeholder="YYYY-MM-DD"
          name="loanStartDate"
          value={this.state.loanStartDate}
          // error={this.checkBasicPreSubmit(
          //     "expectedReturn",
          //     expectedReturn
          // )}
          onChange={this.handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Field
          control={TextArea}
          width="16"
          label="loanRemarks"
          name="loanRemarks"
          value={this.state.loanRemarks}
          onChange={this.handleChange}
        />
      </Form.Group>
    </React.Fragment>
  );

  render() {
    if (!this.state.hasError && this.props.errorMessages.insertError !== null) {
      this.setState({ hasError: true });
    }

    console.log(this.state);

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
      recordedByFirst,
      recordedByLast,
      identifiedByFirst,
      identifiedByLast,
      dateIdentified,
      verbatimDate,
      collectedYear,
      collectedMonth,
      sex,
      lifeStage,
      habitat,
      occurrenceRemarks,
      isMolecular,
      molecularOccurrenceRemarks,
      samplingProtocol,
      country,
      stateProvince,
      county,
      municipality,
      locality,
      elevationInMeters,
      elevationUnit,
      decimalLatitude,
      decimalLongitude,
      geodeticDatum,
      coordinateUncertainty,
      verbatimLatitude,
      verbatimLongitude,
      georeferencedBy,
      disposition,
      isLoaned,
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
      otherCollectorsPresent,
      numCollectors,
    } = this.state;

    return (
      <>
        <Modal.Header>Form Insertion</Modal.Header>
        <Modal.Content>
          <Message>
            This form is for the manual entry of each field of a single specimen
            to be inserted into the databse.
          </Message>
          <Form>
            <Header size="small">Record / Identification</Header>
            <Segment>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>catalogNumber</label>
                  <Input placeholder="MGCL_######" />
                </Form.Field>
                <Form.Field>
                  <label>recordNumber</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>otherCatalogNumber</label>
                  <Input placeholder="LEP#####" />
                </Form.Field>
              </Form.Group>
            </Segment>

            <Header size="small">Specimen Information</Header>
            <Segment>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>order_</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>superfamily</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>family</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>subfamily</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>tribe</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>genus</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>subgenus</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>specificEpithet</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>infraspecificEpithet</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>sex</label>
                  <Select
                    options={sexControl}
                    value={sex}
                    placeholder="Select One"
                  />
                </Form.Field>
                <Form.Field>
                  <label>lifeStage</label>
                  <Select
                    options={lifeStageControl}
                    value={lifeStage}
                    placeholder="Select One"
                  />
                </Form.Field>
                <Form.Field>
                  <label>habitat</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>

              <Form.Group>
                <Form.Field>
                  <label>samplingProtocol</label>
                  <Select options={samplingProtocolControl} />
                </Form.Field>
                <Form.Field>
                  <label>reared</label>
                  <Select options={yesOrNo} />
                </Form.Field>
              </Form.Group>

              <Form.Group>
                <Form.Field width="16">
                  <label>occurrenceRemarks</label>
                  <TextArea />
                </Form.Field>
              </Form.Group>

              <Form.Group inline>
                <label>Molecular specimen?</label>
                <Form.Checkbox
                  label="Yes"
                  checked={isMolecular}
                  onClick={() => this.setState({ isMolecular: true })}
                />
                <Form.Checkbox
                  label="No"
                  checked={!isMolecular}
                  onClick={() => this.setState({ isMolecular: false })}
                />
              </Form.Group>

              {isMolecular && (
                <Form.Group>
                  <Form.Field width="16">
                    <label>molecularOccurrenceRemarks</label>
                    <TextArea />
                  </Form.Field>
                </Form.Group>
              )}
            </Segment>

            <Header size="small">Collection Information</Header>
            <Segment>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>identificationQualifier</label>
                  <Select options={identificationQualifierControl} />
                </Form.Field>
                <Form.Field>
                  <label>recordedBy (last name)</label>
                  <Input placeholder="Last" />
                </Form.Field>
                <Form.Field>
                  <label>recordedBy (first name)</label>
                  <Input placeholder="First" />
                </Form.Field>
              </Form.Group>

              <Form.Group
                inline
                style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
              >
                <label>Were there other collectors?</label>
                <Form.Checkbox
                  label="Yes"
                  checked={otherCollectorsPresent}
                  onClick={() =>
                    this.setState({ otherCollectorsPresent: true })
                  }
                />
                <Form.Checkbox
                  label="No"
                  checked={!otherCollectorsPresent}
                  onClick={() =>
                    this.setState({ otherCollectorsPresent: false })
                  }
                />

                {otherCollectorsPresent && (
                  <Form.Field inline style={{ marginLeft: "1rem" }}>
                    <label>Number of additional collectors</label>
                    <Select
                      options={setCountOptions}
                      value={numCollectors}
                      name="numCollectors"
                      onChange={this.handleCollectorCountChange}
                    />
                  </Form.Field>
                )}
              </Form.Group>

              {otherCollectorsPresent && this.renderCollectorForm()}

              <Form.Group widths="equal">
                <Form.Field>
                  <label>identifiedBy (last name)</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>identifiedBy (first name)</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <SemanticDatepicker label="dateIdentified" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>verbatimDate</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>collectedYear</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>collectedMonth</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>collectedDay</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>preparations</label>
                  <Select options={preparationsControl} />
                </Form.Field>
                <Form.Field>
                  <label>freezer</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field>
                  <label>rack</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>box</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>tubeSize</label>
                  <Select options={tubeSizeControl} />
                </Form.Field>
              </Form.Group>

              <Form.Group
                inline
                style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
              >
                <label>Is this specimen on loan?</label>
                <Form.Checkbox
                  label="Yes"
                  checked={isLoaned}
                  onClick={() => this.setState({ isLoaned: true })}
                />
                <Form.Checkbox
                  label="No"
                  checked={!isLoaned}
                  onClick={() => this.setState({ isLoaned: false })}
                />
              </Form.Group>

              {isLoaned && this.renderLoanForm()}

              <Form.Group widths="equal">
                <Form.Field>
                  <label>disposition</label>
                  <Select
                    options={dispositionControl}
                    placeholder="Select One"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Should this specimen data be witheld?</label>
                  <Form.Checkbox
                    label="Yes"
                    checked={this.state.withholdData}
                    onClick={() => this.setState({ withholdData: true })}
                  />
                  <Form.Checkbox
                    label="No"
                    checked={!this.state.withholdData}
                    onClick={() => this.setState({ withholdData: false })}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group>
                <Form.Field width="16">
                  <label>fieldNotes</label>
                  <TextArea placeholder="ADDME" />
                </Form.Field>
              </Form.Group>

              <Form.Group>
                <Form.Field width="16">
                  <label>associatedSequences</label>
                  <TextArea placeholder="ADDME" />
                </Form.Field>
              </Form.Group>

              <Form.Group>
                <Form.Field width="16">
                  <label>associatedReferences</label>
                  <TextArea placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
            </Segment>

            <Header size="small">Locality Information</Header>
            <Segment>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>country</label>
                  <Select options={countryControl} />
                </Form.Field>
                <Form.Field>
                  <label>stateProvince</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>county</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>municipality</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>locality</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>geodeticDatum</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>decimalLatitude</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>decimalLongitude</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>verbatimLatitude</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
                <Form.Field>
                  <label>verbatimLongitude</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>elevation</label>
                  <Input
                    labelPosition="right"
                    label={
                      <Dropdown basic defaultValue="meters" options={units} />
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <label>coordinateUncertainty</label>
                  <Input
                    labelPosition="right"
                    label={
                      <Dropdown basic defaultValue="meters" options={units} />
                    }
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>georeferencedBy</label>
                  <Input placeholder="ADDME" />
                </Form.Field>
              </Form.Group>
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <CreateHelpModal />
          <Button>Cancel</Button>
          <Button>Submit</Button>
        </Modal.Actions>
      </>
    );

    return (
      <React.Fragment>
        <Modal.Content>
          <Message>
            <Message.Header>Usage:</Message.Header>
            <p>
              NOTE: NOT READY FOR USE...Manually enter the transcription data of
              the specimen you are entering into the database. Be sure to fill
              out all required fields. When all fields are completed, click the
              Confirm button at the bottom of the scroll-view. If any syntactic
              errors are present, a popup will appear with information to help
              you correct it. If you have more than one specimen to enter,
              consider using the paste option on the previous page.
            </p>
          </Message>
          <Form padded="vertically" onSubmit={this.handleSubmit}>
            <div style={{ minHeight: "55vh" }}>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-mgcl"
                  control={Input}
                  label="catalogNumber"
                  placeholder="MGCL_#######"
                  name="catalogNumber"
                  value={catalogNumber}
                  error={this.checkBasicPreSubmit(
                    "catalogNumber",
                    catalogNumber
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-other-num"
                  control={Input}
                  label="otherCatalogNumber"
                  placeholder="LEP#####"
                  name="otherCatalogNumber"
                  value={otherCatalogNumber}
                  error={this.checkBasicPreSubmit(
                    "otherCatalogNumber",
                    otherCatalogNumber
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-lep-num"
                  control={Input}
                  label="recordNumber"
                  placeholder=""
                  name="recordNumber"
                  value={recordNumber}
                  error={this.checkBasicPreSubmit("recordNumber", recordNumber)}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-order"
                  control={Input}
                  label="order_"
                  placeholder="Order"
                  name="order_"
                  error={this.checkBasicPreSubmit("order_", order_)}
                  value={order_}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-superfamily"
                  control={Input}
                  label="superfamily"
                  placeholder="Superfamily"
                  name="superfamily"
                  value={superfamily}
                  error={this.checkBasicPreSubmit("superfamily", superfamily)}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  control={Select}
                  options={familyControl}
                  label="family"
                  placeholder="Select One"
                  search
                  searchInput={{
                    id: "form-select-control-family",
                  }}
                  name="family"
                  error={this.checkBasicPreSubmit("family", family)}
                  value={family}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-subfamily"
                  control={Input}
                  label="subfamily"
                  placeholder="Subfamily"
                  name="subfamily"
                  value={subfamily}
                  error={this.checkBasicPreSubmit("subfamily", subfamily)}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-tribe"
                  control={Input}
                  label="tribe"
                  placeholder="Tribe"
                  name="tribe"
                  value={tribe}
                  error={this.checkBasicPreSubmit("tribe", tribe)}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-genus"
                  control={Input}
                  label="genus"
                  placeholder="Genus"
                  name="genus"
                  value={genus}
                  error={this.checkBasicPreSubmit("genus", genus)}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-subgenus"
                  control={Input}
                  label="subgenus"
                  placeholder="Subgenus"
                  name="subgenus"
                  value={subgenus}
                  error={this.checkBasicPreSubmit("subgenus", subgenus)}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-species"
                  control={Input}
                  label="specificEpithet"
                  placeholder="Species"
                  name="specificEpithet"
                  value={specificEpithet}
                  error={this.checkBasicPreSubmit(
                    "specificEpithet",
                    specificEpithet
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-infra"
                  control={Input}
                  label="infraspecificEpithet"
                  placeholder=""
                  name="infraspecificEpithet"
                  value={infraspecificEpithet}
                  error={this.checkBasicPreSubmit(
                    "infraspecificEpithet",
                    infraspecificEpithet
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-recordedBy-first"
                  control={Input}
                  width="eight"
                  label="recordedBy (First)"
                  placeholder="First Name"
                  name="recordedByFirst"
                  value={recordedByFirst}
                  error={this.checkBasicPreSubmit(
                    "recordedBy",
                    `${recordedByLast},${recordedByFirst}`
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-recordedBy-last"
                  control={Input}
                  width="eight"
                  label="recordedBy (Last)"
                  placeholder="Last Name"
                  name="recordedByLast"
                  value={recordedByLast}
                  error={this.checkBasicPreSubmit(
                    "recordedBy",
                    `${recordedByLast},${recordedByFirst}`
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-identifiedBy"
                  control={Input}
                  label="identifiedBy (First)"
                  placeholder="First Name"
                  name="identifiedByFirst"
                  value={identifiedByFirst}
                  error={this.checkBasicPreSubmit(
                    "identifiedBy",
                    `${identifiedByLast},${identifiedByFirst}`
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />

                <Form.Field
                  id="form-input-control-identifiedBy"
                  control={Input}
                  label="identifiedBy (Last)"
                  placeholder="Last Name"
                  name="identifiedByLast"
                  value={identifiedByLast}
                  error={this.checkBasicPreSubmit(
                    "identifiedBy",
                    `${identifiedByLast},${identifiedByFirst}`
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="verbatimDate"
                  placeholder="YYYY/MM/DD"
                  name="verbatimDate"
                  value={verbatimDate}
                  error={this.checkBasicPreSubmit("verbatimDate", verbatimDate)}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  control={Input}
                  label="collectedYear"
                  placeholder="YYYY"
                  name="collectedYear"
                  value={collectedYear}
                  error={this.checkBasicPreSubmit(
                    "collectedYear",
                    collectedYear
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  control={Input}
                  label="collectedMonth"
                  placeholder="MM"
                  name="collectedMonth"
                  value={collectedMonth}
                  error={this.checkBasicPreSubmit(
                    "collectedMonth",
                    collectedMonth
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-identificationQualifier"
                  control={Select}
                  options={identificationQualifierControl}
                  label="identificationQualifier"
                  placeholder="Select One"
                  name="identificationQualifier"
                  value={identificationQualifier}
                  error={this.checkBasicPreSubmit(
                    "identificationQualifier",
                    identificationQualifier
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  control={Select}
                  options={sexControl}
                  label="sex"
                  placeholder="Select One"
                  name="sex"
                  value={sex}
                  error={this.checkBasicPreSubmit("sex", sex)}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-dateIdentified"
                  control={SemanticDatepicker}
                  label="dateIdentified"
                  placeholder="YYYY-MM-DD"
                  name="dateIdentified"
                  value={dateIdentified}
                  error={this.checkBasicPreSubmit(
                    "dateIdentified",
                    dateIdentified
                  )}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-lifeStage"
                  control={Select}
                  options={lifeStageControl}
                  label="lifeStage"
                  placeholder="Select One"
                  name="lifeStage"
                  value={lifeStage}
                  error={this.checkBasicPreSubmit("lifeStage", lifeStage)}
                  onChange={this.handleChange}
                  disabled={this.state.paste_entry}
                />
                <Form.Field
                  id="form-input-control-protocol"
                  control={Select}
                  label="samplingProtocol"
                  placeholder="Select One"
                  search
                  className="warningField"
                  options={samplingProtocolControl}
                  name="samplingProtocol"
                  value={samplingProtocol}
                  error={this.checkBasicPreSubmit(
                    "samplingProtocol",
                    samplingProtocol
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-habitat"
                  control={Input}
                  label="habitat"
                  placeholder="Habitat"
                  name="habitat"
                  value={habitat}
                  error={this.checkBasicPreSubmit("habitat", habitat)}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="sixteen">
                <Form.Field
                  id="form-input-control-occurrenceRemarks"
                  width="sixteen"
                  control={TextArea}
                  label="occurrenceRemarks"
                  placeholder="Remarks about occurrence"
                  name="occurrenceRemarks"
                  value={occurrenceRemarks}
                  error={this.checkBasicPreSubmit(
                    "occurrenceRemarks",
                    occurrenceRemarks
                  )}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="sixteen">
                <Form.Field
                  id="form-input-control-moccurrenceRemarks"
                  width="sixteen"
                  control={TextArea}
                  label="molecularOccurrenceRemarks"
                  placeholder="Remarks about molecular occurrence"
                  name="molecularOccurrenceRemarks"
                  value={molecularOccurrenceRemarks}
                  error={this.checkBasicPreSubmit(
                    "molecularOccurrenceRemarks",
                    molecularOccurrenceRemarks
                  )}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-country"
                  control={Select}
                  search
                  options={countryControl}
                  label="country"
                  placeholder="Select One"
                  name="country"
                  value={country}
                  error={this.checkBasicPreSubmit("country", country)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-stateProvince"
                  control={Input}
                  label="stateProvince"
                  placeholder="State or Province"
                  name="stateProvince"
                  value={stateProvince}
                  error={this.checkBasicPreSubmit(
                    "stateProvince",
                    stateProvince
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-county"
                  control={Input}
                  label="county"
                  placeholder="County"
                  name="county"
                  value={county}
                  error={this.checkBasicPreSubmit("county", county)}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-municipality"
                  control={Input}
                  label="municipality"
                  placeholder="Municipality"
                  name="municipality"
                  value={municipality}
                  error={this.checkBasicPreSubmit("municipality", municipality)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-locality"
                  control={Input}
                  label="locality"
                  placeholder="Locality"
                  name="locality"
                  value={locality}
                  error={this.checkBasicPreSubmit("locality", locality)}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-elevationInMeters"
                  control={Input}
                  label="elevationInMeters (value)"
                  placeholder="Verbatim Elevation"
                  name="elevationInMeters"
                  value={elevationInMeters}
                  error={this.checkBasicPreSubmit(
                    "elevationInMeters",
                    parseMeasurement(elevationInMeters + " " + elevationUnit)
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-elevationInMeters-units"
                  control={Select}
                  label="elevationInMeters (unit)"
                  options={units}
                  placeholder="Select One"
                  name="elevationUnit"
                  value={elevationUnit}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-decimalLatitude"
                  control={Input}
                  label="decimalLatitude"
                  placeholder="Decimal Latitude"
                  name="decimalLatitude"
                  value={decimalLatitude}
                  error={this.checkBasicPreSubmit(
                    "decimalLatitude",
                    decimalLatitude
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-decimalLongitude"
                  control={Input}
                  label="decimalLongitude"
                  placeholder="Decimal Longitude"
                  name="decimalLongitude"
                  value={decimalLongitude}
                  error={this.checkBasicPreSubmit(
                    "decimalLongitude",
                    decimalLongitude
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-geodeticDatum"
                  control={Input}
                  label="geodeticDatum"
                  placeholder="Geodetic Datum"
                  name="geodeticDatum"
                  value={geodeticDatum}
                  error={this.checkBasicPreSubmit(
                    "geodeticDatum",
                    geodeticDatum
                  )}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-coordinateUncertainty"
                  control={Input}
                  label="coordinateUncertainty"
                  placeholder="Coordinate Uncertainty"
                  name="coordinateUncertainty"
                  value={coordinateUncertainty}
                  error={this.checkBasicPreSubmit(
                    "coordinateUncertainty",
                    coordinateUncertainty
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-verbatimLatitude"
                  control={Input}
                  label="verbatimLatitude"
                  placeholder="Verbatim Latitude"
                  name="verbatimLatitude"
                  value={verbatimLatitude}
                  error={this.checkBasicPreSubmit(
                    "verbatimLatitude",
                    verbatimLatitude
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-verbatimLongitude"
                  control={Input}
                  label="verbatimLongitude"
                  placeholder="Verbatim Longitude"
                  name="verbatimLongitude"
                  value={verbatimLongitude}
                  error={this.checkBasicPreSubmit(
                    "verbatimLongitude",
                    verbatimLongitude
                  )}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-georeferencedBy"
                  control={Input}
                  label="georeferencedBy"
                  placeholder=""
                  name="georeferencedBy"
                  value={georeferencedBy}
                  error={this.checkBasicPreSubmit(
                    "georeferencedBy",
                    georeferencedBy
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-disposition"
                  control={Select}
                  label="disposition"
                  options={dispositionControl}
                  placeholder="Select One"
                  name="disposition"
                  value={disposition}
                  error={this.checkBasicPreSubmit("disposition", disposition)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-loanInfo"
                  control={Select}
                  options={yesOrNo}
                  label="isLoaned"
                  placeholder="Yes / No"
                  name="isLoaned"
                  value={isLoaned}
                  // error={this.checkBasicPreSubmit(
                  //     "loanInfo",
                  //     loanInfo
                  // )}
                  onChange={this.handleChange}
                />
              </Form.Group>

              {isLoaned === "Y" ? this.renderLoanForm() : null}

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-preparations"
                  control={Select}
                  options={preparationsControl}
                  label="preparations"
                  placeholder="Select One"
                  name="preparations"
                  value={preparations}
                  error={this.checkBasicPreSubmit("preparations", preparations)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-freezer"
                  control={Input}
                  label="freezer"
                  placeholder="Freezer"
                  name="freezer"
                  value={freezer}
                  error={this.checkBasicPreSubmit("freezer", freezer)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-rack"
                  control={Input}
                  label="rack"
                  placeholder="rack"
                  name="rack"
                  value={rack}
                  error={this.checkBasicPreSubmit("rack", rack)}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-box"
                  control={Input}
                  label="box"
                  placeholder="Box"
                  name="box"
                  value={box}
                  error={this.checkBasicPreSubmit("box", box)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-tubeSize"
                  control={Select}
                  options={tubeSizeControl}
                  label="tubeSize"
                  placeholder="Select One"
                  name="tubeSize"
                  value={tubeSize}
                  error={this.checkBasicPreSubmit("tubeSize", tubeSize)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-associatedSequences"
                  control={Input}
                  label="associatedSequences"
                  placeholder=""
                  name="associatedSequences"
                  value={associatedSequences}
                  error={this.checkBasicPreSubmit(
                    "associatedSequences",
                    associatedSequences
                  )}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-associatedReferences"
                  control={Input}
                  label="associatedReferences"
                  placeholder=""
                  name="associatedReferences"
                  value={associatedReferences}
                  error={this.checkBasicPreSubmit(
                    "associatedReferences",
                    associatedReferences
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-withholdData"
                  control={Select}
                  options={yesOrNo}
                  label="withholdData"
                  placeholder="Y/N"
                  name="withholdData"
                  value={withholdData}
                  error={this.checkBasicPreSubmit("withholdData", withholdData)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  id="form-input-control-reared"
                  control={Select}
                  options={yesOrNo}
                  label="reared"
                  placeholder="Y/N"
                  name="reared"
                  value={reared}
                  error={this.checkBasicPreSubmit("reared", reared)}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="sixteen">
                <Form.Field
                  id="form-input-control-fieldNotes"
                  width="sixteen"
                  control={TextArea}
                  label="fieldNotes"
                  placeholder="fieldNotes"
                  name="fieldNotes"
                  value={fieldNotes}
                  error={this.checkBasicPreSubmit("fieldNotes", fieldNotes)}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Field
                control={Select}
                options={setCountOptions}
                label="Number of Other Collectors:"
                name="numCollectors"
                value={numCollectors}
                onChange={this.handleCollectorCountChange}
              />

              {this.renderCollectorForm()}
            </div>
          </Form>
          {this.state.hasError ? this.renderErrorTerminal() : null}
        </Modal.Content>
        <Modal.Actions>
          <CreateHelpModal queryType="MANUAL_INSERT" />
          <Button onClick={() => this.props.closeModal()}>Cancel</Button>
          <Button
            type="button"
            color="yellow"
            onClick={() => this.resetState()}
          >
            Clear Form
          </Button>
          <ConfirmAuth
            checkAuth={this.props.checkAuth}
            handleSubmit={this.handleSubmit.bind(this)}
          />
          {/* <Button
            style={{ backgroundColor: "#5c6ac4", color: "#fff" }}
            onClick={this.handleSubmit}
            loading={this.state.loading}
          >
            Submit
          </Button> */}
        </Modal.Actions>
      </React.Fragment>
    );
  }
}
