import React from 'react'
import { Table } from 'semantic-ui-react'
//import SpecimenCard from './SpecimenCard'

export default ({data, filteredText, selectedUpdate}) => {
    //console.log(data[0].species)
    // change to api call to database
    const collectionList = data
        .filter(specimen => {
            return specimen.species.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
        })
        .map(specimen => {
            return (
                // <tr key={specimen.id}>
                //     <td onClick={() => selectedUpdate(specimen)}>
                //         <i >{specimen.genus} {specimen.species}</i>
                //     </td>
                // </tr>
                <Table.Row key={specimen.id}>
                    <Table.Cell>LEP #</Table.Cell>
                    <Table.Cell>{specimen.genus}</Table.Cell>
                    <Table.Cell>{specimen.species}</Table.Cell>
                </Table.Row>
            )
        })

        return (
            // <div>{collectionList}</div>
                <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>LEP #</Table.HeaderCell>
                        <Table.HeaderCell>Genus</Table.HeaderCell>
                        <Table.HeaderCell>Species</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                    
                <Table.Body>
                    {collectionList}
                </Table.Body>
            </Table>
        )
}