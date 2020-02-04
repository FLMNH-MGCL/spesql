import React from 'react'
import axios from 'axios'
import { Button, Grid, Form, Input, Select, Checkbox, Message } from 'semantic-ui-react'
import { selectQueryOption, headerSelection, operatorOptions } from '../QueryConstants/constants'
import QueryHelp from '../QueryHelp'


export default class SELECT extends React.Component {
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
        showModal: false
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
        this.setState({showModal: false})
        this.props.clearQuery()
        this.props.runQuery(command)
        this.closeModal()
    }

    handleAdvancedSubmit = () => {
        this.setState({showModal: false})
        this.props.clearQuery()
        this.props.runQuery(this.state.advanced_query)
        this.closeModal()
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
            operator,
        } = this.state
        return (
            <Grid padded>
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
                                    options={selectQueryOption}
                                    label='QUERY'
                                    placeholder='SELECT'
                                    search
                                    name='query_action'
                                    value={query_action}
                                    onChange={this.handleChange}
                                    disabled={!this.state.basic_query}
                                    required
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
                                    options={this.props.dbSelection}
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
        )
    }
}