import React from 'react'
import axios from 'axios'
import { Button, Grid, Form, Input, Select, Checkbox, Message } from 'semantic-ui-react'
import { 
    countQueryOption, headerSelection, setOperatorOptions, conditionalOperatorOptions, setCountOptions, conditionalCountOptions
} from '../QueryConstants/constants'
import CountTerminal from '../QueryTerminals/CountTerminal'
import QueryHelp from '../QueryHelp'

export default class COUNT extends React.Component {
    state = {
        advanced_query: '',
        basic_query: true,
        query_action: 'COUNT',
        fields: ['*'],
        db: '',
        conditionalCount: 0,
        conditionals: [],
        waiting: true,
        submitted: false
    }

    handleSubmit = () => {
        let command = String(this.state.query_action + '(')

        for (let i = 0; i < this.state.fields.length; i++) {
            command += this.state.fields[i]

            if (i !== this.state.fields.length - 1) {
                command += ' AND '
            }
            else {
                command += ') '
            }
        }

        command += 'FROM ' + this.state.db

        if (this.state.conditionalCount > 0) {
            command += ' WHERE '

            let conditionalString = ''

            this.state.conditionals.forEach((conditional, index) => {
                conditionalString += conditional.field + ' '
                conditionalString += conditional.operator + ' '
                conditionalString += '\'' + conditional.searchTerms + '\''

                if (index === this.state.conditionalCount - 1) {
                    conditionalString += ';'
                }
                else {
                    conditionalString += ' AND '
                }
            })

            command += conditionalString
        }

        else command += ';'

        // this.setState({submitted: true})
        this.props.runQuery(command)
    }

    handleAdvancedSubmit = () => {
        this.setState({submitted: true})
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleAdvancedCheck = (e, { name, value }) => this.setState({ basic_query: !this.state.basic_query})

    handleConditionalCountChange = (e, {name, value}) => {
        // get previous count
        let prevCount = this.state.conditionalCount
        // if previous if smaller, concat more items to array
        if (prevCount < value) {
            let newConditionals = [...this.state.conditionals].concat(Array.from({length: value - prevCount}, () => {
                return {
                    field: '', operator: '=', searchTerms: ''
                }
            }))
            // console.log(newConditionals)

            this.setState({
                [name]: value,
                conditionals: newConditionals
            })
        }
        else if (prevCount > value) {
            let newConditionals = [...this.state.conditionals].slice(0, value)
            this.setState({
                [name]: value,
                conditionals: newConditionals
            })
        }
        // if previous is bigger, slice to match new count
    }

    handleConditionalItemChange = (e, {name, value, id}) => {
        const newConditional = {
            ...this.state.conditionals[id],
            [name]: value
        }

        this.setState({
            conditionals: [
                ...this.state.conditionals.slice(0, id),
                Object.assign({}, this.state.conditionals[id], newConditional),
                ...this.state.conditionals.slice(id + 1)
            ]
        })
    }

    renderConditions = () => {
        let conditionals = Array.from({length: this.state.conditionalCount}, (item, index) => {
            return (
                <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    options={headerSelection}
                    label='Field'
                    placeholder='FIELD'
                    search
                    name='field'
                    value={this.state.conditionals[index].field}
                    onChange={this.handleConditionalItemChange}
                    id={index}
                    disabled={!this.state.basic_query}
                />
                <Form.Field
                    control={Select}
                    options={conditionalOperatorOptions}
                    label='Operator'
                    placeholder='='
                    name='operator'
                    value={this.state.conditionals[index].operator}
                    onChange={this.handleConditionalItemChange}
                    id={index}
                    disabled={!this.state.basic_query}
                />
                <Form.Field
                    control={Input}
                    label='Search'
                    placeholder='Search Term(s)'
                    search
                    name='searchTerms'
                    value={this.state.conditionals[index].searchTerms}
                    onChange={this.handleConditionalItemChange}
                    id={index}
                    disabled={!this.state.basic_query}
                />
            </Form.Group>
            )
        })
        return conditionals
    }

    renderBasicForm = (query_action, fields, db, conditionalCount) => {
        let conditionals = this.renderConditions()
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Select}
                        options={countQueryOption}
                        label='QUERY'
                        placeholder='COUNT'
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
                        control={Select}
                        label='WHERE count (how many conditionals)'
                        options={conditionalCountOptions}
                        name='conditionalCount'
                        value={conditionalCount}
                        onChange={this.handleConditionalCountChange}
                        disabled={!this.state.basic_query}
                    />
                </Form.Group>
                {conditionals}
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
        )
    }
    

    render() {
        const {
            advanced_query,
            query_action,
            fields,
            db,
            conditionalCount,
        } = this.state

        return (
            <Grid padded style={{paddingBottom: '2rem'}}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Message>
                            <Message.Header>COUNT Query Selection</Message.Header>
                            <p>
                                This section is for COUNT queries. COUNT queries are very similar to SELECT queries, and actually involve a  
                                SELECT query directly. This query will count the number of entries in the database table 
                                based on the SELECT query provided. If you have terminal/CLI experience using MySQL commands, there is an 
                                advanced query option available if checked. Click the Help button for more detailed information
                            </p>
                        </Message>

                        <Form onSubmit={this.handleAdvancedSubmit}>
                            <Form.Group>
                                <Form.Field 
                                    control={Checkbox}
                                    label='Advanced COUNT Query'
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

                        {this.state.basic_query ? this.renderBasicForm(query_action, fields, db, conditionalCount) : () => console.log('no form needed')}

                        <CountTerminal waiting={this.state.waiting} submitted={this.state.submitted} countQueryCount={this.props.countQueryCount} />
                        <Button color='red' style={{float: 'right'}} onClick={() => this.props.updateCountQueryCount(null)}>Clear</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}