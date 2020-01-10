import React from 'react'
import { Button, Icon, Modal, Grid, Form, Input, Select, TextArea, Checkbox } from 'semantic-ui-react'
import axios from 'axios'

const queryActions = [
    { key: '0', text: 'SELECT', value: 'SELECT' },
]

const headerSelection = [
    { key: '0', text: 'ALL', value: '*' },
    { key: '1', text: 'Genus', value: 'genus' },
]

const dbSelection = [
    { key: '0', text: 'Collection', value: 'collection' },
]

const operatorOptions = [
    { key: '0', text: '=', value: '=' },
    { key: '1', text: '!=', value: '!=' },
    { key: '2', text: '<', value: '<' },
    { key: '3', text: '>', value: '>' },
    { key: '0', text: '<=', value: '<=' },
    { key: '0', text: '>=', value: '>=' },
]

class QueryGrid extends React.Component {
    state = {
        advanced_query: '',
        basic_query: true,
        query_action: '',
        fields: [],
        db: '',
        where: false,
        fields_search: [],
        search: '',
        operator: ''
    }

    handleSubmit = () => {

    }

    handleAdvancedSubmit = () => {
        this.props.updateQuery(this.state.advanced_query)
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleCheck = (e, { name, value }) => this.setState({ where: !this.state.where})

    handleAdvancedCheck = (e, { name, value }) => this.setState({ basic_query: !this.state.basic_query})

    render() {
        const {
            advanced_query,
            basic_query,
            query_action,
            fields,
            db,
            where,
            fields_search,
            search,
            operator
        } = this.state

        return(
            <div className='content'>
                <Modal trigger={
                    <Button icon labelPosition='left'>
                        <Icon name='archive' />
                        Query
                    </Button>
                } centered closeIcon>
                    <Modal.Header>Query Selector</Modal.Header>
                    <Modal.Content>
                        <Grid padded>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <Form padded onSubmit={this.handleAdvancedSubmit}>
                                    <Form.Group>
                                        <Form.Field 
                                            control={Checkbox}
                                            label='Advanced Query'
                                            name='basic_query'
                                            value={basic_query}
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

                                <Form padded onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            control={Select}
                                            options={queryActions}
                                            label='QUERY'
                                            placeholder='SELECT'
                                            search
                                            searchInput={{ id: 'form-select-control-query-action' }}
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
                                            searchInput={{ id: 'form-select-control-header-selection' }}
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
                                            searchInput={{ id: 'form-select-control-db-selection' }}
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
                                            value={where}
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
                                            searchInput={{ id: 'form-select-control-header-selection-2' }}
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
                                            searchInput={{ id: 'form-select-control-search' }}
                                            name='search'
                                            value={search}
                                            onChange={this.handleChange}
                                            disabled={!this.state.where}
                                        />
                                    </Form.Group>
                                    <Form.Field
                                        id='form-button-control-ta-submit'
                                        control={Button}
                                        content='Submit'
                                        disabled={!this.state.basic_query}
                                    />
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