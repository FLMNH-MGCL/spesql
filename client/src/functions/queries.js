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

    return ret
}

export async function runUpdateQuery(query) {
    let data = {command: query}

    const ret = await axios.post('/api/update/', data)
    .then(response => {
        const data = response
        return data
    })

    console.log(ret)

    return ret
}


export async function currentUser() {
    const response = await axios.get('/api/fetchCurrentUser/')
    // console.log(response)
    if (response.data.success === false) {
        console.log('err')
        return null
    }
    else {
        const currentUser = response.data.currentUser
        // console.log(currentUser)
        return currentUser
    }
}