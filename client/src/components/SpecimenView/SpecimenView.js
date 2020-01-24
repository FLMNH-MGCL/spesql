import React from 'react'
import { Card, Image, Grid, List } from 'semantic-ui-react'
import './SpecimenView.css'
import DeleteDocument from '../DeleteDocument/DeleteDocument'


class SpecimenView extends React.Component {
    // change to query
    render() {
        if (this.props.data === undefined) {
            return (
                <div>
                    <strong>Click a specimen for more info...</strong>
                </div>
            )
        }
        else {
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
                                    <List.Content><b>LEP #:  </b> {selectedSpecimen.lep_num}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>MGCL #:  </b> {selectedSpecimen.mgcl_num}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Order:  </b> {selectedSpecimen.order_}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Superfamily:  </b> {selectedSpecimen.superfamily}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Family:  </b> {selectedSpecimen.family}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Subfamily:  </b> {selectedSpecimen.subfamily}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Tribe:  </b> {selectedSpecimen.tribe}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Section:  </b> {selectedSpecimen.section}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Genus:  </b> {selectedSpecimen.genus}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Species:  </b> {selectedSpecimen.species}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Subspecies:  </b> {selectedSpecimen.subspecies}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Sex:  </b> {selectedSpecimen.sex}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Country:  </b> {selectedSpecimen.country}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Province:  </b> {selectedSpecimen.province}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Locality:  </b> {selectedSpecimen.locality}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Latitude:  </b> {selectedSpecimen.latitude}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Longitude:  </b> {selectedSpecimen.longitude}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Elevation:  </b> {selectedSpecimen.elevation}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>MV Lamp:  </b> {selectedSpecimen.mv_lamp}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Day(s):  </b> {selectedSpecimen.day}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Month:  </b> {selectedSpecimen.month}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Year:  </b> {selectedSpecimen.year}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Collector(s):  </b> {selectedSpecimen.collectors}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Freezer:  </b> {selectedSpecimen.freezer}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Rack:  </b> {selectedSpecimen.rack}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Box:  </b> {selectedSpecimen.box}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Size:  </b> {selectedSpecimen.size}</List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content><b>Notes:  </b> {selectedSpecimen.note}</List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                        
                    </Grid>
                )
            }
        }
    }
}

export default SpecimenView