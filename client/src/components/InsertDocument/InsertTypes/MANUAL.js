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
import { checkManualEntry, checkRandomCaps, checkField, checkSpecimen, parseDate } from "../../../functions/queryChecks";
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

  includesPunctuation = field => {
    if (
      field.includes("'") ||
      field.includes(".") ||
      field.includes('"') ||
      field.includes(",")
    ) {
      return true
    }

    else return false
  }

  /*
  *   most of these checks will do the following: 
  *   
  *   1). check if input
  *   2). check for specific field related errors
  *   3). check for capitalization errors
  *   4). if field with control values, checks against control
  */
  // MOVE TO OTHER FILE FOR REUSE WHEN COMPLETED
  checkBasicPostSubmit = () => {
    let errors = [];

    // catalogNumber checks
    if (this.state.catalogNumber !== "") {
      const catalogNumber = this.state.catalogNumber
      if (!catalogNumber.startsWith('MGCL_')) {
        errors.push(
          "catalogNumber must start with 'MGCL_', followed by 6-8 digits."
        );
      }

      if (this.includesPunctuation(catalogNumber)) {
        errors.push(
          "Formatting error (@ catalogNumber): remove punctuation (except '_')."
        )
      }

      if (catalogNumber.split('_').length !== 2) {
        errors.push(
          "catalogNumber must start with 'MGCL_', followed by 6-8 digits."
        );
      }
      else {
        let nums = catalogNumber.split("_")[1]
        if (nums.length < 6 || nums.length > 8) {
          errors.push("MGCL_ must be followed by 6-8 digits only.");
        }

        if (!this.isNumeric(nums)) {
          errors.push("Digit error: found non-numeric values in catalogNumber after MGCL_")
        }
      }
    }


    // recordNumber checks
    if (this.state.recordNumber !== "") {
      const recordNumber = this.state.recordNumber
      if (!recordNumber.startsWith("LEP-")) {
        errors.push("recordNumber must start with LEP-, followed by 5-8 digits.");
      }

      if (this.includesPunctuation(recordNumber)) {
        errors.push(
          "Formatting error (@ recordNumber): Remove punctuation (except '-')."
        )
      }

      if (recordNumber.split('-').length !== 2) {
        errors.push("LEP- must be followed by 5-8 digits.")
      }

      else {
        let nums = recordNumber.split('-')[1]
        if (nums.length < 5 || nums.length > 8) {
          errors.push(`LEP- must be followed by 5-8 digits only. Detected ${nums.length} characters`)
        }

        if (!this.isNumeric(nums)) {
          errors.push("Digit error: found non-numeric values in recordNumber after LEP-")
        }
      }
    }

    
    // order_ checks
    if (this.state.order_ !== "") {
      const order_ = this.state.order_
      // check capitalization
      let correctValue = checkRandomCaps(order_, true)
      if (correctValue !== order_) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${order_}`)
      }
    }

    // superfamily checks
    if (this.state.superfamily !== "") {
      const superfamily = this.state.superfamily
      // check capitalization
      let correctValue = checkRandomCaps(superfamily, true)
      if (correctValue !== superfamily) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${superfamily}`)
      }

      if (this.includesPunctuation(superfamily)) {
        errors.push(
          "Formatting error (@ superfamily): Remove punctuation"
        )
      }
    }

    // family checks
    if (this.state.family !== "") {
      const family = this.state.family
      // check capitalization
      let correctValue = checkRandomCaps(family, true)
      if (correctValue !== family) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${family}`)
      }

      if (this.includesPunctuation(family)) {
        errors.push(
          "Formatting error (@ family): Remove punctuation."
        )
      }
    }

    // subfamily checks
    if (this.state.subfamily !== "") {
      const subfamily = this.state.subfamily
      // check capitalization
      let correctValue = checkRandomCaps(subfamily, true)
      if (correctValue !== subfamily) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${subfamily}`)
      }
    }

    // tribe checks
    if (this.state.tribe !== "") {
      const tribe = this.state.tribe
      // check capitalization
      let correctValue = checkRandomCaps(tribe, true)
      if (correctValue !== tribe) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${tribe}`)
      }
    }

    // genus checks
    if (this.state.genus !== "") {
      const genus = this.state.genus
      // check capitalization
      let correctValue = checkRandomCaps(genus, true)
      if (correctValue !== genus) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${genus}`)
      }
    }

    // subgenus checks
    if (this.state.subgenus !== "") {
      const subgenus = this.state.subgenus
      // check capitalization
      let correctValue = checkRandomCaps(subgenus, true)
      if (correctValue !== subgenus) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${subgenus}`)
      }
    }

    // specificEpithet checks
    if (this.state.specificEpithet !== "") {
      const specificEpithet = this.state.specificEpithet
      // check capitalization
      let correctValue = checkRandomCaps(specificEpithet, false)
      if (correctValue !== specificEpithet) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${specificEpithet}`)
      }
    }

    
    // infraspecificEpithet checks
    if (this.state.infraspecificEpithet !== "") {
      const infraspecificEpithet = this.state.infraspecificEpithet

      // check capitalization
      let correctValue = checkRandomCaps(infraspecificEpithet, false)
      if (correctValue !== infraspecificEpithet) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${infraspecificEpithet}`)
      }
    }


    // identificationQualifier checks
    if (this.state.identificationQualifier !== "") {
      const identificationQualifier = this.state.identificationQualifier

      if (this.includesPunctuation(identificationQualifier)) {
        errors.push("Formatting error: remove punctuation in identificationQualifier.")
      }
    }

    // recordedBy checks
    if (this.state.recordedBy !== "") {
      const recordedBy = this.state.recordedBy

      let correctValue = checkRandomCaps(recordedBy, true)
      if (correctValue !== recordedBy) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${recordedBy}`)
      }
    }


    // identifiedBy checks
    if (this.state.identifiedBy !== "") {
      const identifiedBy = this.state.identifiedBy

      let correctValue = checkRandomCaps(identifiedBy, true)
      if (correctValue !== identifiedBy) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${identifiedBy}`)
      }
    }


    // dateIdentified checks
    if (this.state.dateIdentified !== "") {
      const readableDate = this.parseDate(this.state.dateIdentified)

      // implement errors
    }


    // sex checks 
    if (this.state.sex !== "") {
      const sex = this.state.sex

      if (!this.controlHasString(sexControl, sex)) {
        errors.push(`Control error: ${sex} is not one of the accepted inputs for sex.`)
      }
    }


    // preparations checks
    if (this.state.preparations !== "") {
      const preparations = this.state.preparations

      if (!this.controlHasString(preparationsControl, preparations)) {
        errors.push(`Control error: ${preparations} is not one of the accepted inputs for preparations.`)
      }

      let correctValue = checkRandomCaps(preparations, true)
      if (correctValue !== preparations) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${preparations}`)
      }
    }
    

    // lifeStage checks
    if (this.state.lifeStage !== "") {
      const lifeStage = this.state.lifeStage

      if (!this.controlHasString(lifeStageControl, lifeStage)) {
        errors.push(`Control error: ${lifeStage} is not one of the accepted inputs for lifeStage.`)
      }
    }


    // occurrenceRemarks checks


    // molecularOccurrenceRemarks checks


    // samplingProtocol checks
    if (this.state.samplingProtocol !== "") {
      const samplingProtocol = this.state.samplingProtocol

      if (!this.controlHasString(samplingProtocolControl, samplingProtocol)) {
        errors.push(`Control error: ${samplingProtocol} is not one of the accepted inputs for samplingProtocol.`)
      }
    }


    // habitat checks


    // country checks
    if (this.state.country !== "") {
      const country = this.state.country

      if (!this.controlHasString(countryList, country)) {
        errors.push(`Control error: ${country} is not one of the accepted inputs for country.`)
      }
    }


    // stateProvince checks ## ADD ME ##


    // county checks
    if (this.state.county !== "") {
      const county = this.state.county
      let correctValue = checkRandomCaps(county, true)

      if (correctValue !== county) {
        errors.push(`Formatting error: expected ${correctValue}, recieved ${county}`)
      }
    }


    // municipality checks ## ADD ME ##


    // locality checks ## ADD ME ##


    // verbatimElevation checks  ## ADD ME ##


    // decimalLatitude checks
    if (this.state.decimalLatitude !== "") {
      if (!this.isNumeric(this.state.decimalLatitude)) {
        errors.push('Number error: detected non-numeric values.')
      }

      else {
        const parsedLatitude = parseFloat(this.state.decimalLatitude)
        if (parsedLatitude !== NaN) {
          if (parsedLatitude < -41.0983423 || parsedLatitude > 41.0983423) {
            errors.push(`decimalLatitude out of range: valid values between +- 41.0983423.`)
          }
        }
        else {
          errors.push(`Number error: could not parse number (are there non-numeric values?).`)
        }
      }

    }


    // decimalLongitude checks


    // geodeticDatum checks


    // coordinateUncertainty checks


    // verbatimLatitude checks


    // verbatimLongitude checks


    // georeferencedBy checks


    // disposition checks 
    if (this.state.disposition !== "") {
      const disposition = this.state.disposition

      if (!this.controlHasString(dispositionControl, disposition)) {
        errors.push(`Control error: ${disposition} is not one of the accepted inputs for disposition.`)
      }
    }


    // loanInfo checks


    // freezer checks


    // rack checks


    // box checks


    // tubeSize checks
    if (this.state.tubeSize !== "") {
      const tubeSize = this.state.tubeSize

      if (!this.controlHasString(tubeSizeControl, tubeSize)) {
        errors.push(`Control error: ${tubeSize} is not one of the accepted inputs for tubeSize.`)
      }
    }


    // associatedSequences checks


    // associatedReferences checks


    // witholdData checks
    if (this.state.withholdData !== "") {
      const withholdData = this.state.withholdData

      if (!this.controlHasString(yesOrNo, withholdData)) {
        errors.push(`Control error: ${withholdData} is not one of the accepted inputs for withholdData`)
      }
    }


    // reared checks
    if (this.state.reared !== "") {
      const reared = this.state.reared

      if (!this.controlHasString(yesOrNo, reared)) {
        errors.push(`Control error: ${reared} is not one of the accepted inputs for reared.`)
      }
    }


    // fieldNotes checks


    // collectors checks



    return errors;
  };

  // FIXME: BROKEN
  handleSubmit = () => {
    this.setState({ loading: true });

    //let errors = this.checkBasicPostSubmit()

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
      dateIdentified: parseDate(this.state.dateIdentified),
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

    let errors = checkSpecimen(specimen)

    // console.log(errors)

    if (errors.length === 0) {

      // once all errors / prechecks completed

      //alert(JSON.stringify(specimen, null, 2))

      // send the request

      // this.resetState();
      this.setState({loading: false})
    } 
    
    else {
      this.props.updateInsertErrorMessage(errors);
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

  checkBasicPreSubmit = (field, value) => {
    let errors = checkField(field, value)

    if (errors.length > 0) {
      let displayError = errors[0].indexOf(': ') > -1
      ? errors[0].split(': ')[1]
      : errors[0]

      return {content: displayError}
    }
    else return false
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
