import {
    QUERY_TERM, START_FETCH, FETCH_SUCCESS, FETCH_ERROR,
    STOCK_ADDED, STOCK_REMOVED, START_STOCKNEWS_FETCH,
    FETCH_STOCKNEWS_SUCCESS,
    FETCH_STOCKNEWS_ERROR, FETCH_COMPANY_INFO_SUCCESS,
    FETCH_HISTORIC_STOCK_SUCCESS
} from './stocksTypes'

const favStockList = [
    {
        "value": "INFY",
        "name": "Infosys Ltd.",
        "exchange": "NSE"
    },
    {
        value: 'ADANIENT',
        name: 'Adani Enterprises Ltd.',
        exchange: 'NSE'
    },
    {
        value: 'ADANIPOWER',
        name: 'Adani Power Ltd.',
        exchange: 'NSE'
    },
    {
        "value": "YESBANK",
        "name": "Yes Bank Ltd.",
        "exchange": "NSE"
    },
    {
        "value": "IRCTC",
        "name": "Indian Railway Catering & Tourism Corporation Ltd.",
        "exchange": "NSE"
    }
]

const initialState = {
    data: {},
    queryTerm: '',
    isFetching: false,
    error: {},
    activeStock: '',
    modalMessage: {},
    favStockList: favStockList,
    selectedStock: {},
    selectedStockNews: {},
    selectedStockCompany: {},
    historicData: {}
}

const stocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUERY_TERM:
            return {
                ...state,
                data: {}
            }
        case STOCK_ADDED:
            return {
                ...state,
                favStockList: [...state.favStockList, action.payload.favStockList]
            }
        case STOCK_REMOVED:
            return {
                ...state,
                favStockList: state.favStockList.filter(item => item.value !== action.payload.favStockList.value)
            }
        case START_FETCH:
            return {
                ...state,
                queryTerm: action.payload.queryTerm,
                isFetching: action.payload.isFetching
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                isFetching: action.payload.isFetching
            }
        case FETCH_ERROR:
            return {
                ...state,
                error: action.payload.error,
                isFetching: action.payload.isFetching
            }
        case START_STOCKNEWS_FETCH:
            return {
                ...state,
                isFetching: action.payload.isFetching
            }
        case FETCH_STOCKNEWS_SUCCESS:
            return {
                ...state,
                selectedStockNews: action.payload.selectedStockNews,
                isFetching: action.payload.isFetching
            }
        case FETCH_STOCKNEWS_ERROR:
            return {
                ...state,
                error: action.payload.error,
                isFetching: action.payload.isFetching
            }
        case FETCH_COMPANY_INFO_SUCCESS:
            return {
                ...state,
                selectedStockCompany: action.payload.selectedStockCompany,
                isFetching: action.payload.isFetching
            }
        case FETCH_HISTORIC_STOCK_SUCCESS:
            return {
                ...state,
                historicData: action.payload.historicData,
                isFetching: action.payload.isFetching
            }

        default:
            return state;
    }
}

export default stocksReducer