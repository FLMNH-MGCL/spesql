import React from 'react'
import { Button, Icon, Modal, Grid, Form, Input, Select, TextArea, Popup } from 'semantic-ui-react'
import axios from 'axios'
import './InsertDocument.css'

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

const localityOptions = [
    { key: '0', text: 'United States', value: 'United States' },
]

class InsertDocument extends React.Component {
    state = {
        id: '',
            mgcl_num: '',
            lep_num: '',
            order_: '',
            superfamily : '',
            family : '',
            subfamily: '',
            tribe: '',
            section: '',
            genus : '',
            species : '',
            subspecies: '',
            sex: '',
            country: '',
            province: '',
            locality : '',
            latitude: '',
            longitude: '',
            elevation: '',
            mv_lamp: '',
            days: '',
            month: '',
            year: '',
            collectors: '',
            freezer: '',
            rack : '',
            box: '',
            size: '',
            note: '',
            text_area: ''
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        alert(JSON.stringify(this.state, null, 2))
        axios.post('/api/insert', this.state)
        this.props.updateList()
        this.setState({
            id: '',
            mgcl_num: '',
            lep_num: '',
            order_: '',
            superfamily : '',
            family : '',
            subfamily: '',
            tribe: '',
            section: '',
            genus : '',
            species : '',
            subspecies: '',
            sex: '',
            country: '',
            province: '',
            locality : '',
            latitude: '',
            longitude: '',
            elevation: '',
            mv_lamp: '',
            days: '',
            month: '',
            year: '',
            collectors: '',
            freezer: '',
            rack : '',
            box: '',
            size: '',
            note: '',
            text_area: ''
        })
    }

    handleCSVSubmit = () => {
        // check valid data
        // if data is valid, loop through and axios.post each item
        const ret = this.props.isValidCSV(this.state.text_area)

        let errors = []

        if (ret.valid === true) {
            console.log(ret.data.length)
            // ret.data[0] is header row

            for (var i = 1; i < ret.data.length; i++) { 
                let specimen = ret.data[i]
                const doc = {
                    mgcl_num: specimen[0],
                    lep_num: specimen[1],
                    order_: specimen[2],
                    superfamily : specimen[3],
                    family : specimen[4],
                    subfamily: specimen[5],
                    tribe: specimen[6],
                    section: specimen[7],
                    genus : specimen[8],
                    species : specimen[9],
                    subspecies: specimen[10],
                    sex: specimen[11],
                    country: specimen[12],
                    province: specimen[13],
                    locality : specimen[14],
                    latitude: specimen[15],
                    longitude: specimen[16],
                    elevation: specimen[17],
                    mv_lamp: specimen[18],
                    days: specimen[19],
                    month: specimen[20],
                    year: specimen[21],
                    collectors: specimen[22],
                    freezer: specimen[23],
                    rack : specimen[24],
                    box: specimen[25],
                    size: specimen[26],
                    note: specimen[27],
                }

                // console.log(doc)
                axios.post('/api/insert', doc)
                .then(response => {
                    if (response.success === false) {
                        errors.push(response.data)
                    }
                    else {
                        console.log('Sucess! Inserted document.')
                    }
                })
                
            }

            this.props.updateList()

            console.log(errors)
        }
        else { 
            alert(ret.error_log)
        }

        

        this.setState({
            mgcl_num: '',
            lep_num: '',
            order_: '',
            superfamily : '',
            family : '',
            subfamily: '',
            tribe: '',
            section: '',
            genus : '',
            species : '',
            subspecies: '',
            sex: '',
            country: '',
            province: '',
            locality : '',
            latitude: '',
            longitude: '',
            elevation: '',
            mv_lamp: '',
            days: '',
            month: '',
            year: '',
            collectors: '',
            freezer: '',
            rack : '',
            box: '',
            size: '',
            note: '',
            text_area: ''
        })
    }

