import React from 'react'
import { Segment, Statistic } from 'semantic-ui-react'

export default class CountTerminal extends React.Component {

    renderCount = () => (
        <Statistic>
            <Statistic.Value style={{color: 'white'}}>{this.props.countQueryCount}</Statistic.Value>
            <Statistic.Label style={{color: 'white'}}>Count</Statistic.Label>
        </Statistic>
    )

    render () {

        let emptyMessage = 'The count query data will display here...'

        return (
            <Segment.Group style={{minHeight: '35vh', backgroundColor: '#53596c', color: 'white'}}>
                <Segment textAlign='center' style={{backgroundColor: '#53596c'}}>Count Return</Segment>
                <Segment.Group style={{minHeight: '25vh', backgroundColor: '#353c51'}}>
                    <Segment loading={this.props.waiting && this.props.submitted} textAlign='center' style={{minHeight: '25vh', backgroundColor: '#353c51', paddingTop: '7vh'}}>
                        {!this.props.countQueryCount &&  this.props.countQueryCount !== 0 ? emptyMessage : this.renderCount()}
                    </Segment>
                </Segment.Group>
            </Segment.Group>
        )
    }
}