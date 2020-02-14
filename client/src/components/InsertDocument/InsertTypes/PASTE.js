import React from 'react'
import { Button, Icon, Modal, Grid, Form, Input, Select, TextArea, Message, Menu, Loader } from 'semantic-ui-react'
import axios from 'axios'
import ErrorTerminal from '../../Query/QueryTerminals/ErrorTerminal'
import QueryHelp from '../../Query/QueryHelp'

export default class PASTE extends React.Component {
    state = {
        text_area: '',
        hasError: false,
        loading: false,
    }

    handleCSVSubmit = () => {
        // check valid data
        // if data is valid, loop through and axios.post each item
        this.setState({loading: true})
        const ret = this.props.isValidCSV(this.state.text_area)

        if (!ret.valid) {
            this.props.updateInsertErrorMessage(ret.data)
            this.setState({hasError: true, loading: false})
            return
        }

        let errors = []

        
        console.log(ret.data.length)
        // ret.data[0] is header row

        
        for (var i = 1; i < ret.data.length; i++) { 
            let specimen = ret.data[i]
            const doc = {
                catalogNumber: specimen[0],
                recordNumber: specimen[1],
                order_: specimen[2],
                superfamily: specimen[3],
                family: specimen[4],
                subfamily: specimen[5],
                tribe: specimen[6],
                genus: specimen[7],
                subgenus: specimen[8],
                specificEpithet: specimen[9],
                identificationQualifier: specimen[10],
                recordedBy: specimen[11],
                identifiedBy: specimen[12],
                dateIdentified: specimen[13],
                sex: specimen[14],
                lifeStage: specimen[15],
                habitat: specimen[16],
                occurrenceRemarks: specimen[17],
                country: specimen[18],
                stateProvince: specimen[19],
                county: specimen[20],
                municipality: specimen[21],
                locality: specimen[22],
                verbatimElevation: specimen[23],
                decimalLatitude: specimen[24],
                decimalLongitude: specimen[25],
                geodeticDatum: specimen[26],
                coordinateUncertainty: specimen[27],
                verbatimLatitude: specimen[28],
                verbatimLongitude: specimen[29],
                loanInfo: specimen[30],
                preparations: specimen[31],
                freezer: specimen[32],
                rack: specimen[33],
                box: specimen[34],
                tubeSize: specimen[35],
                collectors: specimen[36],
                modifiedInfo: '',
            }

            // console.log(doc)
            axios.post('/api/insert', doc)
            .then(response => {
                console.log(response)
                let responseData = response.data
                if (responseData.success === false) {
                    let errorHeading = responseData.data.code
                    let errorMessage = responseData.data.sqlMessage
                    errors.push(`SQL Error around row ${i}. Code: ${errorHeading}, Message: ${errorMessage}`)
                }
                else {
                    console.log('Sucess! Inserted document.')
                }
            })

            // rerender the component for errors
            if (i === ret.data.length - 1) {
                if (errors !== []) {
                    console.log(errors)
                    this.props.updateInsertErrorMessage(errors)
                    setTimeout(() => this.setState({hasError: true, loading: false}), 1000)
                }
                console.log(errors)

            }
            
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
            text_area
        } = this.state

        return (
            <React.Fragment>
                <Grid padded='vertically'>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Message>
                                <Message.Header>Usage:</Message.Header>
                                <p>
                                    Copy & paste CSV data into this text area. Be sure to include the proper
                                    headers. <a href='../../assets/CORRECT_HEADERS_TEMPLATE.csv' download>Click here</a> to download an
                                    example template for the correct headers. 
                                </p>
                            </Message>
                            <Form padded onSubmit={this.handleCSVSubmit}>
                                <Form.Group>
                                    <TextArea
                                        id='form-text-area'
                                        name='text_area'
                                        value={text_area}
                                        onChange={this.handleChange}
                                        style={{minHeight: '30vh'}}
                                    />                                   
                                </Form.Group> 
                                {this.state.loading ? 'Loading... This may take some time, please wait.' : null}
                                <Form.Group style={{float: 'right'}}> 
                                    <QueryHelp queryType='PASTE_INSERT'/>
                                    <Button type="button" color='yellow' onClick={() => this.setState({text_area: ''})} style={{marginLeft: '.5rem'}}>Clear</Button>
                                    <Form.Field
                                        id='form-button-control-ta-submit'
                                        control={Button}
                                        content='Confirm'
                                    />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {this.state.hasError ? this.renderErrorTerminal() : null}
            </React.Fragment>
        )
    }
}