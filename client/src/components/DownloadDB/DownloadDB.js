import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { CSVLink } from 'react-csv'

class DownloadDB extends React.Component {
    render() {
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
                <Modal
                    trigger={
                        <Button icon labelPosition='left' disabled={this.props.disabled}>
                            <Icon name='download' />
                            Download
                        </Button>
                    }
                closeIcon>
                    <Modal.Header>Download Options</Modal.Header>
                    <Modal.Content>
                        <p style={{display: 'block'}}>Would you like to download the entire query or what is currently visible / loaded?</p>
                        <div>
                            <p style={{display: 'block'}}><b>Current Query Size: </b> {this.props.data.length}</p>
                            <p style={{display: 'block'}}><b>Loaded Content Size: </b> {this.props.displayed.length}</p>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <CSVLink data={this.props.data} target="_blank">
                            <Button primary>
                                Download All
                            </Button>
                        </CSVLink>

                        <CSVLink data={this.props.displayed} target="_blank">
                            <Button secondary>
                                Download Loaded
                            </Button>
                        </CSVLink>
                    </Modal.Actions>
                </Modal>
            )
        }
    }
} 

export default DownloadDB


// https://stackoverflow.com/questions/48760815/export-to-csv-button-in-react-table