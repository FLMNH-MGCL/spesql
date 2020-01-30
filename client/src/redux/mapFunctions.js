export function mapStateToProps(state) {
    return {
        authenticated: state.authenticated,
        filteredText: state.filteredText,
        filterCategory: state.filterCategory,
        selectedSpecimen: state.selectedSpecimen,
        sortBy: state.sortBy,
        data: state.data,
        displayed: state.displayed,
        current_query: state.current_query,
        query_headers: state.query_headers,
        error_message: state.error_message,
        loading: state.loading
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        refreshList: () => dispatch({type: 'REFRESH_LIST'}),
        updateQueryData: (data) => dispatch({type: 'UPDATE_QUERY_DATA', data: data}),
        updateQuery: (current_query) => dispatch({type: 'UPDATE_CURRENT_QUERY', current_query: current_query}),
        updateDisplayData: (display_data) => dispatch({type: 'UPDATE_DISPLAY_DATA', display_data: display_data}),
        updateHeaders: (headers) => dispatch({type: 'UPDATE_QUERY_HEADERS', headers: headers}),
        clearQuery: () => dispatch({type: 'CLEAR_CURRENT_QUERY'}),
        updateFilteredText: (value) => dispatch({type: 'UPDATE_FILTER_TEXT', value: value}),
        updateFilteredCategory: (value) => dispatch({type: 'UPDATE_FILTER_CATEGORY', filterCategory: value}),
        updateSelectedSpecimen: (selectedSpecimen) => dispatch({type: 'UPDATE_SELECTED_SPECIMEN', selectedSpecimen: selectedSpecimen}),
        updateLoadingStatus: (loadingStatus) => dispatch({type: 'UPDATE_LOADING_STATUS', loadingStatus: loadingStatus}),
        logout: () => dispatch({type: 'LOGOUT'}),
    }
}