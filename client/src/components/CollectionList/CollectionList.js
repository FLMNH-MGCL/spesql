import React from 'react'
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
                <tr key={specimen.id}>
                    <td onClick={() => selectedUpdate(specimen)}>
                        <i >{specimen.genus} {specimen.species}</i>
                    </td>
                </tr>
            )
        })

        return (
            <div>{collectionList}</div>
        )
}