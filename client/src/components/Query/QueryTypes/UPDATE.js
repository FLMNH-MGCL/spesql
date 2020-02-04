import React from 'react'
import axios from 'axios'
import { Button, Grid, Form, Input, Select, Checkbox, Message, Dropdown } from 'semantic-ui-react'
import { updateQueryOption, headerSelection, operatorOptions, setCountOptions } from '../QueryConstants/constants'
import QueryHelp from '../QueryHelp'

export default class UPDATE extends React.Component {
    state = {
        advanced_query: '',
        basic_query: true,
        query_action: 'UPDATE',
        db: '',
        setCount: 1,
        sets: [{
            field: '', operator: '=', newValue: ''
        }],
        conditionalCount: 1,
        conditionals: [{
            field: '', operator: '', searchTerms: ''
        }],
        fields_search: [],
        newValue: '',
        serachTerms: '',
        operator: '',
    }

    handleSubmit = () => {
        // command += ';'
        // this.setState({showModal: false})
        // this.props.clearQuery()
        // this.props.runQuery(command)
        // this.props.closeModal()
    }

    handleAdvancedSubmit = () => {
        // this.setState({showModal: false})
        // this.props.clearQuery()
        // this.props.runQuery(this.state.advanced_query)
        // this.props.closeModal()
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSetCountChange = (e, {name, value}) => {
        // get previous count
        let prevCount = this.state.setCount
        // if previous if smaller, concat more items to array
        if (prevCount < value) {
            let newSets = [...this.state.sets].concat(Array.from({length: value - prevCount}, () => {
                return {
                    field: '', operator: '=', newValue: ''
                }
            }))
            console.log(newSets)

            this.setState({
                [name]: value,
                sets: newSets
            })
        }
        else if (prevCount > value) {
            let newSets = [...this.state.sets].slice(0, value)
            this.setState({
                [name]: value,
                sets: newSets
            })
        }
        // if previous is bigger, slice to match new count
    }

    handleSetItemChange = (e, {name, value, id}) => {
        const newSetItem = {
            ...this.state.sets[id],
            [name]: value
        }

        this.setState({
            sets: [
                ...this.state.sets.slice(0, id),
                Object.assign({}, this.state.sets[id], newSetItem),
                ...this.state.sets.slice(id + 1)
            ]
        })
    }

    handleAdvancedCheck = (e, { name, value }) => this.setState({ basic_query: !this.state.basic_query})

    renderSets = () => {
        // each set value should be an array position in the state's set array of objs
        // so each form field should change each elements field, op and newVal when changed
        let sets = Array.from({length: this.state.setCount}, (item, index) => {
            return (
                <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    options={headerSelection}
                    label='SET (field)'
                    placeholder='FIELD'
                    search
                    name='field'
                    index={index}
                    value={this.state.sets[index].field}
                    onChange={this.handleSetItemChange}
                    id={index}
                    disabled={!this.state.basic_query}
                />
                <Form.Field
                    control={Select}
                    options={operatorOptions}
                    label='Operator'
                    placeholder='='
                    name='operator'
                    value={this.state.sets[index].operator}
                    onChange={this.handleSetItemChange}
                    id={index}
                    disabled={!this.state.basic_query}
                />
                <Form.Field
                    control={Input}
                    label='New Value'
                    placeholder='value'
                    search
                    name='newValue'
                    value={this.state.sets[index].newValue}
                    onChange={this.handleSetItemChange}
                    id={index}
                    disabled={!this.state.basic_query}
                />
            </Form.Group>
            )
        })
        return sets
    }

    // renderConditions = () => {
    //     let conditionals = Array.from({length: this.state.conditionalCount}, (item, index) => {
    //         return (
    //             <Form.Group widths='equal'>
    //             <Form.Field
    //                 control={Select}
    //                 options={headerSelection}
    //                 label='Field'
    //                 placeholder='FIELD'
    //                 search
    //                 name='fields_search'
    //                 value={fields_search}
    //                 onChange={this.handleChange}
    //                 id={index}
    //                 disabled={!this.state.basic_query}
    //             />
    //             <Form.Field
    //                 control={Select}
    //                 options={operatorOptions}
    //                 label='Operator'
    //                 placeholder='='
    //                 name='operator'
    //                 value={operator}
    //                 onChange={this.handleChange}
    //                 id={index}
    //                 disabled={!this.state.basic_query}
    //             />
    //             <Form.Field
    //                 control={Input}
    //                 label='Search'
    //                 placeholder='Search Term(s)'
    //                 search
    //                 name='serachTerms'
    //                 value={searchTerms}
    //                 onChange={this.handleChange}
    //                 id={index}
    //                 disabled={!this.state.basic_query}
    //             />
    //         </Form.Group>
    //         )
    //     })
    //     return conditionals
    // }

    render() {
        // this.renderConditions()
        const {
            advanced_query,
            query_action,
            fields,
            db,
            fields_search,
            newValue,
            searchTerms,
            operator,
            setCount,
            conditionalCount,
        } = this.state

        console.log(this.state)
        let sets = this.renderSets()

        return (
            <Grid padded>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Message>
                            <Message.Header>UPDATE Query Selection</Message.Header>
                            <p>
                                This section is for UPDATE queries. UPDATE queries are those that update values of entries
                                within the database. If you have terminal/CLI experience using MySQL commands, there is an 
                                advanced query option available if checked. Please check your permissions with the Database Manager,
                                as this query will fail if you are not authorized to make it. Click the Help button for more detailed information
                            </p>
                        </Message>
                        <Form onSubmit={this.handleAdvancedSubmit}>
                            <Form.Group>
                                <Form.Field 
                                    control={Checkbox}
                                    label='Advanced UPDATE Query'
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
                                    options={updateQueryOption}
                                    label='QUERY'
                                    placeholder='UPDATE'
                                    search
                                    name='query_action'
                                    value={query_action}
                                    onChange={this.handleChange}
                                    disabled={!this.state.basic_query}
                                    required
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
                                    label='SET count (how many changes)'
                                    options={setCountOptions}
                                    name='setCount'
                                    value={setCount}
                                    onChange={this.handleSetCountChange}
                                    disabled={!this.state.basic_query}
                                />
                            </Form.Group>
                            {sets}
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    label='WHERE count (how many conditionals)'
                                    options={setCountOptions}
                                    name='conditionalCount'
                                    value={conditionalCount}
                                    onChange={this.handleChange}
                                    disabled={!this.state.basic_query}
                                />
                            </Form.Group>
                            {/* {conditionals} */}
                            <Form.Group className='float-right'>
                                <QueryHelp queryType='UPDATE'/> 
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