    render() {
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
            text_area
        } = this.state
        return (
            <div className='content'>
                <Modal trigger={
                    <Popup content='Insert new data' trigger={<Button icon labelPosition='left'>
                        <Icon name='upload' />
                        New Insert
                </Button> } />
                } centered>
                    <Modal.Header>Insert New Data into Database</Modal.Header>
                    <Modal.Content>
                        <Grid padded>
                            <Grid.Row>
                                <p style={{padding: '1rem'}}>CSV Paste Entry: </p>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Form padded onSubmit={this.handleCSVSubmit}>
                                        <Form.Group>
                                            <TextArea
                                                id='form-text-area'
                                                control={TextArea}
                                                name='text_area'
                                                value={text_area}
                                                onChange={this.handleChange}
                                            />                                            
                                        </Form.Group>
                                        <Form.Field
                                            id='form-button-control-ta-submit'
                                            control={Button}
                                            content='Confirm'
                                        />
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>


{/* 
                            <Grid.Row>
                                <p>Upload a CSV file: </p>
                            </Grid.Row>
                            <Grid.Row>
                                <Button icon labelPosition='left'>
                                    <Icon name='upload' />
                                    Upload
                                </Button>                                 
                            </Grid.Row> */}
                            <Grid.Row>
                                <p style={{padding: '1rem'}}>Manual Entry: </p>
                            </Grid.Row>
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
                                        />
                                        <Form.Field
                                            id='form-input-control-mgcl'
                                            control={Input}
                                            label='MGCL #'
                                            placeholder='MGCL#######'
                                            name='mgcl_num'
                                            value={mgcl_num}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-order'
                                            control={Input}
                                            label='Order'
                                            placeholder='Order'
                                            name='order_'
                                            value={order_}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-superfamily'
                                            control={Input}
                                            label='Superfamily'
                                            placeholder='Superfamily'
                                            name='superfamily'
                                            value={superfamily}
                                            onChange={this.handleChange}
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
                                        />
                                        <Form.Field
                                            id='form-input-control-subfamily'
                                            control={Input}
                                            label='Subfamily'
                                            placeholder='Subfamily'
                                            name='subfamily'
                                            value={subfamily}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-tribe'
                                            control={Input}
                                            label='Tribe'
                                            placeholder='Tribe'
                                            name='tribe'
                                            value={tribe}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-section'
                                            control={Input}
                                            label='Section'
                                            placeholder='Section'
                                            name='section'
                                            value={section}
                                            onChange={this.handleChange}
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
                                        />
                                        <Form.Field
                                            id='form-input-control-species'
                                            control={Input}
                                            label='Species'
                                            placeholder='Species'
                                            name='species'
                                            value={species}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-subspecies'
                                            control={Input}
                                            label='Subspecies'
                                            placeholder='Subspecies'
                                            name='subspecies'
                                            value={subspecies}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-sex'
                                            control={Input}
                                            label='Sex'
                                            placeholder='Sex'
                                            name='sex'
                                            value={sex}
                                            onChange={this.handleChange}
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
                                        />
                                        <Form.Field
                                            id='form-input-control-province'
                                            control={Input}
                                            label='Province'
                                            placeholder='Province'
                                            name='province'
                                            value={province}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-locality'
                                            control={Input}
                                            label='Locality'
                                            placeholder='Locality'
                                            name='locality'
                                            value={locality}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-latitude'
                                            control={Input}
                                            label='Latitude'
                                            placeholder='Latitude'
                                            name='latitude'
                                            value={latitude}
                                            onChange={this.handleChange}
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
                                        />
                                        <Form.Field
                                            id='form-input-control-elevation'
                                            control={Input}
                                            label='Elevation'
                                            placeholder='Elevation'
                                            name='elevation'
                                            value={elevation}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-mv-lamp'
                                            control={Input}
                                            label='MV Lamp'
                                            placeholder='MV Lamp'
                                            name='mv_lamp'
                                            value={mv_lamp}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-days'
                                            control={Input}
                                            label='Days'
                                            placeholder='Days'
                                            name='days'
                                            value={days}
                                            onChange={this.handleChange}
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
                                        />
                                        <Form.Field
                                            id='form-input-control-year'
                                            control={Input}
                                            label='Year'
                                            placeholder='05/2017'
                                            name='year'
                                            value={year}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-collectors'
                                            control={Input}
                                            label='Collector(s)'
                                            placeholder='Collector(s)'
                                            name='collectors'
                                            value={collectors}
                                            onChange={this.handleChange}
                                        />

                                        <Form.Field
                                            id='form-input-control-freezer'
                                            control={Input}
                                            label='Freezer'
                                            placeholder='Freezer'
                                            name='freezer'
                                            value={freezer}
                                            onChange={this.handleChange}
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
                                        />
                                        <Form.Field
                                            id='form-input-control-box'
                                            control={Input}
                                            label='Box'
                                            placeholder='Box'
                                            name='box'
                                            value={box}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-size'
                                            control={Input}
                                            label='Size'
                                            placeholder='Size'
                                            name='size'
                                            value={size}
                                            onChange={this.handleChange}
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
                                        />    
                                    </Form.Group>
                                    </div>

                                    <Form.Field
                                        id='form-button-control-submit'
                                        control={Button}
                                        content='Confirm'
                                    />
                                </Form>
                            </Grid.Row>
                        
                        </Grid>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default InsertDocument