import React from 'react'
import Home from './Home'
import reducer from '../../redux/reducer';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(reducer)

export default function HomeWrapper() {
    return (
        <Provider store={store}><Home /></Provider>
    )
}