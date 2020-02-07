import React from 'react'
import { Button, Modal, Message, Grid, Table, Input, TextArea } from 'semantic-ui-react'
import axios from 'axios'
import QueryHelp from '../Query/QueryHelp'

class UpdateDocument extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = { 
            open: false,
            mgcl_num: props.selectedSpecimen.mgcl_num,
            lep_num: props.selectedSpecimen.lep_num,
            order_: props.selectedSpecimen.order_,
            superfamily : this.props.selectedSpecimen.superfamily,
            family : this.props.selectedSpecimen.family,
            subfamily: this.props.selectedSpecimen.subfamily,
            tribe: this.props.selectedSpecimen.tribe,
            section: this.props.selectedSpecimen.section,
            genus : this.props.selectedSpecimen.genus,
            species : this.props.selectedSpecimen.species,
            subspecies: this.props.selectedSpecimen.subspecies,
            sex: this.props.selectedSpecimen.sex,
            country: this.props.selectedSpecimen.country,
            province: this.props.selectedSpecimen.province,
            locality : this.props.selectedSpecimen.locality,
            latitude: this.props.selectedSpecimen.latitude,
            longitude: this.props.selectedSpecimen.longitude,
            elevation: this.props.selectedSpecimen.elevation,
            mv_lamp: this.props.selectedSpecimen.mv_lamp,
            days: this.props.selectedSpecimen.days,
            month: this.props.selectedSpecimen.month,
            year: this.props.selectedSpecimen.year,
            collectors: this.props.selectedSpecimen.collectors,
            freezer: this.props.selectedSpecimen.freezer,
            rack : this.props.selectedSpecimen.rack,
            box: this.props.selectedSpecimen.box,
            size: this.props.selectedSpecimen.size,
            note: this.props.selectedSpecimen.note,
        }
    }


    show = () => this.setState({ open: true })
    close = () => this.setState({open: false})

    onChange = (e, {name, value}) => this.setState({[name]: value})

    // handleConfirm= () => {
    //     axios.post(`/api/delete/${this.props.target}`).then(res => {
    //         const data = res.data
    //         console.log(data)
    //     })
    //     this.props.updateList()
    //     this.setState({ open: false })
    // }

    onSubmit = (e) => {
        let changes = []
        for (var field of Object.keys(this.props.selectedSpecimen)) {
            console.log(field)
            console.log(this.state[field])
            console.log(this.props.selectedSpecimen[field])
            if (field === 'id') continue

            if (this.state[field] === this.props.selectedSpecimen[field]) {
                // console.log('same values')
            }
            else {
                // console.log('diff values')
                let change = {
                    field: field,
                    oldValue: this.props.selectedSpecimen[field],
                    newValue: this.state[field]
                }
                changes.push(JSON.stringify(change))
            }
        }

        if (changes.length > 0) {
            console.log('Changes were detected')
            console.log(changes)
        }

        else {
            console.log('There were no changes made overall')
        }
    }

    render() {
        console.log(this.state)
        if (!this.props.currentQuery.startsWith('SELECT *')) {
            return (
                <Modal 
                    trigger={<Button color='yellow' onClick={this.show}>UPDATE</Button>}
                    centered
                    open={this.state.open}
                    onClose={this.close}
                    closeIcon
                    size='small'
                >
                    <Modal.Header>
                        Invalid usage!
                    </Modal.Header>
                    <Modal.Content>
                        <p>
                            Updating a single specimen requires a current loaded SELECT query that contains all existing headers. 
                            This means you must have made a SELECT ALL (SELECT *) query. This is so data isn't changed because it is 
                            thought to be empty, when it may just be missing because of a narrow query. See the Query Selector Menu for more help (the 
                            Query button on the header menu).
                        </p>
                    </Modal.Content>
                </Modal>
            )
        }
        else {
            const {
                mgcl_num,
                lep_num,
                order_,
                superfamily ,
                family ,
                subfamily,
                tribe,
                section,
                genus ,
                species ,
                subspecies,
                sex,
                country,
                province,
                locality ,
                latitude,
                longitude,
                elevation,
                mv_lamp,
                days,
                month,
                year,
                collectors,
                freezer,
                rack,
                box,
                size,
                note
            } = this.state

            return(
                <React.Fragment>
                    <Modal 
                        trigger={<Button color='yellow' onClick={this.show}>UPDATE</Button>}
                        centered
                        open={this.state.open}
                        onClose={this.close}
                        closeIcon 
                        style={{maxHeight: '85vh'}}
                    >
                        <Modal.Header>UPDATE Single Specimen</Modal.Header>
                        <Modal.Content scrolling style={{minHeight: '80vh'}}>
                            <Grid padded>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Message>
                                            <p>
                                                This is the menu for updating a single, selected specimen in the database table. If you require more 
                                                functionality than a single UPDATE query on one specimen, please navigate to the Query Selector menu 
                                                (click the button entitled 'Query' on the header menu). If you need more help with this section, click the 
                                                Help button at the bottom of the form.<br /><br />
                                                Please note, proposed values will be initialized to existing values. They will be updated only if new values 
                                                differ from what already is stored.
                                            </p>
                                        </Message>

                                        <Table singleLine>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Field</Table.HeaderCell>
                                                    <Table.HeaderCell>Current Data</Table.HeaderCell>
                                                    <Table.HeaderCell>Proposed Update</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>Record #</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.lep_num}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='lep_num'
                                                            value={lep_num}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Catolog #</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.mgcl_num}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='mgcl_num'
                                                            value={mgcl_num}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Order</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.order_}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='order_'
                                                            value={order_}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Superfamily</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.superfamily}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='superfamily'
                                                            value={superfamily}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Family</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.family}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='family'
                                                            value={family}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Subfamily</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.subfamily}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='subfamily'
                                                            value={subfamily}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Tribe</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.tribe}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='tribe'
                                                            value={tribe}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Section</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.section}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='section'
                                                            value={section}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Genus</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.genus}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='genus'
                                                            value={genus}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Species</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.species}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='species'
                                                            value={species}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Subspecies</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.subspecies}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='subspecies'
                                                            value={subspecies}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Sex</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.sex}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='sex'
                                                            value={sex}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Country</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.country}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='country'
                                                            value={country}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Province</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.province}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='province'
                                                            value={province}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Locality</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.locality}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='locality'
                                                            value={locality}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Latitude</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.latitude}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='latitude'
                                                            value={latitude}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Longitude</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.longitude}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='longitude'
                                                            value={longitude}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Elevation</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.elevation}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='elevation'
                                                            value={elevation}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>MV Lamp</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.mv_lamp}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='mv_lamp'
                                                            value={mv_lamp}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Day(s)</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.days}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='days'
                                                            value={days}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Month</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.month}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='month'
                                                            value={month}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Year</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.year}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='year'
                                                            value={year}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Collector(s)</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.collectors}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='collectors'
                                                            value={collectors}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Freezer</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.freezer}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='freezer'
                                                            value={freezer}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Rack</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.rack}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='rack'
                                                            value={rack}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Box</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.box}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='box'
                                                            value={box}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Size</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.size}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            name='size'
                                                            value={size}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell>Notes</Table.Cell>
                                                    <Table.Cell>{this.props.selectedSpecimen.note}</Table.Cell>
                                                    <Table.Cell>
                                                        <TextArea 
                                                            name='note'
                                                            value={note}
                                                            onChange={this.onChange}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        <div style={{float: 'right'}}>
                                            <QueryHelp queryType='UPDATE_SINGLE' />
                                            <Button onClick={this.onSubmit} color='red'>UPDATE</Button>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Modal.Content>
                    </Modal>
                </React.Fragment>
                
            )
        }

    }
}

export default UpdateDocument