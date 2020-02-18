import { runSelectQuery } from '../functions/queries'
import getQueryHeaders from '../functions/getQueryHeaders'

export const REFRESH_LIST = 'REFRESH_LIST'
export const RUN_SELECT_QUERY = 'UPDATE_QUERY_DATA'
export const UPDATE_DISPLAYED_DATA = 'UPDATE_DISPLAY_DATA'
export const UPDATE_QUERY_HEADERS = 'UPDATE_QUERY_HEADERS'
export const UPDATE_COUNT_QUERY_COUNT = 'UPDATE_COUNT_QUERY_COUNT'
export const CLEAR_CURRENT_QUERY = 'CLEAR_CURRENT_QUERY'
export const UPDATE_CURRENT_QUERY = 'UPDATE_CURRENT_QUERY'
export const UPDATE_FILTER_TEXT = 'UPDATE_FILTER_TEXT'
export const UPDATE_FILTER_CATEGORY = 'UPDATE_FILTER_CATEGORY'
export const UPDATE_SELECTED_SPECIMEN = 'UPDATE_SELECTED_SPECIMEN'

export const UPDATE_INSERT_ERROR_LOG = 'UPDATE_INSERT_ERROR_LOG'
export const UPDATE_SELECT_ERROR_LOG = 'UPDATE_SELECT_ERROR_LOG'
export const UPDATE_COUNT_ERROR_LOG = 'UPDATE_COUNT_ERROR_LOG'
export const UPDATE_UPDATE_ERROR_LOG = 'UPDATE_UPDATE_ERROR_LOG'

export const UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS'
export const UPDATE_REFRESH_STATUS = 'UPDATE_REFRESH_STATUS'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

let authenticated = sessionStorage.getItem('authenticated') === "true" ? true : false

const initialState = {
    authenticated: authenticated,
    user: 'root',
    filteredText: '',
    filterCategory: '',
    selectedSpecimen: undefined,
    data: [],
    displayed: [],
    current_query: '',
    query_headers: [],
    countQuerycount: null,
    errorMessages: {
        insertError: null,
        selectError: null,
        countError: null,
        updateError: null
    },
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
                user: state.user,
                filteredText: state.filteredText,
                filterCategory: state.filterCategory,
                selectedSpecimen: undefined,
                data: [],
                displayed: [],
                current_query: '',
                query_headers: [],
                countQueryCount: null,
                errorMessages: {
                    insertError: null,
                    selectError: null,
                    countError: null,
                    updateError: null
                },
                loading: false,
                refreshing: false
            }
            sessionStorage.removeItem('current_query')
            return newState

        case 'UPDATE_QUERY_HEADERS':
            newState.query_headers = action.headers
            return newState

        case 'UPDATE_COUNT_QUERY_COUNT':
            newState.countQueryCount = action.newCount
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

        case 'UPDATE_INSERT_ERROR_LOG':
            newState.errorMessages.insertError = action.insertError
            return newState

        case 'UPDATE_SELECT_ERROR_LOG':
            let newErrorMessages = {
                insertError: state.errorMessages.insertError,
                selectError: action.selectError,
                countError: state.errorMessages.countError,
                updateError: state.errorMessages.updateError,
            }
            newState.errorMessages = newErrorMessages
            return newState

        case 'UPDATE_COUNT_ERROR_LOG':
                newState.errorMessages.countError = action.countError
                return newState

        case 'UPDATE_UPDATE_ERROR_LOG':
                newState.errorMessages.updateError = action.updateError
                return newState

        case 'UPDATE_LOADING_STATUS':
            newState.loading = action.loadingStatus
            return newState

        case 'UPDATE_REFRESH_STATUS':
            newState.refreshing = action.refreshStatus
            return newState

        case 'LOGIN':
            newState.user = action.newUser
            return newState

        case 'LOGOUT':
            newState.authenticated = false
            return newState
        
        default:
            return newState
    }
}