import React from 'react'
import axios from 'axios'
import { Button, Icon, Modal, Divider } from 'semantic-ui-react'
import { SELECT, UPDATE, COUNT } from './QueryTypes'
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
                        <SELECT 
                            dbSelection={dbSelection} 
                            runQuery={this.props.runQuery} 
                            clearQuery={this.props.clearQuery} 
                            closeModal={this.closeModal} 
                            errorMessages={this.props.errorMessages} 
                            updateSelectErrorMessage={this.props.updateSelectErrorMessage}
                        />
                        <Divider />
                        <COUNT dbSelection={dbSelection} runQuery={this.props.runQuery} countQueryCount={this.props.countQueryCount} updateCountQueryCount={this.props.updateCountQueryCount}/>
                        <Divider />
                        <UPDATE dbSelection={dbSelection} runQuery={this.props.runQuery} clearQuery={this.props.clearQuery} closeModal={this.closeModal} />
                        <Divider />
                    </Modal.Content>
                </Modal>
            
        )
        
    }
}

export default QueryGrid