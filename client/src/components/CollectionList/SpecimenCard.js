import React from 'react'

export default ({specimen}) => {
    return (
        <div className='specimen-card'>
            <i>{specimen.genus} {specimen.species}</i>
        </div>
    )
}