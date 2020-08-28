import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  TextArea,
  Modal,
  Header,
  Dropdown,
  Segment,
  Progress,
  Container,
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
} from "../../../functions/queryChecks";
import { runSingleInsert } from "../../../functions/queries";
import ErrorTerminal from "../../terminals/ErrorTerminal";

// import "../InsertDocument.css";

import {
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
  geodeticDatumControl,
} from "../../../constants/constants";
import CreateHelpModal from "../CreateHelpModal";
import ConfirmAuth from "../../auth/ConfirmAuth";
import { Checkmark } from "react-checkmark";
import CreateErrorLogModal from "../CreateErrorLogModal";

export default class FormInsert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      databaseTable: "",
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
      numCollectors: 1,
      collectors: [{ firstName: "", lastName: "" }],
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
      hasRemarks: false,
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
      elevationUnit: "meters",
      decimalLatitude: "",
      decimalLongitude: "",
      geodeticDatum: "",
      coordinateUncertainty: "",
      coordinateUncertaintyUnit: "meters",
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
      preparations: "",
      freezer: "",
      rack: "",
      box: "",
      tubeSize: "",
      hasAssociatedSequences: false,
      associatedSequences: "",
      hasAssociatedReferences: false,
      associatedReferences: "",
      withholdData: false,
      reared: "",
      hasNotes: false,
      fieldNotes: "",
      modifiedInfo: "",
      hasError: false,
      loading: false,
      // countryList: [],
    };
  }

  resetState = () => {
    this.setState({
      page: 0,
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
      hasRemarks: false,
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
      hasAssociatedSequences: false,
      associatedSequences: "",
      hasAssociatedReferences: false,
      associatedReferences: "",
      withholdData: "",
      reared: "",
      hasNotes: false,
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

  // converts state obj collectors to readable string of collectors
  // conforms to darwin core of | separators
  gatherCollectors = () => {
    let otherCollectorsString = "";
    this.state.collectors.forEach((collector, index) => {
      if (index !== this.state.collectors.length - 1) {
        // add the separator
        otherCollectorsString += `${collector.lastName},${collector.firstName} | `;
      } else {
        // dont add separator
        otherCollectorsString += `${collector.lastName},${collector.firstName}`;
      }
    });
    return otherCollectorsString;
  };

  handleSubmit = async (userData) => {
    this.setState({ loading: true });

    // handle fields with strange edge cases !!!
    const recordedBy =
      this.state.recordedByFirst === "" && this.state.recordedByLast === ""
        ? ""
        : `${this.state.recordedByLast},${this.state.recordedByFirst}`;

    const identifiedBy =
      this.state.identifiedByFirst === "" && this.state.identifiedByLast === ""
        ? ""
        : `${this.state.identifiedByLast},${this.state.identifiedByFirst}`;

    const otherCollectors = this.state.otherCollectorsPresent
      ? this.gatherCollectors()
      : "";

    // move to precheck!!
    // const validDateIdentified = this.validateDate();
    const dateIdentified =
      this.state.dateIdentified === ""
        ? ""
        : parseDate(this.state.dateIdentified);

    const occurrenceRemarks = this.state.hasRemarks
      ? this.state.occurrenceRemarks
      : "";

    const molecularOccurrenceRemarks = this.state.isMolecular
      ? this.state.molecularOccurrenceRemarks
      : "";

    const elevationInMeters = parseMeasurement(
      `${this.state.elevationInMeters} ${this.state.elevationUnit}`
    );

    const coordinateUncertainty = parseMeasurement(
      `${this.state.coordinateUncertainty} ${this.state.coordinateUncertaintyUnit}`
    );

    // loan information
    const loanInstitution = this.state.isLoaned
      ? this.state.loanInstitution
      : "";

    const loaneeName = this.state.isLoaned
      ? this.state.loaneeFirst !== "" && this.state.loaneeLast !== ""
        ? `${this.state.loaneeLast},${this.state.loaneeFirst}`
        : ""
      : "";

    const loanReturnDate = this.state.isLoaned
      ? this.state.loanReturnDate === ""
        ? ""
        : parseDate(this.state.loanReturnDate)
      : "";

    const loanStartDate = this.state.isLoaned
      ? this.state.loanStartDate === ""
        ? ""
        : parseDate(this.state.loanStartDate)
      : "";

    const loanRemarks = this.state.isLoaned ? this.state.loanRemarks : "";

    const associatedSequences = this.state.hasAssociatedSequences
      ? this.state.associatedSequences
      : "";

    const associatedReferences = this.state.hasAssociatedReferences
      ? this.state.associatedReferences
      : "";

    const fieldNotes = this.state.hasNotes ? this.state.fieldNotes : "";

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
      recordedBy: recordedBy,
      identifiedBy: identifiedBy,
      dateIdentified: dateIdentified,
      verbatimDate: this.state.verbatimDate,
      collectedYear: this.state.collectedYear,
      collectedMonth: this.state.collectedMonth,
      collectedDay: this.state.collectedDay,
      sex: this.state.sex,
      lifeStage: this.state.lifeStage,
      habitat: this.state.habitat,
      occurrenceRemarks: occurrenceRemarks,
      molecularOccurrenceRemarks: molecularOccurrenceRemarks,
      samplingProtocol: this.state.samplingProtocol,
      country: this.state.country,
      stateProvince: this.state.stateProvince,
      county: this.state.county,
      municipality: this.state.municipality,
      locality: this.state.locality,
      elevationInMeters: elevationInMeters,
      decimalLatitude: this.state.decimalLatitude,
      decimalLongitude: this.state.decimalLongitude,
      geodeticDatum: this.state.geodeticDatum,
      coordinateUncertainty: coordinateUncertainty,
      verbatimLatitude: this.state.verbatimLatitude,
      verbatimLongitude: this.state.verbatimLongitude,
      georeferencedBy: this.state.georeferencedBy, //FIXME
      disposition: this.state.disposition,
      isLoaned: this.state.isLoaned ? "Y" : "N",
      loanInstitution: loanInstitution,
      loaneeName: loaneeName,
      loanStartDate: loanStartDate, // FIXME
      loanReturnDate: loanReturnDate,
      loanRemarks: loanRemarks,
      preparations: this.state.preparations,
      freezer: this.state.freezer,
      rack: this.state.rack,
      box: this.state.box,
      tubeSize: this.state.tubeSize,
      associatedSequences: associatedSequences,
      associatedReferences: associatedReferences,
      withholdData: this.state.withholdData ? "Y" : "N",
      reared: this.state.reared,
      fieldNotes: fieldNotes,
      otherCollectors: otherCollectors,
      modifiedInfo: "",
    };

    const errors = checkSpecimen(specimen);

    if (errors.length >= 1) {
      this.props.notify({
        type: "error",
        title: "Errors detected",
        message: "Please check the corresponding error log",
      });
      this.props.updateManualInsertErrorMessage(errors);
    } else {
      let errorMessage;
      const insertData = await runSingleInsert(
        specimen,
        this.state.databaseTable,
        userData
      ).catch((error) => {
        const response = error.response;
        errorMessage = response.data;
        return null;
      });

      if (errorMessage || !insertData) {
        this.props.notify({
          type: "error",
          title: "Insertion failed",
          message: errorMessage,
        });
      } else {
        if (insertData.data.success) {
          this.props.notify({
            type: "success",
            title: "Insertion Completed",
            message: "Successfully inserted new specimen!",
          });
        } else {
          this.props.notify({
            type: "error",
            title: "SQL Error detected",
            message: insertData.data.data.sqlMessage,
          });
        }
      }
    }

    this.setState({ loading: false });
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

  getOfficeCharacter(index) {
    let characters = [
      { first: "Dwight", last: "Schrute" },
      { first: "Jim", last: "Halpert" },
      { first: "Michael", last: "Scott" },
      { first: "Pam", last: "Beesly" },
      { first: "Creed", last: "Bratton" },
      { first: "Kevin", last: "Malone" },
      { first: "Angela", last: "Martin" },
      { first: "Toby", last: "Flenderson" },
      { first: "Stanley", last: "Hudson" },
      { first: "Ryan", last: "Howard" },
      { first: "Holly", last: "Flax" },
      { first: "Kelly", last: "Kapoor" },
      { first: "Robert", last: "California" },
      { first: "Phyllis", last: "Vance" },
      { first: "David", last: "Wallace" },
    ];

    if (index >= characters.length) {
      return characters[Math.floor(Math.random() * characters.length)];
    } else {
      return characters[index];
    }
  }

  renderCollectorForm = () => {
    let collectorForm = Array.from({
      length: this.state.numCollectors,
    }).map((collector, index) => {
      const person = this.getOfficeCharacter(index);
      return (
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="First Name"
            name="firstName"
            placeholder={person.first}
            error={this.checkCollectorErrors("firstName", index)}
            value={this.state.collectors[index].firstName}
            onChange={this.handleCollectorChange}
            id={String(index)}
          />

          <Form.Field
            control={Input}
            label="Last Name"
            name="lastName"
            placeholder={person.last}
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

  renderActions() {
    const { page } = this.state;

    if (page === 8) {
      // render submit actions
      return (
        <>
          <CreateHelpModal />
          <CreateErrorLogModal
            type="Manual Insert"
            errors={this.props.errorMessages.manualInsert}
            updateError={this.props.updateManualInsertErrorMessage}
          />
          <Button onClick={() => this.props.closeModal()}>Cancel</Button>
          <Button
            disabled={page === 0}
            onClick={() => this.paginate("backward")}
          >
            Go Back
          </Button>
          <ConfirmAuth
            checkAuth={this.props.checkAuth}
            handleSubmit={this.handleSubmit}
          />
        </>
      );
    } else {
      // console.log(this.props);
      return (
        <>
          <CreateHelpModal />
          <CreateErrorLogModal
            type="Manual Insert"
            errors={this.props.errorMessages.manualInsert}
            updateError={this.props.updateManualInsertErrorMessage}
          />
          <Button onClick={() => this.props.closeModal()}>Cancel</Button>
          <Button
            disabled={page === 0}
            onClick={() => this.paginate("backward")}
          >
            Go Back
          </Button>
          <Button onClick={() => this.paginate("forward")}>Continue</Button>
        </>
      );
    }
  }

  renderPage() {
    const {
      page,
      databaseTable,
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
      collectedDay,
      sex,
      lifeStage,
      habitat,
      hasRemarks,
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
      coordinateUncertaintyUnit,
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
      hasAssociatedSequences,
      associatedSequences,
      hasAssociatedReferences,
      associatedReferences,
      withholdData,
      reared,
      hasNotes,
      fieldNotes,
      otherCollectorsPresent,
      numCollectors,
    } = this.state;

    switch (page) {
      case 0:
        return (
          <>
            <Header size="small">Database Information</Header>
            <Segment>
              <Form.Group inline>
                <Form.Field
                  control={Select}
                  options={this.props.tableOptions}
                  label="Which table is this entry going?"
                  placeholder="Select One"
                  name="databaseTable"
                  value={databaseTable}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "databaseTable",
                    databaseTable
                  )}
                />
              </Form.Group>
            </Segment>
            <Header size="small">Record / Identification</Header>
            <Segment>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="catalogNumber"
                  placeholder="MGCL_######"
                  name="catalogNumber"
                  value={catalogNumber}
                  error={this.checkBasicPreSubmit(
                    "catalogNumber",
                    catalogNumber
                  )}
                  onChange={this.handleChange}
                />

                <Form.Field
                  control={Input}
                  label="recordNumber"
                  placeholder="LK45"
                  name="recordNumber"
                  value={recordNumber}
                  error={this.checkBasicPreSubmit("recordNumber", recordNumber)}
                  onChange={this.handleChange}
                />

                <Form.Field
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
                />
              </Form.Group>
            </Segment>
          </>
        );
      case 1:
        return (
          <>
            <Header size="small">Specimen Information</Header>
            <Segment>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="order_"
                  placeholder="Lepidoptera"
                  name="order_"
                  value={order_}
                  error={this.checkBasicPreSubmit("order_", order_)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  label="superfamily"
                  placeholder="Bombycoidea"
                  name="superfamily"
                  value={superfamily}
                  error={this.checkBasicPreSubmit("superfamily", superfamily)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  label="family"
                  placeholder="Sphingidae"
                  name="family"
                  value={family}
                  error={this.checkBasicPreSubmit("family", family)}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="subfamily"
                  placeholder="Sphinginae"
                  name="subfamily"
                  value={subfamily}
                  error={this.checkBasicPreSubmit("subfamily", subfamily)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  label="tribe"
                  placeholder="Acherontiini"
                  name="tribe"
                  value={tribe}
                  error={this.checkBasicPreSubmit("tribe", tribe)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  label="genus"
                  placeholder="Agrius"
                  name="genus"
                  value={genus}
                  error={this.checkBasicPreSubmit("genus", genus)}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="subgenus"
                  placeholder="Subgenus"
                  name="subgenus"
                  value={subgenus}
                  error={this.checkBasicPreSubmit("subgenus", subgenus)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  label="specificEpithet"
                  placeholder="cingulata"
                  name="specificEpithet"
                  value={specificEpithet}
                  error={this.checkBasicPreSubmit(
                    "specificEpithet",
                    specificEpithet
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  label="infraspecificEpithet"
                  placeholder="Subspecies"
                  name="infraspecificEpithet"
                  value={infraspecificEpithet}
                  error={this.checkBasicPreSubmit(
                    "infraspecificEpithet",
                    infraspecificEpithet
                  )}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  options={sexControl}
                  label="sex"
                  placeholder="Select One"
                  name="sex"
                  value={sex}
                  error={this.checkBasicPreSubmit("sex", sex)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Select}
                  options={lifeStageControl}
                  label="lifeStage"
                  placeholder="Select One"
                  name="lifeStage"
                  value={lifeStage}
                  error={this.checkBasicPreSubmit("lifeStage", lifeStage)}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  label="habitat"
                  placeholder="Habitat"
                  name="habitat"
                  value={habitat}
                  error={this.checkBasicPreSubmit("habitat", habitat)}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  options={samplingProtocolControl}
                  label="samplingProtocol"
                  placeholder="Select One"
                  name="samplingProtocol"
                  value={samplingProtocol}
                  error={this.checkBasicPreSubmit(
                    "samplingProtocol",
                    samplingProtocol
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Select}
                  options={yesOrNo}
                  label="reared"
                  placeholder="Select One"
                  name="reared"
                  value={reared}
                  error={this.checkBasicPreSubmit("reared", reared)}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Segment>
          </>
        );
      case 2:
        return (
          <>
            <Header size="small">Specimen Information</Header>
            <Segment>
              <Form.Group inline>
                <label>Are there any occurrence remarks?</label>
                <Form.Checkbox
                  label="Yes"
                  checked={hasRemarks}
                  onClick={() => this.setState({ hasRemarks: true })}
                />
                <Form.Checkbox
                  label="No"
                  checked={!hasRemarks}
                  onClick={() => this.setState({ hasRemarks: false })}
                />
              </Form.Group>

              {hasRemarks && (
                <Form.Group>
                  <Form.Field width="16">
                    <label>occurrenceRemarks</label>
                    <TextArea
                      placeholder="ADD EXAMPLE TO ME"
                      name="occurrenceRemarks"
                      value={occurrenceRemarks}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
              )}

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
                    <TextArea
                      placeholder="ADD EXAMPLE TO ME"
                      name="molecularOccurrenceRemarks"
                      value={molecularOccurrenceRemarks}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
              )}
            </Segment>
          </>
        );
      case 3:
        return (
          <>
            <Header size="small">Collection Information</Header>
            <Segment>
              <Form.Group widths="equal">
                <Form.Field
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
                />
                <Form.Field
                  control={Input}
                  label="recordedBy (last name)"
                  placeholder="Jinn"
                  name="recordedByLast"
                  value={recordedByLast}
                  error={this.checkBasicPreSubmit(
                    "recordedBy",
                    `${recordedByLast},${recordedByFirst}`
                  )}
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  label="recordedBy (first name)"
                  placeholder="Qui-Gon"
                  name="recordedByFirst"
                  value={recordedByFirst}
                  error={this.checkBasicPreSubmit(
                    "recordedBy",
                    `${recordedByLast},${recordedByFirst}`
                  )}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="identifiedBy (last name)"
                  placeholder="Kenobi"
                  name="identifiedByLast"
                  value={identifiedByLast}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "identifiedBy",
                    `${identifiedByLast},${identifiedByFirst}`
                  )}
                />

                <Form.Field
                  control={Input}
                  label="identifiedBy (first name)"
                  placeholder="Obi-Wan"
                  name="identifiedByFirst"
                  value={identifiedByFirst}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "identifiedBy",
                    `${identifiedByLast},${identifiedByFirst}`
                  )}
                />
                <SemanticDatepicker
                  label="dateIdentified"
                  name="dateIdentified"
                  placeholder="YYYY-MM-DD"
                  value={dateIdentified}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "dateIdentified",
                    dateIdentified
                  )}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="verbatimDate"
                  placeholder="YYYY-MM-DD"
                  name="verbatimDate"
                  value={verbatimDate}
                  onChange={this.handleChange}
                />

                <Form.Field
                  control={Input}
                  label="collectedYear"
                  placeholder="YYYY"
                  name="collectedYear"
                  value={collectedYear}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "collectedYear",
                    collectedYear
                  )}
                />
                <Form.Field
                  control={Input}
                  label="collectedMonth"
                  placeholder="MM"
                  name="collectedMonth"
                  value={collectedMonth}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "collectedMonth",
                    collectedMonth
                  )}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="collectedDay"
                  placeholder="DD"
                  name="collectedDay"
                  value={collectedDay}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit("collectedDay", collectedDay)}
                />
                <Form.Field
                  control={Select}
                  options={preparationsControl}
                  placeholder="Select One"
                  label="preparations"
                  name="preparations"
                  value={preparations}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit("preparations", preparations)}
                />
                <Form.Field
                  control={Input}
                  label="freezer"
                  placeholder="Kawahara##"
                  name="freezer"
                  value={freezer}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit("freezer", freezer)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  placeholder="Rack #"
                  label="rack"
                  name="rack"
                  value={rack}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit("rack", rack)}
                />
                <Form.Field
                  control={Input}
                  label="box"
                  placeholder="1-20"
                  name="box"
                  value={box}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit("box", box)}
                />
                <Form.Field
                  control={Select}
                  options={tubeSizeControl}
                  label="tubeSize"
                  placeholder="Select One"
                  name="tubeSize"
                  value={tubeSize}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  options={dispositionControl}
                  label="disposition"
                  placeholder="Select One"
                  name="disposition"
                  value={disposition}
                  onChange={this.handleChange}
                />
                <Form.Field>
                  <label>Should this specimen data be witheld?</label>
                  <Form.Checkbox
                    label="Yes"
                    checked={withholdData}
                    onClick={() => this.setState({ withholdData: true })}
                  />
                  <Form.Checkbox
                    label="No"
                    checked={!withholdData}
                    onClick={() => this.setState({ withholdData: false })}
                  />
                </Form.Field>
              </Form.Group>
            </Segment>
          </>
        );
      case 4:
        return (
          <>
            <Header size="small">Collection Information</Header>
            <Segment>
              <Form.Group inline>
                <label>Are there any field notes?</label>
                <Form.Checkbox
                  label="Yes"
                  checked={hasNotes}
                  onClick={() => this.setState({ hasNotes: true })}
                />
                <Form.Checkbox
                  label="No"
                  checked={!hasNotes}
                  onClick={() => this.setState({ hasNotes: false })}
                />
              </Form.Group>

              {hasNotes && (
                <Form.Group>
                  <Form.Field width="16">
                    <label>fieldNotes</label>
                    <TextArea
                      placeholder="Any field notes that does not have its own header would go here."
                      name="fieldNotes"
                      value={fieldNotes}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
              )}

              <Form.Group inline>
                <label>Are there any associated sequences?</label>
                <Form.Checkbox
                  label="Yes"
                  checked={hasAssociatedSequences}
                  onClick={() =>
                    this.setState({ hasAssociatedSequences: true })
                  }
                />
                <Form.Checkbox
                  label="No"
                  checked={!hasAssociatedSequences}
                  onClick={() =>
                    this.setState({ hasAssociatedSequences: false })
                  }
                />
              </Form.Group>

              {hasAssociatedSequences && (
                <Form.Group>
                  <Form.Field width="16">
                    <label>associatedSequences</label>
                    <TextArea
                      placeholder="http://www.ncbi.nlm.nih.gov/nuccore/U34853.1, http://www.ncbi.nlm.nih.gov/nuccore/GU328060"
                      name="associatedSequences"
                      value={associatedSequences}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
              )}

              <Form.Group inline>
                <label>Are there any associated references?</label>
                <Form.Checkbox
                  label="Yes"
                  checked={hasAssociatedReferences}
                  onClick={() =>
                    this.setState({ hasAssociatedReferences: true })
                  }
                />
                <Form.Checkbox
                  label="No"
                  checked={!hasAssociatedReferences}
                  onClick={() =>
                    this.setState({ hasAssociatedReferences: false })
                  }
                />
              </Form.Group>

              {hasAssociatedReferences && (
                <Form.Group>
                  <Form.Field width="16">
                    <label>associatedReferences</label>
                    <TextArea
                      placeholder="[link], Author(s). Year. Academic Source Name."
                      name="associatedReferences"
                      value={associatedReferences}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
              )}
            </Segment>
          </>
        );
      case 5:
        return (
          <>
            <Header size="small">Collection Information</Header>

            <Segment style={{ maxHeight: "35rem", overflow: "scroll" }}>
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
            </Segment>
          </>
        );

      case 6:
        return (
          <>
            <Header size="small">Collection Information</Header>
            <Segment>
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
            </Segment>
          </>
        );
      case 7:
        return (
          <>
            <Header size="small">Locality Information</Header>
            <Segment>
              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  options={countryControl}
                  label="country"
                  placeholder="Select One"
                  name="country"
                  value={country}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit("country", country)}
                />

                <Form.Field
                  control={Input}
                  label="stateProvince"
                  placeholder="Colorado"
                  name="stateProvince"
                  value={stateProvince}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "stateProvince",
                    stateProvince
                  )}
                />
                <Form.Field
                  control={Input}
                  label="county"
                  placeholder="Los Lagos"
                  name="county"
                  value={county}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit("county", county)}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="municipality"
                  placeholder="Holzminden"
                  name="municipality"
                  value={municipality}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit("municipality", municipality)}
                />
                <Form.Field
                  control={Input}
                  label="locality"
                  placeholder="Bariloche"
                  name="locality"
                  value={locality}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit("locality", locality)}
                />
                <Form.Field
                  control={Select}
                  options={geodeticDatumControl}
                  label="geodeticDatum"
                  placeholder="Select One"
                  name="geodeticDatum"
                  value={geodeticDatum}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "geodeticDatum",
                    geodeticDatum
                  )}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="decimalLatitude"
                  placeholder="-41.0983423"
                  name="decimalLatitude"
                  value={decimalLatitude}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "decimalLatitude",
                    decimalLatitude
                  )}
                />
                <Form.Field
                  control={Input}
                  label="decimalLongitude"
                  placeholder="-121.1761111"
                  name="decimalLongitude"
                  value={decimalLongitude}
                  onChange={this.handleChange}
                  error={this.checkBasicPreSubmit(
                    "decimalLongitude",
                    decimalLongitude
                  )}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>verbatimLatitude</label>
                  <Input
                    placeholder="41 05 54.03S"
                    name="verbatimLatitude"
                    value={verbatimLatitude}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>verbatimLongitude</label>
                  <Input
                    placeholder={`121d 10' 34" W`}
                    name="verbatimLongitude"
                    value={verbatimLongitude}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  error={this.checkBasicPreSubmit(
                    "elevationInMetersUPDATE",
                    elevationInMeters
                  )}
                >
                  <label>elevation</label>
                  <Input
                    name="elevationInMeters"
                    placeholder="53.95"
                    value={elevationInMeters}
                    onChange={this.handleChange}
                    labelPosition="right"
                    label={
                      <Dropdown
                        basic
                        value={elevationUnit}
                        name="elevationUnit"
                        options={units}
                        onChange={this.handleChange}
                      />
                    }
                  />
                </Form.Field>

                <Form.Field
                  error={this.checkBasicPreSubmit(
                    "coordinateUncertainty",
                    coordinateUncertainty
                  )}
                >
                  <label>coordinateUncertainty</label>
                  <Input
                    name="coordinateUncertainty"
                    placeholder="23"
                    value={coordinateUncertainty}
                    onChange={this.handleChange}
                    labelPosition="right"
                    label={
                      <Dropdown
                        basic
                        value={coordinateUncertaintyUnit}
                        name="coordinateUncertaintyUnit"
                        options={units}
                        onChange={this.handleChange}
                      />
                    }
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>georeferencedBy</label>
                  <Input
                    placeholder="Anakin Skywalker"
                    value={georeferencedBy}
                    name="georeferencedBy"
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>
            </Segment>
          </>
        );
      case 8:
        return (
          <>
            <Header size="medium" textAlign="center">
              Form Completed!
            </Header>
            <Checkmark size="large" />
            <Container text textAlign="center" style={{ marginTop: "1rem" }}>
              <p>
                Press submit to attempt the insert. Be sure to fix any errors
                that are detected and displayed in the error log.
              </p>
            </Container>
          </>
        );
      default:
        return (
          <div>
            How did this happen?? You broke it!! Congrats!! (please let aaron
            know exactly what you did to produce this, so he can work on fixing
            it)
          </div>
        );
    }
  }

  paginate(direction) {
    let potentialPage = this.state.page;
    switch (direction) {
      case "forward":
        potentialPage += 1;
        if (this.state.page === 8) {
          // last page
        } else {
          this.setState({ page: potentialPage });
        }
        break;
      case "backward":
        potentialPage -= 1;
        if (this.state.page === 0) {
          // first page
        } else {
          this.setState({ page: potentialPage });
        }
        break;
      default:
        break;
    }
  }

  render() {
    if (!this.state.hasError && this.props.errorMessages.insertError !== null) {
      this.setState({ hasError: true });
    }

    return (
      <>
        <Modal.Header>Form Insertion</Modal.Header>
        <Modal.Content>
          <Form>{this.renderPage()}</Form>
          <div style={{ marginTop: "2rem" }}>
            <Progress
              percent={Number(Math.ceil((this.state.page / 8) * 100))}
              progress
              indicating
            />
          </div>
        </Modal.Content>
        <Modal.Actions>{this.renderActions()}</Modal.Actions>
      </>
    );
  }
}
