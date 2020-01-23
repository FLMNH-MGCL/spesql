import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import './CollectionList.css'
//import SpecimenCard from './SpecimenCard'

// function getHeaders(specimen) {
//     // console.log(specimen)
//     let ret = []
//     if (specimen) {
//         if (specimen.mgcl) { ret.push('MGCL #') }
//         if (specimen.lep_num) { ret.push('Lep #') }
//         if (specimen.order_) { ret.push('Order') }
//         if (specimen.superfamily) { ret.push('Superfamily') }
//         if (specimen.family) { ret.push('Family') }
//         if (specimen.subfamily) { ret.push('Subfamily') }
//         if (specimen.tribe) { ret.push('Tribe') }
//         if (specimen.section) { ret.push('Section') }
//         if (specimen.genus) { ret.push('Genus') }
//         if (specimen.species) { ret.push('Species') }
//         if (specimen.subspecies) { ret.push('Subspecies') }
//         if (specimen.sex) { ret.push('Sex') }
//         if (specimen.country) { ret.push('Country') }
//         if (specimen.province) { ret.push('Province') }
//         if (specimen.locality) { ret.push('Locality') }
//         if (specimen.latitude) { ret.push('Latitude') }
//         if (specimen.longitude) { ret.push('Longitude') }
//     }
//     else {
//         ret = ['LEP #', 'Superfamily', 'Family', 'Genus', 'Species', 'Country', 'Rack #']
//     }
//     return ret
// }

export default ({data, filteredText, filterCategory, selectedUpdate, sortBy, clearQuery, current_query}) => {
    //console.log(data[0].species)

    const collectionList = data
        .filter(specimen => {
            // LARGE SWITCH TO FILTER ITEMS
            if (filterCategory === 'Lep #' && specimen.lep_num) {
                return specimen.lep_num.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else if (filterCategory === 'Superfamily' && specimen.superfamily) {
                return specimen.superfamily.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else if (filterCategory === 'Family' && specimen.family) {
                return specimen.family.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else if (filterCategory === 'Genus' && specimen.genus) {
                return specimen.genus.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else if (filterCategory === 'Species' && specimen.species) {
                return specimen.species.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else if (filterCategory === 'Country' && specimen.country) {
                return specimen.country.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else if (filterCategory === 'Collection Date' && specimen.date_collected) {
                return specimen.date_collected.toLowerCase().indexOf(filteredText.toLowerCase()) >= 0
            }
            else {
                // return specimen.species.toLowerCase().indexOf('') >= 0
                return specimen
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
            else if (sortBy === 'Country') {
                return (specimen_a.country > specimen_b.country) ? 1 : ((specimen_b.country > specimen_a.country) ? -1 : 0)
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
                    <Table.Cell>{specimen.lep_num}</Table.Cell>
                    <Table.Cell>{specimen.superfamily}</Table.Cell>
                    <Table.Cell>{specimen.family}</Table.Cell>
                    <Table.Cell>{specimen.genus}</Table.Cell>
                    <Table.Cell>{specimen.species}</Table.Cell>
                    <Table.Cell>{specimen.country}</Table.Cell>
                    <Table.Cell>{specimen.rack}</Table.Cell>
                </Table.Row>
            )
        })

        // let specimenHeaders = getHeaders(collectionList[0])
        // console.log(specimenHeaders)


        return (
            <React.Fragment>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>LEP #</Table.HeaderCell>
                        <Table.HeaderCell>Superfamily</Table.HeaderCell>
                        <Table.HeaderCell>Family</Table.HeaderCell>
                        <Table.HeaderCell>Genus</Table.HeaderCell>
                        <Table.HeaderCell>Species</Table.HeaderCell>
                        <Table.HeaderCell>Country</Table.HeaderCell>
                        <Table.HeaderCell>Rack #</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                
                <Table.Body>
                    {collectionList}
                </Table.Body>
            </Table>
            <div className='query-info'>
            <Button 
                negative 
                onClick={clearQuery}
                disabled={current_query === '' ? true : false}
            >
                Clear Query
            </Button>
                <div className='query-text'><h4>Current Query:</h4><p>{current_query}</p></div>
            </div>

            
            </React.Fragment>
        )
}

// SCROLLABLE https://codesandbox.io/s/p2pr9zjrvj