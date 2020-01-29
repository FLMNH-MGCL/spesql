import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { CSVLink } from 'react-csv'

class DownloadDB extends React.Component {
    render() {
        const data = this.props.data

        if (this.props.disabled) {
            return (
                <Button icon labelPosition='left' disabled={this.props.disabled}>
                    <Icon name='download' />
                    Download
                </Button>
            )
        }
        else {
            return (
                <CSVLink data={data} target="_blank">
                    <Button icon labelPosition='left' disabled={this.props.disabled}>
                        <Icon name='download' />
                        Download
                    </Button>
                </CSVLink>
            )
        }
    }
} 

export default DownloadDB


// https://stackoverflow.com/questions/48760815/export-to-csv-button-in-react-table