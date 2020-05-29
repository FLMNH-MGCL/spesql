export const REFRESH_LIST = "REFRESH_LIST";
export const RUN_SELECT_QUERY = "UPDATE_QUERY_DATA";
export const UPDATE_DISPLAYED_DATA = "UPDATE_DISPLAY_DATA";
export const UPDATE_QUERY_HEADERS = "UPDATE_QUERY_HEADERS";
export const UPDATE_COUNT_QUERY_COUNT = "UPDATE_COUNT_QUERY_COUNT";
export const CLEAR_CURRENT_QUERY = "CLEAR_CURRENT_QUERY";
export const UPDATE_CURRENT_QUERY = "UPDATE_CURRENT_QUERY";
export const UPDATE_FILTER_TEXT = "UPDATE_FILTER_TEXT";
export const UPDATE_FILTER_CATEGORY = "UPDATE_FILTER_CATEGORY";
export const UPDATE_SELECTED_SPECIMEN = "UPDATE_SELECTED_SPECIMEN";

export const UPDATE_CSV_INSERT_ERROR_LOG = "UPDATE_CSV_INSERT_ERROR_LOG";
export const UPDATE_MANUAL_INSERT_ERROR_LOG = "UPDATE_MANUAL_INSERT_ERROR_LOG";
export const UPDATE_SELECT_ERROR_LOG = "UPDATE_SELECT_ERROR_LOG";
export const UPDATE_COUNT_ERROR_LOG = "UPDATE_COUNT_ERROR_LOG";
export const UPDATE_UPDATE_ERROR_LOG = "UPDATE_UPDATE_ERROR_LOG";
export const UPDATE_SINGLE_UPDATE_ERROR_LOG = "UPDATE_SINGLE_UPDATE_ERROR_LOG";

export const UPDATE_LOADING_STATUS = "UPDATE_LOADING_STATUS";
export const UPDATE_REFRESH_STATUS = "UPDATE_REFRESH_STATUS";
export const CHANGE_USER = "CHANGE_USER";
export const SET_USER_DATA = "SET_USER_DATA";
export const SET_AUTH = "SET_AUTH";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const initialState = {
  authenticated: false,
  user: "guest",
  userData: undefined,
  filteredText: "",
  filterCategory: "*",
  selectedSpecimen: undefined,
  data: [],
  displayed: [],
  current_query: "",
  query_headers: [],
  countQuerycount: undefined,
  errorMessages: {
    manualInsert: null,
    csvInsert: null,
    selectError: null,
    countError: null,
    updateError: null,
    singleUpdate: null,
  },
  loading: false,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case "REFRESH_LIST":
      newState.data = state.data;
      return newState;

    case "UPDATE_QUERY_DATA":
      let data = action.data;
      newState.data = data;
      return newState;

    case "UPDATE_DISPLAY_DATA":
      let display_data = action.display_data;
      newState.displayed = display_data;
      return newState;

    case "UPDATE_CURRENT_QUERY":
      newState.current_query = action.current_query;
      sessionStorage.setItem("current_query", action.current_query);
      return newState;

    case "CLEAR_CURRENT_QUERY":
      newState = {
        authenticated: state.authenticated,
        user: state.user,
        userData: state.userData,
        filteredText: state.filteredText,
        filterCategory: state.filterCategory,
        selectedSpecimen: undefined,
        data: [],
        displayed: [],
        current_query: "",
        query_headers: [],
        countQueryCount: undefined,
        errorMessages: {
          manualInsert: null,
          csvInsert: null,
          selectError: null,
          countError: null,
          updateError: null,
          singleUpdate: null,
        },
        loading: false,
        refreshing: false,
      };
      sessionStorage.removeItem("current_query");
      return newState;

    case "UPDATE_QUERY_HEADERS":
      newState.query_headers = action.headers;
      return newState;

    case "UPDATE_COUNT_QUERY_COUNT":
      newState.countQueryCount = action.newCount;
      return newState;

    case "UPDATE_FILTER_TEXT":
      newState.filteredText = action.value;
      return newState;

    case "UPDATE_FILTER_CATEGORY":
      newState.filterCategory = action.filterCategory;
      return newState;

    case "UPDATE_SELECTED_SPECIMEN":
      newState.selectedSpecimen = action.selectedSpecimen;
      return newState;

    case "UPDATE_MANUAL_INSERT_ERROR_LOG":
      newState.errorMessages = {
        manualInsert: action.manualInsert,
        csvInsert: state.csvInsert,
        selectError: state.selectError,
        countError: state.countError,
        updateError: state.updateError,
        singleUpdate: state.singleUpdate,
      };
      return newState;

    case "UPDATE_CSV_INSERT_ERROR_LOG":
      newState.errorMessages = {
        manualInsert: state.manualInsert,
        csvInsert: action.csvInsert,
        selectError: state.selectError,
        countError: state.countError,
        updateError: state.updateError,
        singleUpdate: state.singleUpdate,
      };
      return newState;

    case "UPDATE_SELECT_ERROR_LOG":
      newState.errorMessages = {
        manualInsert: state.manualInsert,
        csvInsert: state.csvInsert,
        selectError: action.selectError,
        countError: state.countError,
        updateError: state.updateError,
        singleUpdate: state.singleUpdate,
      };

      return newState;

    case "UPDATE_COUNT_ERROR_LOG":
      newState.errorMessages = {
        manualInsert: state.manualInsert,
        csvInsert: state.csvInsert,
        selectError: state.selectError,
        countError: action.countError,
        updateError: state.updateError,
        singleUpdate: state.singleUpdate,
      };
      return newState;

    case "UPDATE_UPDATE_ERROR_LOG":
      newState.errorMessages = {
        manualInsert: state.manualInsert,
        csvInsert: state.csvInsert,
        selectError: state.selectError,
        countError: state.countError,
        updateError: action.updateError,
        singleUpdate: state.singleUpdate,
      };

      return newState;

    case "UPDATE_SINGLE_UPDATE_ERROR_LOG":
      newState.errorMessages = {
        manualInsert: state.manualInsert,
        csvInsert: state.csvInsert,
        selectError: state.selectError,
        countError: state.countError,
        updateError: state.updateError,
        singleUpdate: action.singleUpdate,
      };
      return newState;

    case "UPDATE_LOADING_STATUS":
      newState.loading = action.loadingStatus;
      return newState;

    case "UPDATE_REFRESH_STATUS":
      newState.refreshing = action.refreshStatus;
      return newState;

    case "CHANGE_USER":
      newState.user = action.newUser;
      return newState;

    case "SET_USER_DATA":
      newState.userData = action.userData;
      return newState;

    case "SET_AUTH":
      newState.authenticated = action.authed;
      return newState;

    case "LOGIN":
      newState.user = action.newUser;
      return newState;

    case "LOGOUT":
      newState.authenticated = false;
      return newState;

    default:
      return newState;
  }
}
