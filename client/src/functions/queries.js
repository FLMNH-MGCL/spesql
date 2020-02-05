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

export async function runCountQuery(query) {
    let data = { command: query}

    const ret = await axios.post('/api/select-count/', data)
    .then(response => {
        const countData = response.data
        return countData
    })

    console.log(ret)
    return ret
}