import React from 'react'
import { Button, Icon, Modal, Grid, Form, Input, Select, Checkbox } from 'semantic-ui-react'

const queryActions = [
    { key: '0', text: 'SELECT', value: 'SELECT' },
]

const headerSelection = [
    { key: '1', text: 'ALL', value: '*' },
    { key: '2', text: 'Genus', value: 'genus' },
]

const dbSelection = [
    { key: '3', text: 'Collection', value: 'collection' },
]

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
        fields: [],
        db: '',
        where: false,
        fields_search: [],
        search_: '',
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
            query_action,
            fields,
            db,
            fields_search,
            search_,
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
                                <Form onSubmit={this.handleAdvancedSubmit}>
                                    <Form.Group>
                                        <Form.Field 
                                            control={Checkbox}
                                            label='Advanced Query'
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