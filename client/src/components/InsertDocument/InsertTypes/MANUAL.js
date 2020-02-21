import React from 'react'
import axios from 'axios'
import { Button, Grid, Form, Input, Select, Checkbox, Message, Header, Divider, Menu, Icon, TextArea } from 'semantic-ui-react'
import { checkManualEntry } from '../../../functions/queryChecks'
import ErrorTerminal from '../../Query/QueryTerminals/ErrorTerminal'
import QueryHelp from '../../Query/QueryHelp'

const familyOptions = [
    { key: '0', text: 'Collematacae', value: 'Collematacae' },
    { key: '1', text: 'Depressariidae', value: 'Depressariidae' },
    { key: '2', text: 'Erebidae', value: 'Erebidae' },
    { key: '3', text: 'Geometridae', value: 'Geometridae' },
    { key: '4', text: 'Momphidae', value: 'Momphidae' },
    { key: '5', text: 'Nymphalidae', value: 'Nymphalidae' },
    { key: '6', text: 'Papilionidae', value: 'Papilionidae' },
    { key: '7', text: 'Plutellidae', value: 'Plutellidae' },
    { key: '8', text: 'Psychidae', value: 'Psychidae' },
    { key: '9', text: 'Saturniidae', value: 'Saturniidae' },
    { key: '10', text: 'Tineidae', value: 'Tineidae' },
]

export default class MANUAL extends React.Component {
    state = {
        activePage: 'Manual Insert',
        catalogNumber: '',
        recordNumber: '',
        order_: '',
        superfamily: '',
        family: '',
        subfamily: '',
        tribe: '',
        genus: '',
        subgenus: '',
        specificEpithet: '',
        identificationQualifier: '',
        recordedBy: '',
        identifiedBy: '',
        dateIdentified: '',
        sex: '',
        lifeStage: '',
        habitat: '',
        occurrenceRemarks: '',
        country: '',
        stateProvince: '',
        county: '',
        municipality: '',
        locality: '',
        verbatimElevation: '',
        decimalLatitude: '',
        decimalLongitude: '',
        geodeticDatum: '',
        coordinateUncertainty: '',
        verbatimLatitude: '',
        verbatimLongitude: '',
        loanInfo: '',
        preparations: '',
        freezer: '',
        rack: '',
        box: '',
        tubeSize: '',
        collectors: '',
        modifiedInfo: '',
        hasError: false,
        loading: false
    }

    resetState = () => {
        this.setState({
            activePage: 'Manual Insert',
            catalogNumber: '',
            recordNumber: '',
            order_: '',
            superfamily: '',
            family: '',
            subfamily: '',
            tribe: '',
            genus: '',
            subgenus: '',
            specificEpithet: '',
            identificationQualifier: '',
            recordedBy: '',
            identifiedBy: '',
            dateIdentified: '',
            sex: '',
            lifeStage: '',
            habitat: '',
            occurrenceRemarks: '',
            country: '',
            stateProvince: '',
            county: '',
            municipality: '',
            locality: '',
            verbatimElevation: '',
            decimalLatitude: '',
            decimalLongitude: '',
            geodeticDatum: '',
            coordinateUncertainty: '',
            verbatimLatitude: '',
            verbatimLongitude: '',
            loanInfo: '',
            preparations: '',
            freezer: '',
            rack: '',
            box: '',
            tubeSize: '',
            collectors: '',
            modifiedInfo: '',
            hasError: false,
            loading: false
        })
    }

