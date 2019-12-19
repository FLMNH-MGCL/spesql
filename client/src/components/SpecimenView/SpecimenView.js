import React from 'react'
import { Card, Image, Grid, List } from 'semantic-ui-react'
import './SpecimenView.css'
import DeleteDocument from '../DeleteDocument/DeleteDocument'


class SpecimenView extends React.Component {
    // change to query
    render() {
        const selectedSpecimen = this.props.data.find(specimen => {
            return specimen.id === this.props.selectedSpecimen.id
        })

        if (selectedSpecimen === undefined) {
            return (
                <div>
                    <strong>Click a specimen for more info...</strong>
                </div>
            )
        }

        else {
            return (
                // <div>
                //     <p>Genus: {selectedSpecimen.genus}</p>
                //     <p>species: {selectedSpecimen.species}</p>
                //     <p>Collected: {selectedSpecimen.date_collected}</p>
                //     <p>Locality: {selectedSpecimen.locality}</p>
                // </div>
        
                <Grid columns='equal' padded>
                    <Grid.Column>
                        <Card><Image src={require('./test.jpg')} wrapped /></Card>
                        <DeleteDocument target={selectedSpecimen.id} updateList={this.props.updateList.bind(this)}/>
                    </Grid.Column>
                    <Grid.Column>
                        {/* <Table selectable>
                            <Table.Body>
                                <Table.Row>
                                    <p><b>Genus:  </b> {selectedSpecimen.genus}</p>
                                </Table.Row>
                                <Table.Row>
                                    <p><b>species:  </b> {selectedSpecimen.species}</p>
                                </Table.Row>
                            </Table.Body>
                        </Table> */}
                        <List divided verticalAlign='middle' relaxed>
                            <List.Item float='left'>
                                <List.Content><b>LEP #:  </b> {selectedSpecimen.id}</List.Content>
                            </List.Item>
                            <List.Item float='left'>
                                <List.Content><b>Genus:  </b> {selectedSpecimen.genus}</List.Content>
                            </List.Item>
                            <List.Item float='left'>
                                <List.Content><b>Species:  </b> {selectedSpecimen.species}</List.Content>
                            </List.Item>
                            <List.Item float='left'>
                                <List.Content><b>Locality:  </b> {selectedSpecimen.locality}</List.Content>
                            </List.Item>
                            <List.Item float='left'>
                                <List.Content><b>Date Collected:  </b> {selectedSpecimen.date_collected}</List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    
                </Grid>
            )
        }
    }
}

export default SpecimenView