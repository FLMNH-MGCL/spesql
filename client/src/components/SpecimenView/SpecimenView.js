import React from 'react'

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
                <div>
                    <p>Genus: {selectedSpecimen.genus}</p>
                    <p>species: {selectedSpecimen.species}</p>
                    <p>Collected: {selectedSpecimen.dateCollected}</p>
                    <p>Locality: {selectedSpecimen.locality}</p>
                </div>
            )
        }
    }

}

export default SpecimenView