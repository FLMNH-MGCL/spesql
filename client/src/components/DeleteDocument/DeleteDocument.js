import React from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'

class DeleteDocument extends React.Component {
    handleClick = () => {
        axios.post(`/api/delete/${this.props.target}`).then(res => {
            const data = res.data
            console.log(data)
        })
        this.props.updateList()
    }

    render() {
        return(
            <Button negative onClick={this.handleClick}>DELETE</Button>
        )
    }
}

export default DeleteDocument