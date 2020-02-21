import React from 'react'
import axios from 'axios'
import { Button, Grid, Form, Input, Select, Checkbox, Message, Header } from 'semantic-ui-react'
import ErrorTerminal from '../QueryTerminals/ErrorTerminal'
import { updateQueryOption, headerSelection, setOperatorOptions, setCountOptions } from '../QueryConstants/constants'
import QueryHelp from '../QueryHelp'

const setOptions = headerSelection.slice(1, headerSelection.length)

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
            field: '', operator: '=', searchTerms: ''
        }],
        loading: false,
    }

    handleSubmit = () => {
      console.log('made it')
        this.setState({loading: true})
        let errors = this.checkBasicPreSubmit()

        if (errors.length !== 0) {
          this.props.updateUpdateErrorMessage(errors)
          this.setState({loading: false})
          return
        }

        let command = String(this.state.query_action + ' ' + this.state.db + ' SET ')

        let setString = ''
        this.state.sets.forEach((set, index) => {
            setString += set.field
            setString += set.operator
            setString += '\'' + set.newValue + '\''

            if (index !== this.state.conditionalCount - 1) {
                setString += ' AND '
            }
        })

        let conditionalString = ' WHERE '

        this.state.conditionals.forEach((conditional, index) => {
            conditionalString += conditional.field + ' '
            conditionalString += conditional.operator + ' '
            conditionalString += '\'' + conditional.searchTerms + '\''

            if (index !== this.state.conditionalCount - 1) {
                conditionalString += ' AND '
            }
        })

        command += setString
        command += conditionalString

        command += ';'

        console.log(command)
        // this.props.closeModal()
        // this.props.clearQuery()
        this.props.runQuery(command)

        setTimeout(() => {
            if (!this.props.loading && !this.props.errorMessages.updateError) {
                this.props.closeModal()
            }
            else {
                this.setState({loading: false})
            }
        }, 1000)
    }

    handleAdvancedSubmit = () => {
        // this.setState({showModal: false})
        // this.props.clearQuery()
        // this.props.runQuery(this.state.advanced_query)
        // this.props.closeModal()
        this.setState({loading: true})
        let errors = []
        errors = this.checkAdvancedPostSubmit()
        if (errors.length > 0) {
          this.props.updateUpdateErrorMessage(errors)
        }
        else {
          this.props.runQuery(this.state.advanced_query)

        }

        setTimeout(() => {
            if (!this.props.loading && !this.props.errorMessages.updateError) {
                this.props.closeModal()
            }
            else {
                this.setState({loading: false})
            }
        }, 500)
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
        id = parseInt(id)
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
            console.log(newConditionals)

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
        id = parseInt(id)
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

    handleAdvancedCheck = (e, { name, value }) => this.setState({ basic_query: !this.state.basic_query})

    renderSets = () => {
        // each set value should be an array position in the state's set array of objs
        // so each form field should change each elements field, op and newVal when changed
        let sets = Array.from({length: this.state.setCount}, (item, index) => {
            return (
                <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    options={setOptions}
                    label='SET (field)'
                    placeholder='FIELD'
                    search
                    error={(this.state.sets[index].field === '' && this.state.basic_query) ? {content: 'You must select a UNIQUE field to alter.'} : false}
                    name='field'
                    index={index}
                    value={this.state.sets[index].field}
                    onChange={this.handleSetItemChange}
                    id={String(index)}
                    disabled={!this.state.basic_query}
                />
                <Form.Field
                    control={Select}
                    options={setOperatorOptions}
                    label='Operator'
                    placeholder='='
                    name='operator'
                    value={this.state.sets[index].operator}
                    onChange={this.handleSetItemChange}
                    id={String(index)}
                    disabled={!this.state.basic_query}
                />
                <Form.Field
                    control={Input}
                    label='New Value'
                    placeholder='value'
                    search
                    error={(this.state.sets[index].newValue === '' && this.state.basic_query) ? {content: 'You must enter a new value to update the original.'} : false}
                    name='newValue'
                    value={this.state.sets[index].newValue}
                    onChange={this.handleSetItemChange}
                    id={String(index)}
                    disabled={!this.state.basic_query}
                />
            </Form.Group>
            )
        })
        return sets
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
                    error={(this.state.conditionals[index].field === '' && this.state.basic_query) ? {content: 'You must select a UNIQUE conditional field.'} : false}
                    name='field'
                    value={this.state.conditionals[index].field}
                    onChange={this.handleConditionalItemChange}
                    id={String(index)}
                    disabled={!this.state.basic_query}
                />
                <Form.Field
                    control={Select}
                    options={setOperatorOptions}
                    label='Operator'
                    placeholder='='
                    name='operator'
                    value={this.state.conditionals[index].operator}
                    onChange={this.handleConditionalItemChange}
                    id={String(index)}
                    disabled={!this.state.basic_query}
                />
                <Form.Field
                    control={Input}
                    label='Conditional Value'
                    placeholder='value'
                    search
                    name='searchTerms'
                    error={(this.state.conditionals[index].searchTerms === '' && this.state.basic_query) ? {content: 'You must enter a value for the conditional.'} : false}
                    value={this.state.conditionals[index].searchTerms}
                    onChange={this.handleConditionalItemChange}
                    id={String(index)}
                    disabled={!this.state.basic_query}
                />
            </Form.Group>
            )
        })
        return conditionals
    }

    checkAdvancedPostSubmit = () => {
      let errors = []
      // check if its empty
      if (this.state.advanced_query === '' && !this.state.basic_query) {
          errors.push('Query Format Error: Empty submission.')
      }

        // check if its prefixed correctly
        if (!this.state.advanced_query.toUpperCase().startsWith('UPDATE') && !this.state.basic_query) {

          errors.push('Query Type Error: This query must be an UPDATE query.')

        }

        // check punctuation
        if (this.state.advanced_query.includes('\'') && !this.state.basic_query) {
            errors.push('Query Format Error: Remove any \', ` or ; punctuation marks, as these will be handled for you.')
        }

        // check for conditionals present
        if (!this.state.advanced_query.toUpperCase().includes('WHERE') && this.state.advanced_query !== '' && !this.state.basic_query) {
            errors.push('Query Format Error: You must include conditionals, only root can exclude them.')
        }

        if (this.state.advanced_query.endsWith(';') && !this.state.basic_query) {
            errors.push('Query Format Error: Remove any \', ` or ; punctuation marks, as these will be handled for you.')
        }

        return errors

    }

    checkAdvancedPreSubmit = () => {
        // check if its prefixed correctly
        if (!this.state.advanced_query.toUpperCase().startsWith('UPDATE') && !this.state.basic_query) {
            return {
                content: 'This query must be an UPDATE query.',
            }
        }

        // check punctuation
        if (this.state.advanced_query.includes('\'') && !this.state.basic_query) {
            return {
                content: 'Remove any \', ` or ; punctuation marks, as these will be handled for you.'
            }
        }

        // check for conditionals present
        if (!this.state.advanced_query.toUpperCase().includes('WHERE') && this.state.advanced_query !== '' && !this.state.basic_query) {
            return {
                content: 'You must include conditionals, only root can exclude them.'
            }
        }

        if (this.state.advanced_query.endsWith(';') && !this.state.basic_query) {
          return {
              content: 'Remove any \', ` or ; punctuation marks, as these will be handled for you.'
          }
        }


    }

    checkBasicPreSubmit = () => {
      let errors = []

      if (this.state.query_action.toLowerCase() !== 'update') {
        errors.push('Query Type Error: You must run an UPDATE query here.')
      }
      if (this.state.db === '') {
        errors.push('Query Format Error: You must select a database table.')
      }

      this.state.sets.forEach((set, index) => {
        if (set.field === '') {
          errors.push(`Query Format Error: You must select a UNIQUE field to alter. (Found empty value in row ${index + 1} of Sets)`)
        }
        if (set.operator !== '=') {
          errors.push(`Query Error: You must select an = operator for an update field. (Found ${set.operator}, expected =)`)
        }
        // implement check for specific field (i.e. controlled values)
        if (set.newValue === '') {
          errors.push(`Query Format Error: You must enter a new value.`)
        }
      })

      this.state.conditionals.forEach((conditional, index) => {
        if (conditional.field === '') {
          errors.push(`Query Format Error: You must select a UNIQUE conditional field. (Found empty value in row ${index + 1} of Conditionals)`)
        }
        // if (conditional.operator !== '=') {
        //   errors.push(`Query Error: You must select an = operator for an update field. (Found ${set.operator}, expected =)`)
        // }
        // implement check for specific field (i.e. controlled values)
        if (conditional.searchTerms === '') {
          errors.push(`Query Format Error: You must enter a new value.`)
        }
      })

      return errors
    }

    renderBasicForm = (query_action, db, setCount, sets, conditionalCount, conditionals) => (
      <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
              <Form.Field
                  control={Select}
                  options={updateQueryOption}
                  label='QUERY'
                  placeholder='UPDATE'
                  search
                  name='query_action'
                  error={(this.state.query_action !== 'UPDATE' && this.state.basic_query) ? {content: 'You must run an UPDATE query here.'} : false}
                  value={query_action}
                  onChange={this.handleChange}
                  disabled={!this.state.basic_query}
                  required
              />
              <Form.Field
                  control={Select}
                  options={this.props.dbSelection}
                  label='Database Table'
                  placeholder=''
                  search
                  error={(this.state.db === '' && this.state.basic_query) ? {content: 'You must select a database table.'} : false}
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
                  onChange={this.handleConditionalCountChange}
                  disabled={!this.state.basic_query}
              />
          </Form.Group>
          {conditionals}
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
    )

    renderErrorTerminal = () => (
        <React.Fragment>
            <ErrorTerminal errorLog={this.props.errorMessages.updateError} />
            <Button onClick={() => {this.props.updateUpdateErrorMessage(null); this.setState({loading: false})}} color='red' style={{float: 'right'}}>Clear</Button>
        </React.Fragment>
    )

    render() {
        const {
            advanced_query,
            query_action,
            db,
            setCount,
            conditionalCount,
        } = this.state

        console.log(this.state)
        let sets = this.renderSets()
        let conditionals = this.renderConditions()

        return (
            <Grid padded>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header as='h2' dividing style={{paddingTop: '2rem'}}>UPDATE Query: </Header>
                        <Message>
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
                                    error={this.checkAdvancedPreSubmit() !== {} ? this.checkAdvancedPreSubmit() : false }
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

                        {this.state.basic_query ? this.renderBasicForm(query_action, db, setCount, sets, conditionalCount, conditionals) : null}

                        {this.props.errorMessages.updateError ? this.renderErrorTerminal() : null}

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
