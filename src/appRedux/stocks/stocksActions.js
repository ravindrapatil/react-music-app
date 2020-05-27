import axios from 'axios';
import {
    QUERY_TERM,
    START_FETCH,
    FETCH_SUCCESS,
    FETCH_ERROR,
    STOCK_ADDED,
    STOCK_REMOVED,
    START_STOCKNEWS_FETCH,
    FETCH_STOCKNEWS_SUCCESS,
    FETCH_STOCKNEWS_ERROR,
    FETCH_COMPANY_INFO_SUCCESS,
    FETCH_HISTORIC_STOCK_SUCCESS,
    START_SEARCH_STOCKS_FETCH
} from './stocksTypes'

export const querying = () => {
    return {
        type: QUERY_TERM
    }
}

export const stockAdded = (stock) => {
    return {
        type: STOCK_ADDED,
        payload: { favStockList: stock }
    }
}

export const removeStockFav = (stock) => {
    return {
        type: STOCK_REMOVED,
        payload: { favStockList: stock }
    }
}

export const startFetch = (queryTerm) => {
    return {
        type: START_FETCH,
        payload: { queryTerm, isFetching: true }
    }
}

export const fetchSuccess = (data) => {
    return {
        type: FETCH_SUCCESS,
        payload: { data, isFetching: false, isSearchFetching: false }
    }
}

export const fetchError = (error) => {
    return {
        type: FETCH_ERROR,
        payload: { error, isFetching: false }
    }
}

export const startFetchStockNews = () => {
    return {
        type: START_STOCKNEWS_FETCH,
        payload: { isFetching: true }
    }
}

export const fetchStockNewsSuccess = (data) => {
    return {
        type: FETCH_STOCKNEWS_SUCCESS,
        payload: { isFetching: false, selectedStockNews: data }
    }
}

export const fetchStockNewsError = (error) => {
    return {
        type: FETCH_STOCKNEWS_ERROR,
        payload: { isFetching: false, error }
    }
}

export const fetchCompanyInfoSuccess = (data) => {
    return {
        type: FETCH_COMPANY_INFO_SUCCESS,
        payload: { isFetching: false, selectedStockCompany: data }
    }
}

export const fetchHistoricDataSuccess = (data) => {
    return {
        type: FETCH_HISTORIC_STOCK_SUCCESS,
        payload: { isFetching: false, historicData: data }
    }
}

export const startSearchFetching = () => {
    return {
        type: START_SEARCH_STOCKS_FETCH,
        payload: { isSearchFetching: true }
    }
}

export const fetchStocks = (query) => {
    const url = `https://api.stockdio.com/freedata/financial/info/v1/getsymbols?app-key=4662E30B3D4949FEA48CD62D0EDEBADB&query=${query}&exchange=NSE&includecolumnnames=false`;
    return (dispatch) => {
        dispatch(startSearchFetching(query));
        axios.get(url)
            .then(res => {
                dispatch(fetchSuccess(res.data.data.Symbols))
            })
            .catch(error => {
                dispatch(fetchError(error));
            })
    }
}

export const fetchStockNews = (stock) => {
    const url = `https://api.stockdio.com/data/financial/info/v1/getNewsEx/?app-key=4662E30B3D4949FEA48CD62D0EDEBADB&symbol=${stock.value}&stockExchange=nse&includeImages=true&includeDescriptions=false&includeRelated=true&nItems=10&culture=english-us`;
    return (dispatch) => {
        dispatch(startFetchStockNews());
        axios.get(url)
            .then(res => {
                dispatch(fetchStockNewsSuccess(res.data.data))
            })
            .catch(error => {
                dispatch(fetchStockNewsError(error));
            })
    }
}

export const fetchStockCompanyInfo = (item) => {
    const url = `https://api.stockdio.com/data/financial/info/v1/GetCompanyInfo?app-key=4662E30B3D4949FEA48CD62D0EDEBADB&stockExchange=NSE&symbol=${item.value}`;
    return (dispatch) => {
        dispatch(startFetchStockNews());
        axios.get(url)
            .then(res => {
                dispatch(fetchCompanyInfoSuccess(res.data))
            })
            .catch(error => {
                dispatch(fetchError(error));
            })
    }
}

export const fetchHistoricStockData = (item) => {
    return (dispatch) => {
        const url = `https://api.stockdio.com/data/financial/prices/v1/GetHistoricalPrices?app-key=4662E30B3D4949FEA48CD62D0EDEBADB&stockExchange=NSE&symbol=${item.value}&from=2017-5-24&to=2020-5-24`
        dispatch(startFetchStockNews());
        axios.get(url)
            .then(res => {
                dispatch(fetchHistoricDataSuccess(res.data.data))
            })
            .catch(error => {
                dispatch(fetchError(error));
            })
    }
}
