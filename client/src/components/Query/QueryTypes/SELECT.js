import React from 'react'
import axios from 'axios'
import { Button, Grid, Form, Input, Select, Checkbox, Message, Header, Divider } from 'semantic-ui-react'
import { 
    selectQueryOption, headerSelection, setOperatorOptions, conditionalOperatorOptions, setCountOptions, conditionalCountOptions
} from '../QueryConstants/constants'
import QueryHelp from '../QueryHelp'
import ErrorTerminal from '../QueryTerminals/ErrorTerminal'


export default class SELECT extends React.Component {
    state = {
        advanced_query: '',
        basic_query: true,
        query_action: 'SELECT',
        fields: ['*'],
        db: '',
        conditionalCount: 0,
        conditionals: [],
        fields_search: [],
        search_: '',
        operator: '',
        showModal: false
    }

    checkBasicQueryErrors = () => {
        // return ['test 1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test 1', 'test2', 'test3', 'test4', 'test5', 'test6']
        let errors = []
        if (this.state.query_action.toUpperCase() !== 'SELECT') {
            errors.push('Syntax Error: Invalid query type. This section is reserved for SELECT queries only.')
        }
        if (this.state.fields.length > 1 && this.state.fields.indexOf('*') > -1) {
            errors.push('Formatting Error: If ALL is selected, no other fields should be selected.')
        }
        if (this.state.fields.length === 0) {
            errors.push('Syntax Error: A field must be selected.')
        }
        if (this.state.db === '') {
            errors.push('Syntax Error: A database table must be selected.')
        }
        // if () {
        //     errors.push()
        // }
        // if () {
        //     errors.push()
        // }

        return errors
    }

    // DANGEROUS, EASY TO BREAK NEED MORE CHECKS
    handleSubmit = () => {
        let errors = this.checkBasicQueryErrors()
        if (errors.length > 0) {
            // errors found, update redux error for select query
            this.props.updateSelectErrorMessage(errors)
            return
        }
        else {
            console.log('made it to else???')
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
    
            // console.log(command)
            this.props.closeModal()
            this.props.clearQuery()
            this.props.runQuery(command)
        }
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

    renderErrorTerminal = () => (
        <React.Fragment>
            <ErrorTerminal errorLog={this.props.errorMessages.selectError} />
            <Button onClick={() => this.props.updateSelectErrorMessage(null)} color='red' style={{float: 'right'}}>Clear</Button>
        </React.Fragment>
    )

    render() {
        console.log(this.props.errorMessages)
        console.log(this.state)
        const {
            advanced_query,
            query_action,
            fields,
            db,
            conditionalCount,
        } = this.state

        const conditionals = this.renderConditions()

        return (
            <Grid padded>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header as='h2' dividing>SELECT Query: </Header>
                        <Message>
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
                                    error={this.state.basic_query === false && !advanced_query.toUpperCase().startsWith('SELECT') ?  {
                                        content: 'This query must be a SELECT command.',
                                    } : false }
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

                        {this.props.errorMessages.selectError ? this.renderErrorTerminal() : null}

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}