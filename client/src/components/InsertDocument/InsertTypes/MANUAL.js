import React from "react";
import {
  Button,
  Grid,
  Form,
  Input,
  Select,
  Message,
  TextArea
} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { checkManualEntry, checkRandomCaps } from "../../../functions/queryChecks";
import ErrorTerminal from "../../Query/QueryTerminals/ErrorTerminal";
import QueryHelp from "../../Query/QueryHelp";
import {
  identificationQualifierControl,
  samplingProtocolControl,
  dispositionControl,
  preparationsControl,
  tubeSizeControl,
  lifeStageControl,
  sexControl,
  setCountOptions
} from "../../Query/QueryConstants/constants";

const yesOrNo = [
  {key: "yes", text: "Yes", value: "Y"},
  {key: "no", text: "No", value: "N"},
]

const familyOptions = [
  { key: "0", text: "Collematacae", value: "Collematacae" },
  { key: "1", text: "Depressariidae", value: "Depressariidae" },
  { key: "2", text: "Erebidae", value: "Erebidae" },
  { key: "3", text: "Geometridae", value: "Geometridae" },
  { key: "4", text: "Momphidae", value: "Momphidae" },
  { key: "5", text: "Nymphalidae", value: "Nymphalidae" },
  { key: "6", text: "Papilionidae", value: "Papilionidae" },
  { key: "7", text: "Plutellidae", value: "Plutellidae" },
  { key: "8", text: "Psychidae", value: "Psychidae" },
  { key: "9", text: "Saturniidae", value: "Saturniidae" },
  { key: "10", text: "Tineidae", value: "Tineidae" }
];

  var countryList = [{key: "-1", text: 'Select One', value: ''}];

  async function getCountries() {
    // list of countries in JSON link
    let fetchedList = await fetch('https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json')
    .then(response => response.json())
    fetchedList.map(country => {
      countryList.push({key: country.Code, text: country.Name, value: country.Name})
    })
    // console.log(countryList)
  }

export default class MANUAL extends React.Component {
  constructor(props) {
    super(props)

    getCountries()

    this.state = {
      activePage: "Manual Insert",
      catalogNumber: "",
      recordNumber: "",
      otherRecordNumber: "",
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
      identifiedBy: "",
      dateIdentified: "",
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
      verbatimElevation: "",
      decimalLatitude: "",
      decimalLongitude: "",
      geodeticDatum: "",
      coordinateUncertainty: "",
      verbatimLatitude: "",
      verbatimLongitude: "",
      georeferencedBy: "",
      disposition: "",
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
      collectors: [
        {firstName: '', lastName: ''}
      ],
      modifiedInfo: "",
      hasError: false,
      loading: false,
      countryList: [],
      numCollectors: 1,
    };
  }


  resetState = () => {
    this.setState({
      activePage: "Manual Insert",
      catalogNumber: "",
      recordNumber: "",
      otherRecordNumber: "",
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
      identifiedBy: "",
      dateIdentified: "",
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
      verbatimElevation: "",
      decimalLatitude: "",
      decimalLongitude: "",
      geodeticDatum: "",
      coordinateUncertainty: "",
      verbatimLatitude: "",
      verbatimLongitude: "",
      georeferencedBy: "",
      disposition: "",
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
      collectors: [
        {firstName: '', lastName: ''}
      ],
      numCollectors: 1,
      modifiedInfo: "",
      hasError: false,
      loading: false
    });
  };

