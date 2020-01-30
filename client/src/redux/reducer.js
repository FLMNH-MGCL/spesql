import { runSelectQuery } from '../functions/queries'
import getQueryHeaders from '../functions/getQueryHeaders'

export const REFRESH_LIST = 'REFRESH_LIST'
export const RUN_SELECT_QUERY = 'UPDATE_QUERY_DATA'
export const UPDATE_DISPLAYED_DATA = 'UPDATE_DISPLAY_DATA'
export const UPDATE_QUERY_HEADERS = 'UPDATE_QUERY_HEADERS'
export const CLEAR_CURRENT_QUERY = 'CLEAR_CURRENT_QUERY'
export const UPDATE_CURRENT_QUERY = 'UPDATE_CURRENT_QUERY'
export const UPDATE_FILTER_TEXT = 'UPDATE_FILTER_TEXT'
export const UPDATE_FILTER_CATEGORY = 'UPDATE_FILTER_CATEGORY'
export const UPDATE_SELECTED_SPECIMEN = 'UPDATE_SELECTED_SPECIMEN'
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE'
export const UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS'
export const UPDATE_REFRESH_STATUS = 'UPDATE_REFRESH_STATUS'
export const LOGOUT = 'LOGOUT'

let authenticated = sessionStorage.getItem('authenticated') === "true" ? true : false

const initialState = {
    authenticated: authenticated,
    filteredText: '',
    filterCategory: '',
    selectedSpecimen: undefined,
    data: [],
    displayed: [],
    current_query: '',
    query_headers: [],
    error_message: null,
    loading: false,
    refreshing: false
}

export default function reducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case 'REFRESH_LIST':
            newState.data = state.data
            return newState

        case 'UPDATE_QUERY_DATA':
            let data = action.data
            newState.data = data
            return newState

        case 'UPDATE_DISPLAY_DATA':
            let display_data = action.display_data
            newState.displayed = display_data
            return newState

        case 'UPDATE_CURRENT_QUERY':
            newState.current_query = action.current_query
            sessionStorage.setItem('current_query', action.current_query)
            return newState
        
        case 'CLEAR_CURRENT_QUERY':
            newState = {
                authenticated: state.authenticated,
                filteredText: state.filteredText,
                filterCategory: state.filterCategory,
                selectedSpecimen: undefined,
                data: [],
                displayed: [],
                current_query: '',
                query_headers: [],
                error_message: null,
                loading: false,
                refreshing: false
            }
            sessionStorage.removeItem('current_query')
            return newState

        case 'UPDATE_QUERY_HEADERS':
            newState.query_headers = action.headers
            return newState

        case 'UPDATE_FILTER_TEXT':
            newState.filteredText = action.value
            return newState

        case 'UPDATE_FILTER_CATEGORY':
            newState.filterCategory = action.filterCategory
            return newState

        case 'UPDATE_SELECTED_SPECIMEN':
            newState.selectedSpecimen = action.selectedSpecimen
            return newState

        case 'UPDATE_LOADING_STATUS':
            newState.loading = action.loadingStatus
            return newState

        case 'UPDATE_REFRESH_STATUS':
            newState.refreshing = action.refreshStatus
            return newState

        case 'LOGOUT':
            newState.authenticated = false
            return newState
        
        default:
            return newState
    }
}