export function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user,
    userData: state.userData,
    filteredText: state.filteredText,
    filterCategory: state.filterCategory,
    selectedSpecimen: state.selectedSpecimen,
    sortBy: state.sortBy,
    data: state.data,
    displayed: state.displayed,
    userInterface: state.userInterface,
    visualizationConfig: state.visualizationConfig,
    countQueryCount: state.countQueryCount,
    current_query: state.current_query,
    query_headers: state.query_headers,
    errorMessages: state.errorMessages,
    loading: state.loading,
    refreshing: state.refreshing,
    notifications: state.notifications,
    hasUnread: state.hasUnread,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    changeUserInterface: (newInterface) =>
      dispatch({ type: "CHANGE_INTERFACE", newInterface: newInterface }),
    refreshList: () => dispatch({ type: "REFRESH_LIST" }),
    updateChartConfigChartType: (newChart) =>
      dispatch({ type: "UPDATE_CHART_TYPE", newChart }),
    updateChartConfigChartHeaders: (newHeaders) =>
      dispatch({ type: "UPDATE_CHART_HEADERS", newHeaders }),
    generateChartConfig: (finalizedConfig) =>
      dispatch({ type: "CREATE_CHART_CONFIG", finalizedConfig }),
    updateQueryData: (data) =>
      dispatch({ type: "UPDATE_QUERY_DATA", data: data }),
    updateQuery: (current_query) =>
      dispatch({ type: "UPDATE_CURRENT_QUERY", current_query: current_query }),
    updateDisplayData: (display_data) =>
      dispatch({ type: "UPDATE_DISPLAY_DATA", display_data: display_data }),
    updateHeaders: (headers) =>
      dispatch({ type: "UPDATE_QUERY_HEADERS", headers: headers }),
    updateCountQueryCount: (newCount) =>
      dispatch({ type: "UPDATE_COUNT_QUERY_COUNT", newCount: newCount }),
    clearQuery: () => dispatch({ type: "CLEAR_CURRENT_QUERY" }),
    updateFilteredText: (value) =>
      dispatch({ type: "UPDATE_FILTER_TEXT", value: value }),
    updateFilteredCategory: (value) =>
      dispatch({ type: "UPDATE_FILTER_CATEGORY", filterCategory: value }),
    updateSelectedSpecimen: (selectedSpecimen) =>
      dispatch({
        type: "UPDATE_SELECTED_SPECIMEN",
        selectedSpecimen: selectedSpecimen,
      }),
    updateSelectErrorMessage: (selectError) =>
      dispatch({ type: "UPDATE_SELECT_ERROR_LOG", selectError: selectError }),
    updateManualInsertErrorMessage: (manualInsert) =>
      dispatch({
        type: "UPDATE_MANUAL_INSERT_ERROR_LOG",
        manualInsert: manualInsert,
      }),
    updateCSVInsertErrorMessage: (csvInsert) =>
      dispatch({
        type: "UPDATE_CSV_INSERT_ERROR_LOG",
        csvInsert: csvInsert,
      }),
    updateCountErrorMessage: (countError) =>
      dispatch({ type: "UPDATE_COUNT_ERROR_LOG", countError: countError }),
    updateUpdateErrorMessage: (updateError) =>
      dispatch({ type: "UPDATE_UPDATE_ERROR_LOG", updateError: updateError }),
    updateSingleUpdateErrorMessage: (singleUpdate) =>
      dispatch({
        type: "UPDATE_SINGLE_UPDATE_ERROR_LOG",
        singleUpdate: singleUpdate,
      }),
    updateGlobalErrorMessage: (globalError) =>
      dispatch({ type: "UPDATE_GLOBAL_ERROR_LOG", globalError: globalError }),
    updateAdminTableErrorMessage: (adminTblError) =>
      dispatch({
        type: "UPDATE_ADMIN_TABLE_ERROR_LOG",
        adminTblError: adminTblError,
      }),
    updateAdminUserErrorMessage: (adminUserError) =>
      dispatch({
        type: "UPDATE_ADMIN_USER_ERROR_LOG",
        adminUserError: adminUserError,
      }),
    createNotification: (notification) =>
      dispatch({ type: "CREATE_NOTIFICATION", notification: notification }),
    deleteNotification: (notificationId) =>
      dispatch({ type: "DELETE_NOTIFICATION", notificationId: notificationId }),
    clearNotifications: () => dispatch({ type: "CLEAR_NOTIFICATIONS" }),
    setReadNotifications: (hasUnread) =>
      dispatch({ type: "SET_READ_NOTIFICATIONS", hasUnread: hasUnread }),
    updateLoadingStatus: (loadingStatus) =>
      dispatch({ type: "UPDATE_LOADING_STATUS", loadingStatus: loadingStatus }),
    updateRefreshStatus: (refreshStatus) =>
      dispatch({ type: "UPDATE_REFRESH_STATUS", refreshStatus: refreshStatus }),
    changeUser: (newUser) =>
      dispatch({ type: "CHANGE_USER", newUser: newUser }),
    setAuth: (authed) => dispatch({ type: "SET_AUTH", authed: authed }),
    login: (newUser) => dispatch({ type: "LOGIN", newUser: newUser }),
    setUserData: (userData) =>
      dispatch({ type: "SET_USER_DATA", userData: userData }),
    logout: () => dispatch({ type: "LOGOUT" }),
  };
}