  checkBasicPostSubmit = () => {
    let errors = [];

    // MGCL CHECKS
    if (
      this.state.catalogNumber !== "" &&
      !this.state.catalogNumber.includes("MGCL_")
    ) {
      errors.push(
        "catalogNumber must start with 'MGCL_', followed by 6-8 digits."
      );
    }

    if (
      this.state.catalogNumber !== "" &&
      this.state.catalogNumber.split("_").length !== 2
    ) {
      errors.push(
        "catalogNumber must start with 'MGCL_', followed by 6-8 digits."
      );
    }

    if (
      this.state.catalogNumber !== "" &&
      (this.state.catalogNumber.split("_")[1].length < 6 ||
        this.state.catalogNumber.split("_")[1].length > 8)
    ) {
      errors.push("MGCL_ must be followed by 6-8 digits only.");
    }

    if (
      this.state.catalogNumber !== "" &&
      !this.isNumeric(this.state.catalogNumber.split("_")[1])
    ) {
      errors.push(
        "Digit error: found non-numeric values in catalogNumber after MGCL_"
      );
    }

    if (
      this.state.recordNumber !== "" &&
      !this.state.recordNumber.startsWith("LEP-")
    ) {
      errors.push("recordNumber must start with LEP-, followed by 5-8 digits.");
    }



    return errors;
  };

