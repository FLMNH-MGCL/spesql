import React from 'react'
import axios from 'axios'
import { Button, Icon, Modal, Grid, Form, Input, Select, Checkbox, Message } from 'semantic-ui-react'
import './QueryGrid.css'
import QueryHelp from './QueryHelp'

const queryActions = [
    { key: '0', text: 'SELECT', value: 'SELECT' },
]

const headerSelection = [
    { key: '1', text: 'ALL', value: '*' },
    { key: '2', text: 'Genus', value: 'genus' },
    { key: '10', text: 'Species', value: 'species' },
    { key: '11', text: 'Family', value: 'family' },
    { key: '12', text: 'Subfamily', value: 'subfamily' },
    { key: '13', text: 'Superfamily', value: 'superfamily' },
    { key: '14', text: 'Order', value: 'order_' },
]

let dbSelection = []
axios.post('/api/list-tables/')
.then(response => {
    if (response.data.error) {

    }
    else {
        dbSelection = response.data.tables.map((table, index) => {
            return {key: index+1 * 1002, text: table, value: table}
        })
    }
})

const operatorOptions = [
    { key: '4', text: '=', value: '=' },
    { key: '5', text: '!=', value: '!=' },
    { key: '6', text: '<', value: '<' },
    { key: '7', text: '>', value:'>' },
    { key: '8', text: '<=', value: '<=' },
    { key: '9', text: '>=', value: '>=' },
]

class QueryGrid extends React.Component {
    state = {
        advanced_query: '',
        basic_query: true,
        query_action: '',
        fields: ['*'],
        db: '',
        where: false,
        fields_search: [],
        search_: '',
        operator: '',
    }

    // DANGEROUS, EASY TO BREAK NEED MORE CHECKS
    handleSubmit = () => {
        let command = String(this.state.query_action + ' ')

        for (let i = 0; i < this.state.fields.length; i++) {
            command += this.state.fields[i]

            if (i !== this.state.fields.length - 1) {
                command += ','
            }
            else {
                command += ' '
            }
        }

        command += 'FROM ' + this.state.db

        if (this.state.where) {
            command += ' WHERE '
        }

        let search_terms = this.state.search_.split(',')

        if (search_terms.length === this.state.fields_search.length) {
            for (let i = 0; i < this.state.fields_search.length; i++) {
                command += this.state.fields_search[i] + this.state.operator + '"' + search_terms[i] + '"'

                if (i !== this.state.fields_search.length - 1) {
                    command += ' AND '
                }
                // else {
                //     command += ' '
                // }
            }
        }


        command += ';'
        console.log(command)

        this.props.updateQuery(command)
    }