    // FIXME: BROKEN
    handleSubmit = () => {
        this.setState({loading: true})
        alert(JSON.stringify(this.state, null, 2))
        let ret = checkManualEntry(this.state)

        if (ret.errors === []) {
            // correct the fields that need correcting

            // send the request

            // axios.post('/api/insert', this.state)
            this.resetState()
        }

        else {
            this.props.updateInsertErrorMessage(ret.errors)
            this.setState({hasError: true, loading: false})
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    renderErrorTerminal = () => (
        <React.Fragment>
            <ErrorTerminal errorLog={this.props.errorMessages.insertError} />
            <Button onClick={
                    () => {
                        this.props.updateInsertErrorMessage(null)
                        this.setState({hasError: false})
                    }
                } color='red' style={{float: 'right'}}>Clear</Button>
        </React.Fragment>
    )

    render() {

        if (!this.state.hasError && this.props.errorMessages.insertError !== null) {
            this.setState({hasError: true})
        }

        const {
            catalogNumber,
            recordNumber,
            order_,
            superfamily,
            family,
            subfamily,
            tribe,
            genus,
            subgenus,
            specificEpithet,
            identificationQualifier,
            recordedBy,
            identifiedBy,
            dateIdentified,
            sex,
            lifeStage,
            habitat,
            occurrenceRemarks,
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
            loanInfo,
            preparations,
            freezer,
            rack,
            box,
            tubeSize,
            collectors,
        } = this.state

        return (
            <React.Fragment>
                <Message>
                    <Message.Header>Usage:</Message.Header>
                    <p>
                        Manually enter the transcription data of the speciment you are entering into the database. Be sure to
                        fill out all required fields (denoted with *). When all fields are completed, click the Confirm button
                        at the bottom of the scroll-view. If any syntactic errors are present, a popup will appear with
                        information to help you correct it. If you have more than one specimen to enter, consider using the
                        paste option on the previous page.
                    </p>
                </Message>
                <Grid padded='vertically' style={{justifyContent: 'center'}}>
                    <Grid.Row>
                        <Form padded='vertically' onSubmit={this.handleSubmit}>
                            <div className='scrolling' style={{minHeight: '36vh'}}>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-mgcl'
                                    control={Input}
                                    label='catalogNumber'
                                    placeholder='MGCL-#######'
                                    name='catalogNumber'
                                    value={catalogNumber}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-lep-num'
                                    control={Input}
                                    label='recordNumber'
                                    placeholder='Lep #'
                                    name='recordNumber'
                                    value={recordNumber}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-order'
                                    control={Input}
                                    label='order_'
                                    placeholder='Order'
                                    name='order_'
                                    value={order_}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-superfamily'
                                    control={Input}
                                    label='superfamily'
                                    placeholder='Superfamily'
                                    name='superfamily'
                                    value={superfamily}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                            </Form.Group>


                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    options={familyOptions}
                                    label='family'
                                    placeholder='Family'
                                    search
                                    searchInput={{ id: 'form-select-control-family' }}
                                    name='family'
                                    value={family}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-subfamily'
                                    control={Input}
                                    label='subfamily'
                                    placeholder='Subfamily'
                                    name='subfamily'
                                    value={subfamily}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-tribe'
                                    control={Input}
                                    label='tribe'
                                    placeholder='Tribe'
                                    name='tribe'
                                    value={tribe}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-genus'
                                    control={Input}
                                    label='genus'
                                    placeholder='Genus'
                                    name='genus'
                                    value={genus}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                            </Form.Group>


                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-subgenus'
                                    control={Input}
                                    label='subgenus'
                                    placeholder='Subgenus'
                                    name='subgenus'
                                    value={subgenus}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-species'
                                    control={Input}
                                    label='specificEpithet'
                                    placeholder='Species'
                                    name='specificEpithet'
                                    value={specificEpithet}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-identificationQualifier'
                                    control={Input}
                                    label='identificationQualifier'
                                    placeholder='Identification Qualifier'
                                    name='identificationQualifier'
                                    value={identificationQualifier}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-recordedBy'
                                    control={Input}
                                    label='recordedBy'
                                    placeholder='Last Name, First Initial'
                                    name='recordedBy'
                                    value={recordedBy}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-identifiedBy'
                                    control={Input}
                                    label='identifiedBy'
                                    placeholder='Last Name, First Initial'
                                    name='identifiedBy'
                                    value={identifiedBy}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-dateIdentified'
                                    control={Input}
                                    label='dateIdentified'
                                    placeholder='YYYY-MM-DD'
                                    name='dateIdentified'
                                    value={dateIdentified}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    control={Select}
                                    options={[{key: 11, text: 'M', value: 'M'}, {key: 12, text: 'F', value: 'F'}, {key: 13, text: 'I', value: 'I'}]}
                                    label='sex'
                                    placeholder='M/F/I'
                                    name='sex'
                                    value={sex}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-lifeStage'
                                    control={Input}
                                    label='lifeStage'
                                    placeholder='Life Stage'
                                    name='lifeStage'
                                    value={lifeStage}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                            </Form.Group>

                            <Form.Group widths='sixteen'>
                                <Form.Field
                                    id='form-input-control-occurrenceRemarks'
                                    width='sixteen'
                                    control={TextArea}
                                    label='occurrenceRemarks'
                                    placeholder='Remarks about occurrence'
                                    value={occurrenceRemarks}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>


                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-habitat'
                                    control={Input}
                                    label='habitat'
                                    placeholder='Habitat'
                                    name='habitat'
                                    value={habitat}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-country'
                                    control={Input}
                                    label='country'
                                    placeholder='Country'
                                    name='country'
                                    value={country}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-stateProvince'
                                    control={Input}
                                    label='stateProvince'
                                    placeholder='State or Province'
                                    name='stateProvince'
                                    value={stateProvince}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-county'
                                    control={Input}
                                    label='county'
                                    placeholder='County'
                                    name='county'
                                    value={county}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-municipality'
                                    control={Input}
                                    label='municipality'
                                    placeholder='Municipality'
                                    name='municipality'
                                    value={municipality}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-locality'
                                    control={Input}
                                    label='locality'
                                    placeholder='Locality'
                                    name='locality'
                                    value={locality}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-verbatimElevation'
                                    control={Input}
                                    label='verbatimElevation'
                                    placeholder='Verbatim Elevation'
                                    name='verbatimElevation'
                                    value={verbatimElevation}
                                    onChange={this.handleChange}
                                />

                                <Form.Field
                                    id='form-input-control-decimalLatitude'
                                    control={Input}
                                    label='decimalLatitude'
                                    placeholder='Decimal Latitude'
                                    name='decimalLatitude'
                                    value={decimalLatitude}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-decimalLongitude'
                                    control={Input}
                                    label='decimalLongitude'
                                    placeholder='Decimal Longitude'
                                    name='decimalLongitude'
                                    value={decimalLongitude}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-geodeticDatum'
                                    control={Input}
                                    label='geodeticDatum'
                                    placeholder='Geodetic Datum'
                                    name='geodeticDatum'
                                    value={geodeticDatum}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-coordinateUncertainty'
                                    control={Input}
                                    label='coordinateUncertainty'
                                    placeholder='Coordinate Uncertainty'
                                    name='coordinateUncertainty'
                                    value={coordinateUncertainty}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-verbatimLatitude'
                                    control={Input}
                                    label='verbatimLatitude'
                                    placeholder='Verbatim Latitude'
                                    name='verbatimLatitude'
                                    value={verbatimLatitude}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>


                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-verbatimLongitude'
                                    control={Input}
                                    label='verbatimLongitude'
                                    placeholder='Verbatim Longitude'
                                    name='verbatimLongitude'
                                    value={verbatimLongitude}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-loanInfo'
                                    control={Input}
                                    label='loanInfo'
                                    placeholder='CHANGE THIS FORM'
                                    name='loanInfo'
                                    value={loanInfo}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-preparations'
                                    control={Input}
                                    label='preparations'
                                    placeholder='Preparations'
                                    name='preparations'
                                    value={preparations}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-freezer'
                                    control={Input}
                                    label='freezer'
                                    placeholder='Freezer'
                                    name='freezer'
                                    value={verbatimLatitude}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>


                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-rack'
                                    control={Input}
                                    label='rack'
                                    placeholder='rack'
                                    name='rack'
                                    value={rack}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-box'
                                    control={Input}
                                    label='box'
                                    placeholder='Box'
                                    name='box'
                                    value={loanInfo}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    id='form-input-control-tubeSize'
                                    control={Input}
                                    label='tubeSize'
                                    placeholder='Tube Size (in mL)'
                                    name='tubeSize'
                                    value={tubeSize}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>


                            <Form.Group widths='sixteen'>
                                <Form.Field
                                        id='form-input-control-collectors'
                                        width='sixteen'
                                        control={TextArea}
                                        label='collectors'
                                        placeholder='List Collectors here: Last, First initial;Last, First intial;etc...'
                                        name='collectors'
                                        value={collectors}
                                        onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group style={{float: 'right'}}>
                                <QueryHelp queryType='MANUAL_INSERT'/>
                                <Button type="button" color='yellow' onClick={() => this.resetState()} style={{marginLeft: '.5rem'}}>Clear</Button>
                                <Form.Field className='float-right'
                                    id='form-button-control-submit'
                                    control={Button}
                                    content='Confirm'
                                    disabled={this.state.paste_entry}
                                />
                            </Form.Group>
                            </div>
                        </Form>
                    </Grid.Row>
                </Grid>
                {this.state.hasError ? this.renderErrorTerminal() : null}
            </React.Fragment>

        )
    }
}