  // FIXME: BROKEN
  handleSubmit = () => {
    this.setState({ loading: true });
    // alert(JSON.stringify(this.state, null, 2));
    let ret = checkManualEntry(this.state);

    if (ret.errors.length === 0) {

      // once all errors / prechecks completed
      const specimen = {
        catalogNumber: this.state.catalogNumber,
        recordNumber: this.state.recordNumber,
        otherRecordNumber: this.state.otherRecordNumber,
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
        recordedBy: this.state.recordedBy,
        identifiedBy: this.state.identifiedBy,
        dateIdentified: this.parseDate(this.state.dateIdentified),
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
        verbatimElevation: this.state.verbatimElevation,
        decimalLatitude: this.state.decimalLatitude,
        decimalLongitude: this.state.decimalLongitude,
        geodeticDatum: this.state.geodeticDatum,
        coordinateUncertainty: this.state.coordinateUncertainty,
        verbatimLatitude: this.state.verbatimLatitude,
        verbatimLongitude: this.state.verbatimLongitude,
        georeferencedBy: this.state.georeferencedBy,
        disposition: this.state.disposition,
        loanInfo: this.state.loanInfo,
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
      }

      alert(JSON.stringify(specimen, null, 2))

      // send the request

      // this.resetState();
      this.setState({loading: false})
    } 
    
    else {
      this.props.updateInsertErrorMessage(ret.errors);
      this.setState({ hasError: true, loading: false });
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleCollectorChange = (e, {name, value, id}) => {
    id = parseInt(id);
    const newCollector = {
      ...this.state.collectors[id],
      [name]: value
    }

    this.setState({
      collectors: [
        ...this.state.collectors.slice(0, id),
        Object.assign({}, this.state.collectors[id], newCollector),
        ...this.state.collectors.slice(id + 1)
      ]
    })
  }

  handleCollectorCountChange = (e, {name, value, id}) => {
    // get previous count
    let prevCount = this.state.numCollectors;

    // if previous if smaller, concat more items to array
    if (prevCount < value) {
      let newCollectors = [...this.state.collectors].concat(
        Array.from({ length: value - prevCount }, () => {
          return {
            firstName: "",
            lastName: ""
          };
        })
      );

      this.setState({
        [name]: value,
        collectors: newCollectors
      });
    }

    else if (prevCount > value) {
      let newCollectors = [...this.state.collectors].slice(0, value);
      this.setState({
        [name]: value,
        collectors: newCollectors
      });
    }
  }

  checkCollectorErrors = (field, index) => {
    let collector = this.state.collectors[index]
    if (collector[field] === '') {
      return {content: `You must enter a value for ${field}`}
    }

    else if (
      collector[field].startsWith('\'') || collector[field].endsWith('\'') ||
      collector[field].startsWith('"') || collector[field].endsWith('"') ||
      collector[field].startsWith('.') || collector[field].endsWith('.')
    ) {
      return {content: 'Remove starting/trailing punctuation/quotations.'}
    }

  }

  isNumeric = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  parseDate = date => {
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  controlHasString = (control, value) => {
    let options = control.map(option => {
      return option.value;
    });

    if (options.includes(value)) {
      return true;
    } else return false;
  };

  checkBasicPreSubmit = (field, value) => {
    switch (field) {
      case "catalogNumber":
        if (value === "") {
          return false;
        }

        else if (value.indexOf("MGCL_") < 0) {
          return {
            content: `${field} must start with 'MGCL_', followed by 6-8 digits.`
          };
        }

        else if (value.split("_")[1].length < 6 || value.split('_')[1].length > 8) {
          return { content: `MGCL_ must be followed by 6-8 digits.` };
        }

        else if (!this.isNumeric(value.split("_")[1])) {
          let inValidDigs = value.split("_")[1];
          return { content: `Expected digits, found ${inValidDigs}.` };
        }

        else {
          return false;
        }

      case "recordNumber":
        if (value === "") {
          return false;
        }

        else if (value.indexOf("LEP-") < 0) {
          return {
            content: `${field} must start with 'LEP-', followed by 5-8 digits.`
          };
        }

        else if (value.split("-")[1].length < 5 || value.split("-"[1].length > 8)) {
          return { content: `LEP- must be followed by 5-8 digits.` };
        }

        else if (!this.isNumeric(value.split("-")[1])) {
          let inValidDigs = value.split("-")[1];
          return { content: `Expected digits, found ${inValidDigs}.` };
        }

        else {
          return false;
        }

      case "order_":
      case "superfamily":
      case "family":
      case "subfamily":
      case "tribe":
      case "genus":
      case "subgenus":
        let correctValue = checkRandomCaps(value, true)
        if (value === "") {
          return false;
        }

        else if (value[0] !== value[0].toUpperCase()) {
          return { content: "Capitalize the first letter." };
        }

        else if (correctValue !== value) {
          let arr = value.split(' ')
          if (arr.length > 1) {
            for (let i = 1; i < arr.length; i++) {
              if (arr[i][0].toUpperCase() !== arr[i][0])
                return { content: "Be sure to capitalize the first letter in each word." };
            }

            return { content: "Random capitalization detected."}
          }
          else {
            return { content: "Random capitalization detected."}
          }
          // return { content: "Random capitalization detected."}
        }

        else {
          return false;
        }

      case "specificEpithet":
        let correctSpec = checkRandomCaps(value, false)
        // console.log(correctSpec)
        if (value === "") {
          return false;
        }

        else if (value[0] !== value[0].toLowerCase()) {
          return { content: "First letter should be lowercase." };
        }

        else if (correctSpec !== value) {
          let specArr = value.split(' ')
          if (specArr.length > 1) {
            for (let i = 1; i < specArr.length; i++) {
              if (specArr[i][0].toLowerCase() !== specArr[i][0])
                return { content: "Be sure the first letter in each word is lowercase." };
            }

            return { content: "Random capitalization detected."}
          }

          else {
            return {content: 'Random capitalization detected.'}
          }
        }

        else {
          return false;
        }

      case "identificationQualifier":
        if (value === "") {
          return false;
        } 
        
        else if (value[0] !== value[0].toLowerCase()) {
          return { content: "First letter should be lowercase." };
        } 
        
        else if (
          value.includes("'") ||
          value.includes(".") ||
          value.includes('"') ||
          value.includes(",")
        ) {
          return { content: "Remove punctuation." };
        } 
        
        else if (
          !this.controlHasString(identificationQualifierControl, value)
        ) {
          return { content: `${value} is not one of the accepted inputs.` };
        } 
        
        else {
          return false;
        }

      case "recordedBy":
      case "identifiedBy":
      case "dateIdentified":
        let date = this.parseDate(new Date(value));
        //console.log(date);
        if (value === "") {
          return false;
        } 
        
        else {
          return false;
        }

      case "sex":
        if (value === "") {
          return false;
        } 
        
        else if (!this.controlHasString(sexControl, value)) {
          return { content: `${value} is not one of the accepted inputs.` };
        } 
        
        else {
          return false;
        }

      case "preparations":
        if (value === 'Genetic Resources') {
          return {content: 'Warning: See Specify GRR for disposition.'} 
        }

        else {
          return false
        }
      
      default:
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
    let collectorForm = Array.from({length: this.state.numCollectors}).map((collector, index) => {
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
      )
    })

    return collectorForm
  }

  componentDidMount() {
    setTimeout(() => {
      // console.log(countryList)
      if (countryList.length > 0 && this.state.countryList.length === 0) {
        this.setState({countryList: countryList})
      }
    }, 1500)
  }

  render() {
    if (!this.state.hasError && this.props.errorMessages.insertError !== null) {
      this.setState({ hasError: true });
    }

    const {
      catalogNumber,
      recordNumber,
      otherRecordNumber,
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
      verbatimElevation,
      decimalLatitude,
      decimalLongitude,
      geodeticDatum,
      coordinateUncertainty,
      verbatimLatitude,
      verbatimLongitude,
      georeferencedBy,
      disposition,
      loanInfo,
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
      numCollectors
    } = this.state;

    return (
      <React.Fragment>
        <Message>
          <Message.Header>Usage:</Message.Header>
          <p>
            Manually enter the transcription data of the speciment you are
            entering into the database. Be sure to fill out all required fields
            (denoted with *). When all fields are completed, click the Confirm
            button at the bottom of the scroll-view. If any syntactic errors are
            present, a popup will appear with information to help you correct
            it. If you have more than one specimen to enter, consider using the
            paste option on the previous page.
          </p>
        </Message>
        <Grid padded="vertically" style={{ justifyContent: "center" }}>
          <Grid.Row>
            <Form padded="vertically" onSubmit={this.handleSubmit}>
              <div className="scrolling" style={{ minHeight: "55vh" }}>
                <Form.Group widths="equal">
                  <Form.Field
                    id="form-input-control-mgcl"
                    control={Input}
                    label="catalogNumber"
                    placeholder="MGCL-#######"
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
                    id="form-input-control-lep-num"
                    control={Input}
                    label="recordNumber"
                    placeholder="Lep #"
                    name="recordNumber"
                    value={recordNumber}
                    error={this.checkBasicPreSubmit(
                      "recordNumber",
                      recordNumber
                    )}
                    onChange={this.handleChange}
                    disabled={this.state.paste_entry}
                  />
                  <Form.Field
                    id="form-input-control-other-num"
                    control={Input}
                    label="otherRecordNumber"
                    name="otherRecordNumber"
                    value={otherRecordNumber}
                    error={this.checkBasicPreSubmit(
                      "otherRecordNumber",
                      otherRecordNumber
                    )}
                    onChange={this.handleChange}
                    disabled={this.state.paste_entry}
                  />

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
                </Form.Group>

                <Form.Group widths="equal">
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
                    options={familyOptions}
                    label="family"
                    placeholder="Select One"
                    search
                    searchInput={{ id: "form-select-control-family" }}
                    name="family"
                    error={this.checkBasicPreSubmit("family", family)}
                    value={family}
                    onChange={this.handleChange}
                    disabled={this.state.paste_entry}
                  />
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

                </Form.Group>

                <Form.Group widths="equal">
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
                    id="form-input-control-recordedBy"
                    control={Input}
                    label="recordedBy"
                    placeholder="Last Name, First Initial"
                    name="recordedBy"
                    value={recordedBy}
                    error={this.checkBasicPreSubmit("recordedBy", recordedBy)}
                    onChange={this.handleChange}
                    disabled={this.state.paste_entry}
                  />
                  <Form.Field
                    id="form-input-control-identifiedBy"
                    control={Input}
                    label="identifiedBy"
                    placeholder="Last Name, First Initial"
                    name="identifiedBy"
                    value={identifiedBy}
                    error={this.checkBasicPreSubmit(
                      "identifiedBy",
                      identifiedBy
                    )}
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
                    id="form-input-control-protocol"
                    control={Select}
                    label="samplingProtocol"
                    placeholder="Select One"
                    search
                    className="warningField"
                    options={samplingProtocolControl}
                    name="samplingProtocol"
                    value={samplingProtocol}
                    error={this.checkBasicPreSubmit("samplingProtocol", samplingProtocol)}
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
                  <Form.Field
                    id="form-input-control-country"
                    control={Select}
                    search
                    options={this.state.countryList}
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
                </Form.Group>

                <Form.Group widths="equal">
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
                  <Form.Field
                    id="form-input-control-municipality"
                    control={Input}
                    label="municipality"
                    placeholder="Municipality"
                    name="municipality"
                    value={municipality}
                    error={this.checkBasicPreSubmit(
                      "municipality",
                      municipality
                    )}
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
                  <Form.Field
                    id="form-input-control-verbatimElevation"
                    control={Input}
                    label="verbatimElevation"
                    placeholder="Verbatim Elevation"
                    name="verbatimElevation"
                    value={verbatimElevation}
                    error={this.checkBasicPreSubmit(
                      "verbatimElevation",
                      verbatimElevation
                    )}
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
                </Form.Group>

                <Form.Group widths="equal">
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
                  <Form.Field
                    id="form-input-control-georeferencedBy"
                    control={Input}
                    label="georeferencedBy"
                    placeholder=""
                    name="georeferencedBy"
                    value={georeferencedBy}
                    error={this.checkBasicPreSubmit("georeferencedBy", georeferencedBy)}
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
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Field
                    id="form-input-control-loanInfo"
                    control={Input}
                    label="loanInfo"
                    placeholder="CHANGE THIS FORM"
                    name="loanInfo"
                    value={loanInfo}
                    error={this.checkBasicPreSubmit("loanInfo", loanInfo)}
                    onChange={this.handleChange}
                  />
                  <Form.Field
                    id="form-input-control-preparations"
                    control={Select}
                    options={preparationsControl}
                    label="preparations"
                    placeholder="Select One"
                    name="preparations"
                    value={preparations}
                    error={this.checkBasicPreSubmit(
                      "preparations",
                      preparations
                    )}
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
                    error={this.checkBasicPreSubmit("associatedSequences", associatedSequences)}
                    onChange={this.handleChange}
                  />
                  <Form.Field
                    id="form-input-control-associatedReferences"
                    control={Input}
                    label="associatedReferences"
                    placeholder=""
                    name="associatedReferences"
                    value={associatedReferences}
                    error={this.checkBasicPreSubmit("associatedReferences", associatedReferences)}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group widths="equal">
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
                  label="Number of Collectors:"
                  name="numCollectors"
                  value={numCollectors}
                  onChange={this.handleCollectorCountChange}
                />

                {this.renderCollectorForm()}

                  {/* <Form.Field
                    id="form-input-control-collectors"
                    width="sixteen"
                    control={TextArea}
                    label="collectors"
                    placeholder="List Collectors here: Last, First initial;Last, First intial;etc..."
                    name="collectors"
                    value={collectors}
                    error={this.checkBasicPreSubmit("collectors", collectors)}
                    onChange={this.handleChange}
                  /> */}
                

                <Form.Group style={{ float: "right" }}>
                  <QueryHelp queryType="MANUAL_INSERT" />
                  <Button
                    type="button"
                    color="yellow"
                    onClick={() => this.resetState()}
                    style={{ marginLeft: ".5rem" }}
                  >
                    Clear
                  </Button>
                  <Form.Field
                    className="float-right"
                    id="form-button-control-submit"
                    control={Button}
                    content="Confirm"
                    disabled={this.state.paste_entry}
                  />
                </Form.Group>
              </div>
            </Form>
          </Grid.Row>
        </Grid>
        {this.state.hasError ? this.renderErrorTerminal() : null}
      </React.Fragment>
    );
  }
}
