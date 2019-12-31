import React from 'react'
import { Button, Icon, Modal, Grid, Form, Input, Select, TextArea } from 'semantic-ui-react'
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
        superfamily : '',
        family : '',
        genus : '',
        species : '',
        locality : '',
        rack : '',
        date_collected : '',
        text_area: ''
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        alert(JSON.stringify(this.state, null, 2))
        axios.post('/api/insert', this.state)
        this.props.updateList()
        this.setState({
            id: '',
            superfamily : '',
            family : '',
            genus : '',
            species : '',
            locality : '',
            rack : '',
            date_collected : '',
            text_area: ''
        })
    }

    handleCSVSubmit = () => {
        alert(this.state.text_area)
        this.setState({
            id: '',
            superfamily : '',
            family : '',
            genus : '',
            species : '',
            locality : '',
            rack : '',
            date_collected : '',
            text_area: ''
        })
    }

    render() {
        const { id, superfamily, family, genus, species, locality, rack, date_collected, text_area } = this.state
        return (
            <div className='content'>
                <Modal trigger={
                    <Button icon labelPosition='left'>
                        <Icon name='upload' />
                        New Insert
                    </Button>
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



                            <Grid.Row>
                                <p>Upload a CSV file: </p>
                            </Grid.Row>
                            <Grid.Row>
                                <Button icon labelPosition='left'>
                                    <Icon name='upload' />
                                    Upload
                                </Button>                                 
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{padding: '1rem'}}>Manual Entry: </p>
                            </Grid.Row>
                            <Grid.Row>
                                <Form padded onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            id='form-input-control-lep-num'
                                            control={Input}
                                            label='Lep #'
                                            placeholder='Lep #'
                                            name='id'
                                            value={id}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-super-family'
                                            control={Input}
                                            label='Superfamily'
                                            placeholder='Superfamily'
                                            name='superfamily'
                                            value={superfamily}
                                            onChange={this.handleChange}
                                        />
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
                                            id='form-input-control-genus'
                                            control={Input}
                                            label='Genus'
                                            placeholder='Genus'
                                            name='genus'
                                            value={genus}
                                            onChange={this.handleChange}
                                        />                                    
                                    </Form.Group>
                                    <Form.Group widths='equal'>
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
                                            control={Select}
                                            options={localityOptions}
                                            label='Locality'
                                            placeholder='Locality'
                                            search
                                            searchInput={{ id: 'form-select-control-locality' }}
                                            name='locality'
                                            value={locality}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-date-collected'
                                            control={Input}
                                            label='Date Collected'
                                            placeholder='05/2017'
                                            name='date_collected'
                                            value={date_collected}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Field
                                            id='form-input-control-freezer-rack'
                                            control={Input}
                                            label='Rack #'
                                            placeholder='1-2'
                                            name='rack'
                                            value={rack}
                                            onChange={this.handleChange}
                                        />                                    
                                    </Form.Group>
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