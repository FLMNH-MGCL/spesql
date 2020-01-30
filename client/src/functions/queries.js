import React from 'react'
import axios from 'axios'

export async function runSelectQuery(query) {
    //sessionStorage.setItem('current_query', query)

    let data = { command: query}
    const ret = await axios.post('/api/fetch/', data)
    .then(response => {
        const data = response.data
        return data
    })

    return ret

}