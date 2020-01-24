import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

export default class QueryHelp extends React.Component {
    state = { open: false }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open } = this.state
        if (this.props.queryType === 'SELECT') {
            return (
                <Modal
                    open={open}
                    onOpen={this.open}
                    onClose={this.close}
                    size='small'
                    trigger={
                    <Button primary icon type="button">
                        See Help <Icon name='question' />
                    </Button>
                    }
                >
                    <Modal.Header>SELECT Query Help</Modal.Header>
                    <Modal.Content>
                    <p>
                        Eventually, there will be a thorough explanation, as well as a few examples on this page.
                        For now, this is all there will be.
                    </p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button icon='check' content='Got it!' onClick={this.close} />
                    </Modal.Actions>
                </Modal>
            )
        }
        else {
            return (
                <Modal
                    open={open}
                    onOpen={this.open}
                    onClose={this.close}
                    size='small'
                    trigger={
                    <Button primary icon type="button">
                        See Help <Icon name='question' />
                    </Button>
                    }
                >
                    <Modal.Header>TBA Query Help</Modal.Header>
                    <Modal.Content>
                    <p>
                        Eventually, there will be a thorough explanation, as well as a few examples on this page.
                        For now, this is all there will be.
                    </p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button icon='check' content='Got it!' onClick={this.close} />
                    </Modal.Actions>
                </Modal>
            )
        }
    }
}