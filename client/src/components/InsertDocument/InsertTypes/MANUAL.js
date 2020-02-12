import React from 'react'
import axios from 'axios'
import { Button, Grid, Form, Input, Select, Checkbox, Message, Header, Divider, Menu, Icon, TextArea } from 'semantic-ui-react'
import { checkEntry } from '../../../functions/queryChecks'
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
        hasError: false
    }

    // FIXME: BROKEN
    handleSubmit = () => {
        alert(JSON.stringify(this.state, null, 2))
        let ret = checkEntry(0, this.state)

        if (ret.errs.lenth === 0) {
            axios.post('/api/insert', this.state)
            this.resetState()
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
            mgcl_num,
            lep_num,
            order_,
            superfamily ,
            family ,
            subfamily,
            tribe,
            section,
            genus ,
            species ,
            subspecies,
            sex,
            country,
            province,
            locality ,
            latitude,
            longitude,
            elevation,
            mv_lamp,
            days,
            month,
            year,
            collectors,
            freezer,
            rack,
            box,
            size,
            note,
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
                <Grid padded>
                    <Grid.Row>
                        <Form padded onSubmit={this.handleSubmit}>
                            <div className='scrolling'>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-lep-num'
                                    control={Input}
                                    label='Lep #'
                                    placeholder='Lep #'
                                    name='lep_num'
                                    value={lep_num}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-mgcl'
                                    control={Input}
                                    label='MGCL #'
                                    placeholder='MGCL#######'
                                    name='mgcl_num'
                                    value={mgcl_num}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-order'
                                    control={Input}
                                    label='Order'
                                    placeholder='Order'
                                    name='order_'
                                    value={order_}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-superfamily'
                                    control={Input}
                                    label='Superfamily'
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
                                    label='Family'
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
                                    label='Subfamily'
                                    placeholder='Subfamily'
                                    name='subfamily'
                                    value={subfamily}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-tribe'
                                    control={Input}
                                    label='Tribe'
                                    placeholder='Tribe'
                                    name='tribe'
                                    value={tribe}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-section'
                                    control={Input}
                                    label='Section'
                                    placeholder='Section'
                                    name='section'
                                    value={section}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />                                    
                            </Form.Group>


                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-genus'
                                    control={Input}
                                    label='Genus'
                                    placeholder='Genus'
                                    name='genus'
                                    value={genus}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-species'
                                    control={Input}
                                    label='Species'
                                    placeholder='Species'
                                    name='species'
                                    value={species}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-subspecies'
                                    control={Input}
                                    label='Subspecies'
                                    placeholder='Subspecies'
                                    name='subspecies'
                                    value={subspecies}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-sex'
                                    control={Input}
                                    label='Sex'
                                    placeholder='Sex'
                                    name='sex'
                                    value={sex}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-country'
                                    control={Input}
                                    label='Country'
                                    placeholder='Country'
                                    name='country'
                                    value={country}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-province'
                                    control={Input}
                                    label='Province'
                                    placeholder='Province'
                                    name='province'
                                    value={province}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-locality'
                                    control={Input}
                                    label='Locality'
                                    placeholder='Locality'
                                    name='locality'
                                    value={locality}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-latitude'
                                    control={Input}
                                    label='Latitude'
                                    placeholder='Latitude'
                                    name='latitude'
                                    value={latitude}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />                              
                            </Form.Group>


                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-longitude'
                                    control={Input}
                                    label='Longitude'
                                    placeholder='Longitude'
                                    name='longitude'
                                    value={longitude}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-elevation'
                                    control={Input}
                                    label='Elevation'
                                    placeholder='Elevation'
                                    name='elevation'
                                    value={elevation}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-mv-lamp'
                                    control={Input}
                                    label='MV Lamp'
                                    placeholder='MV Lamp'
                                    name='mv_lamp'
                                    value={mv_lamp}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-days'
                                    control={Input}
                                    label='Days'
                                    placeholder='Days'
                                    name='days'
                                    value={days}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-month'
                                    control={Input}
                                    label='Month'
                                    placeholder='Month'
                                    name='month'
                                    value={month}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-year'
                                    control={Input}
                                    label='Year'
                                    placeholder='05/2017'
                                    name='year'
                                    value={year}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-collectors'
                                    control={Input}
                                    label='Collector(s)'
                                    placeholder='Collector(s)'
                                    name='collectors'
                                    value={collectors}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />

                                <Form.Field
                                    id='form-input-control-freezer'
                                    control={Input}
                                    label='Freezer'
                                    placeholder='Freezer'
                                    name='freezer'
                                    value={freezer}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />                                    
                            </Form.Group>
                            

                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-rack'
                                    control={Input}
                                    label='Rack'
                                    placeholder='1-2'
                                    name='rack'
                                    value={rack}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-box'
                                    control={Input}
                                    label='Box'
                                    placeholder='Box'
                                    name='box'
                                    value={box}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />
                                <Form.Field
                                    id='form-input-control-size'
                                    control={Input}
                                    label='Size'
                                    placeholder='Size'
                                    name='size'
                                    value={size}
                                    onChange={this.handleChange}
                                    disabled={this.state.paste_entry}
                                />                                
                            </Form.Group>
                            

                            <Form.Group widths='equal'>
                                <Form.Field
                                        id='form-input-control-note'
                                        control={TextArea}
                                        label='Notes'
                                        placeholder='Notes about this specimen go here'
                                        name='note'
                                        value={note}
                                        onChange={this.handleChange}
                                        disabled={this.state.paste_entry}
                                />    
                            </Form.Group>
                            
                            <Form.Group style={{float: 'right'}}>
                                <QueryHelp queryType='MANUAL_INSERT'/>
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
                {this.state.hasError ? this.renderErrorTerminal() : console.log('nope')}
            </React.Fragment>

        )
    }
}