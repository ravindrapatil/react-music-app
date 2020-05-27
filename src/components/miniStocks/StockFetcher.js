import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchStocks, querying } from '../../appRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import {
    InputBase,
    List,
    CircularProgress
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import PopoverContent from './PopoverContent';
import useOutsideClick from "../../components/useOutsideClick";
import { fetchStockNews, fetchStockCompanyInfo, fetchHistoricStockData, getCurrentStockPrice } from '../../appRedux';

function StockFetcher({ getSelectedStockNews, companyInfo, historicData, isSearchFetching, getcurrentPrice }) {
    const ref = useRef();
    const dispatch = useDispatch();
    const stocks = useSelector(state => state.stocks);
    const { data, favStockList } = stocks;

    const initialState = {
        query: '',
        listHover: false
    }
    const [state, setstate] = useState(initialState);
    const { query } = state;
    const [debouncedText] = useDebounce(query, 1000);

    const [show, showSetSate] = useState(false);

    useEffect(() => {
        console.log('yes ----- ');
        const initialStock = {
            "value": "INFY",
            "name": "Infosys Ltd.",
            "exchange": "NSE"
        }
        getSelectedStockNews(initialStock);
        companyInfo(initialStock);
        historicData(initialStock);
        getcurrentPrice(initialStock);
    }, [])

    useOutsideClick(ref, () => {
        if (show) {
            showSetSate(false);
            setstate({
                ...state,
                query: ''
            })
        };
    });

    const handleSearch = (e) => {
        setstate({
            ...state,
            query: e.target.value
        })
        showSetSate(false)
    }

    useEffect(() => {
        if (debouncedText !== '') {
            dispatch(fetchStocks(debouncedText));
            showSetSate(!show)
        } else {
            dispatch(querying())
        }
    }, [debouncedText]);

    return (
        <div className="stockSearch">
            <div style={{ display: 'flex', justifyContent: 'left', border: '1px solid #bbbcc1', borderRadius: '4px' }}>
                <div style={{ margin: '5px 0 0 5px' }}>
                    <SearchIcon style={{ color: '#3f51b5' }} />
                </div>
                <InputBase style={{ width: '100%', fontSize: '13px' }}
                    placeholder="Search by symbol"
                    value={query}
                    name="query"
                    id="search-input"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearch}
                />
            </div>
            {
                isSearchFetching ? <div className="loading"><CircularProgress size={30} /></div>
                    :
                    show && (<div ref={ref} className="searchResultHolder">
                        <List>
                            {
                                data && data.length > 0 ? data.map((item) => {
                                    return <PopoverContent key={item.value} item={item} />
                                }) : <span style={{
                                    display: 'block', textAlign: 'center',
                                    fontSize: '13px'
                                }}>No stock found</span>
                            }
                        </List>
                    </div>)
            }
            {
                favStockList && favStockList.length ?
                    <div>
                        <List>
                            {
                                favStockList.map(item => {
                                    return <PopoverContent key={item.value} item={item} showHideBtns={true} />
                                })
                            }
                        </List>
                    </div> : ''
            }
        </div >
    )
}

const mapStateToProps = state => {
    return {
        isSearchFetching: state.stocks.isSearchFetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSelectedStockNews: (item) => dispatch(fetchStockNews(item)),
        companyInfo: (item) => dispatch(fetchStockCompanyInfo(item)),
        historicData: (item) => dispatch(fetchHistoricStockData(item)),
        getcurrentPrice: (item) => dispatch(getCurrentStockPrice(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockFetcher)
