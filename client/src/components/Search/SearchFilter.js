import React from 'react'
import { Dropdown, Popup, Modal, Button, Checkbox, Form, Container, Segment } from 'semantic-ui-react'
import {headerSelection} from '../Query/QueryConstants/constants'

class SearchFilter extends React.Component {
    state = {filterCategory: this.props.filterCategory, open: false}

    show = () => {
      this.setState({open: true})
    }

    close = () => {
      this.setState({open: false})
    }

    handleChange = (e, {value}) => {
        //this.setState({ filterCategory: value})
        // console.log(e.currentTarget.textContent)
        if (value !== this.state.filterCategory) {
          this.props.updateFilteredCategory(value)
          this.setState({filterCategory: value})
          this.close()
        }
        else return
    }

    renderChecks = () => {
      let checkRow = []
      let checkGrid = headerSelection.map((header, index) => {
        if (index === headerSelection.length - 1 || (index + 1) % 3 === 0) {
          checkRow.push((
            <Form.Field>
              <Checkbox
                radio
                label={header.value === '*' ? 'all' : header.value}
                name='checkboxRadioGroup'
                value={header.value}
                checked={this.state.filterCategory === header.value}
                onChange={this.handleChange}
              />
            </Form.Field>
          ))

          let tempRow = checkRow
          checkRow = []
          return (
            <Form.Group widths='equal'>
              {tempRow}
            </Form.Group>
          )
        }
        else {
          checkRow.push((
            <Form.Field>
              <Checkbox
                radio
                label={header.value === '*' ? 'all' : header.value}
                name='checkboxRadioGroup'
                value={header.value}
                checked={this.state.filterCategory === header.value}
                onChange={this.handleChange}
              />
            </Form.Field>
          ))
        }
      })

      return checkGrid
    }

    render() {
      // console.log(this.props.filterCategory)
        const { filterCategory } = this.state
        return (
                  <Modal
                    closeIcon
                    open={this.state.open}
                    onClose={() => this.close()}
                    trigger={
                      <Button
                        label={this.props.filterCategory === '*' ? null : this.props.filterCategory}
                        icon='filter'
                        disabled={this.props.disabled}
                        onClick={() => this.show()}
                      />
                    }
                  >
                    <Modal.Header>Filter Selection</Modal.Header>
                    <Modal.Content>
                    <Container text>
                    <Segment>
                      <Form style={{paddingTop: '1rem'}}>
                        {this.renderChecks()}
                      </Form>
                      </Segment>
                      </Container>
                    </Modal.Content>
                  </Modal>
        )
    }
}

export default SearchFilter
