import React from 'react'
import axios from 'axios'
import { Button, Icon, Modal, Grid, Form, Input, Select, Checkbox, Message, Loader, Dimmer } from 'semantic-ui-react'
import { SELECT, UPDATE } from './QueryTypes'
import QueryHelp from './QueryHelp'
import './QueryGrid.css'

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



class QueryGrid extends React.Component {
    state = {
        showModal: false
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        return(
                <Modal trigger={
                    <Button icon labelPosition='left' onClick={() => this.setState({showModal: true})}>
                        <Icon name='archive' />
                        Query
                    </Button>
                } centered closeIcon open={this.state.showModal} onClose={this.closeModal} style={{maxHeight: '85vh'}}>

                    <Modal.Header>Query Selector</Modal.Header>
                    <Modal.Content scrolling style={{minHeight: '80vh'}}>
                        <SELECT dbSelection={dbSelection} />
                        <UPDATE dbSelection={dbSelection} />
                    </Modal.Content>
                </Modal>
            
        )
        
    }
}

export default QueryGrid