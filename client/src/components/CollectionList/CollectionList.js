import React from 'react'
import { Table } from 'semantic-ui-react'
//import SpecimenCard from './SpecimenCard'

export default ({data, filteredText, filterCategory, selectedUpdate, sortBy}) => {
    //console.log(data[0].species)
    // change to api call to databaseS
    const collectionList = data
        .filter(specimen => {
            // LARGE SWITCH TO FILTER ITEMS
            if (filterCategory === 'Species') {
                return specimen.species.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else if (filterCategory === 'Genus') {
                return specimen.genus.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else if (filterCategory === 'Locality') {
                return specimen.locality.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else if (filterCategory === 'Collection Date') {
                return specimen.date_collected.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else {
                return specimen.species.toLowerCase().indexOf('') >= 0
            } 
        })        
        .sort((specimen_a, specimen_b) => {
            if (sortBy === 'Lep #') {
                return (specimen_a.id > specimen_b.id) ? 1 : ((specimen_b.id > specimen_a.id) ? -1 : 0)
            }
            else if (sortBy === 'Superfamily') {
                return (specimen_a.superfamily > specimen_b.superfamily) ? 1 : ((specimen_b.superfamily > specimen_a.superfamily) ? -1 : 0)
            }
            else if (sortBy === 'Family') {
                return (specimen_a.family > specimen_b.family) ? 1 : ((specimen_b.family > specimen_a.family) ? -1 : 0)
            }
            else if (sortBy === 'Genus') {
                return (specimen_a.genus > specimen_b.genus) ? 1 : ((specimen_b.genus > specimen_a.genus) ? -1 : 0)
            }
            else if (sortBy === 'Species') {
                return (specimen_a.species > specimen_b.species) ? 1 : ((specimen_b.species > specimen_a.species) ? -1 : 0)
            }
            else if (sortBy === 'Locality') {
                return (specimen_a.locality > specimen_b.locality) ? 1 : ((specimen_b.locality > specimen_a.locality) ? -1 : 0)
            }
            else if (sortBy === 'Collection Date') {
                return (specimen_a.date_collected > specimen_b.date_collected) ? 1 : ((specimen_b.date_collected > specimen_a.date_collected) ? -1 : 0)
            }
            else if (sortBy === 'Rack #') {
                return (specimen_a.id > specimen_b.id) ? 1 : ((specimen_b.id > specimen_a.id) ? -1 : 0)
            }
            else {
                return 0
            }
        })
        .map(specimen => {
            return (
                // <tr key={specimen.id}>
                //     <td onClick={() => selectedUpdate(specimen)}>
                //         <i >{specimen.genus} {specimen.species}</i>
                //     </td>
                // </tr>
                <Table.Row key={specimen.id} onClick={() => selectedUpdate(specimen)}>
                    <Table.Cell>{specimen.id}</Table.Cell>
                    <Table.Cell>{specimen.superfamily}</Table.Cell>
                    <Table.Cell>{specimen.family}</Table.Cell>
                    <Table.Cell>{specimen.genus}</Table.Cell>
                    <Table.Cell>{specimen.species}</Table.Cell>
                    <Table.Cell>{specimen.locality}</Table.Cell>
                    <Table.Cell>{specimen.id}</Table.Cell>
                </Table.Row>
            )
        })

        return (
            // <div>{collectionList}</div>
                <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>LEP #</Table.HeaderCell>
                        <Table.HeaderCell>Superfamily</Table.HeaderCell>
                        <Table.HeaderCell>Family</Table.HeaderCell>
                        <Table.HeaderCell>Genus</Table.HeaderCell>
                        <Table.HeaderCell>Species</Table.HeaderCell>
                        <Table.HeaderCell>Locality</Table.HeaderCell>
                        <Table.HeaderCell>Rack #</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                    
                <Table.Body>
                    {collectionList}
                </Table.Body>
            </Table>
        )
}