    handleAdvancedSubmit = () => {
        this.props.updateQuery(this.state.advanced_query)
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleCheck = (e, { name, value }) => this.setState({ where: !this.state.where})

    handleAdvancedCheck = (e, { name, value }) => this.setState({ basic_query: !this.state.basic_query})

    closeModal = () => {
        this.setState({
            advanced_query: '',
            basic_query: true,
            query_action: '',
            fields: ['*'],
            db: '',
            where: false,
            fields_search: [],
            search_: '',
            operator: '',
        })
    }

    render() {
        const {
            advanced_query,
            query_action,
            fields,
            db,
            fields_search,
            search_,
            operator,
        } = this.state

    
        return(
            <div className='content'>
                <Modal trigger={
                    <Button icon labelPosition='left'>
                        <Icon name='archive' />
                        Query
                    </Button>
                } centered closeIcon onClose={this.closeModal}>
                    <Modal.Header>Query Selector</Modal.Header>
                    <Modal.Content>
                        <Grid padded>
                        {/* <Header>SELECT Query Selection</Header> */}
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <Message>
                                    <Message.Header>SELECT Query Selection</Message.Header>
                                    <p>
                                        This section is for SELECT queries. SELECT queries are those that simply fetch information
                                        from the database. If you have terminal/CLI experience using MySQL commands, there is an 
                                        advanced query option available if checked. Click the Help button for more detailed information
                                    </p>
                                </Message>
                                <Form onSubmit={this.handleAdvancedSubmit}>
                                    <Form.Group>
                                        <Form.Field 
                                            control={Checkbox}
                                            label='Advanced SELECT Query'
                                            name='basic_query'
                                            value=""
                                            onChange={this.handleAdvancedCheck}
                                            width={3}
                                        />
                                        <Form.Field 
                                            control={Input}
                                            name='advanced_query'
                                            value={advanced_query}
                                            onChange={this.handleChange}
                                            disabled={this.state.basic_query}
                                            width={10}
                                            // error={{
                                            //     content: 'This query must be a SELECT command.',
                                            //     active: false,
                                            // }}
                                        />
                                        <Form.Field
                                        id='form-button-control-ta-submit-adv'
                                        control={Button}
                                        content='Submit'
                                        disabled={this.state.basic_query}
                                        width={3}
                                    />
                                    </Form.Group>
                                </Form>

                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            options={queryActions}
                                            label='QUERY'
                                            placeholder='SELECT'
                                            search
                                            name='query_action'
                                            value={query_action}
                                            onChange={this.handleChange}
                                            disabled={!this.state.basic_query}
                                        />
                                        <Form.Field
                                            control={Select}
                                            options={headerSelection}
                                            label='FIELD'
                                            placeholder='FIELD'
                                            search
                                            multiple
                                            name='fields'
                                            value={fields}
                                            onChange={this.handleChange}
                                            disabled={!this.state.basic_query}
                                        />
                                        <Form.Field
                                            control={Select}
                                            options={dbSelection}
                                            label='Database'
                                            placeholder='Collection'
                                            search
                                            name='db'
                                            value={db}
                                            onChange={this.handleChange}
                                            disabled={!this.state.basic_query}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Checkbox}
                                            label='WHERE'
                                            name='where'
                                            value=""
                                            onChange={this.handleCheck}
                                            disabled={!this.state.basic_query}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            options={headerSelection}
                                            label='FIELD'
                                            placeholder='FIELD'
                                            search
                                            multiple
                                            name='fields_search'
                                            value={fields_search}
                                            onChange={this.handleChange}
                                            disabled={!this.state.where}
                                        />
                                        <Form.Field
                                            control={Select}
                                            options={operatorOptions}
                                            label='Operator'
                                            placeholder='='
                                            name='operator'
                                            value={operator}
                                            onChange={this.handleChange}
                                            disabled={!this.state.where}
                                        />
                                        <Form.Field
                                            control={Input}
                                            label='Search'
                                            placeholder='Search Term(s)'
                                            search
                                            name='search_'
                                            value={search_}
                                            onChange={this.handleChange}
                                            disabled={!this.state.where}
                                        />
                                    </Form.Group>
                                    <Form.Group className='float-right'>
                                        <QueryHelp queryType='SELECT'/> 
                                        <Form.Field
                                            id='form-button-control-ta-submit'
                                            control={Button}
                                            content='Submit'
                                            disabled={!this.state.basic_query}
                                        />
                                        
                                    </Form.Group>
                                </Form>
                                </Grid.Column>
                            </Grid.Row>                    
                        </Grid>
                    </Modal.Content>
                    <Modal.Content>
                        <Grid padded>
                            <Grid.Row>
                                    <Grid.Column width={16}>
                                    <Message>
                                        <Message.Header>TBA Query Selection</Message.Header>
                                        <p>
                                            This section is for TBA queries. TBA queries are those that simply DO SOMETHING
                                            with the database. If you have terminal/CLI experience using MySQL commands, there is an 
                                            advanced query option available if checked. Click the Help button for more detailed information
                                        </p>
                                    </Message>
                                    <Form>
                                        <Form.Group>
                                            <Form.Field 
                                                control={Checkbox}
                                                label='Advanced TBA Query'
                                                name='basic_query'
                                                value=""
                                                onChange={this.handleAdvancedCheck}
                                                width={3}
                                            />
                                            <Form.Field 
                                                control={Input}
                                                name='advanced_query'
                                                value={advanced_query}
                                                onChange={this.handleChange}
                                                disabled={this.state.basic_query}
                                                width={10}
                                                // error={{
                                                //     content: 'This query must be a SELECT command.',
                                                //     active: false,
                                                // }}
                                            />
                                            <Form.Field
                                            id='form-button-control-ta-submit-adv'
                                            control={Button}
                                            content='Submit'
                                            disabled={this.state.basic_query}
                                            width={3}
                                        />
                                        </Form.Group>
                                    </Form>
                                    <Form>
                                        <Form.Group className='float-right'>
                                            <QueryHelp queryType='TBA'/> 
                                            <Form.Field
                                                id='form-button-control-ta-submit'
                                                control={Button}
                                                content='Submit'
                                                disabled={!this.state.basic_query}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                </Modal>
            </div>
        )
        
    }
}

export default QueryGrid