import React from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import axios from 'axios'
import './DeleteDocument.css'

class DeleteDocument extends React.Component {
    state = { open: false}

    show = () => this.setState({ open: true })

    handleConfirm= () => {
        axios.post(`/api/delete/${this.props.target}`).then(res => {
            const data = res.data
            console.log(data)
        })
        this.props.updateList()
        this.setState({ open: false })
    }

    handleCancel = () => this.setState({ open: false })

    render() {
        return(
            <React.Fragment>
                <Button negative onClick={this.show}>DELETE</Button>
                <Confirm
                    open={this.state.open}
                    header="Are you sure?"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    size='small'
                />
            </React.Fragment>
            
        )
    }
}

export default DeleteDocument