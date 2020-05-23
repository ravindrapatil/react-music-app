import React, { useEffect, useState, useRef } from 'react';
import { fetchStocks, querying } from '../../appRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import {
    InputBase,
    List
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import PopoverContent from './PopoverContent';
import useOutsideClick from "../../components/useOutsideClick";

function StockFetcher() {
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
            <div style={{ display: 'flex', justifyContent: 'left' }}>
                <div style={{ marginTop: '5px' }}>
                    <SearchIcon />
                </div>
                <InputBase style={{ width: '100%', fontSize: '13px' }}
                    placeholder="Search by symbol. eg: AAPL, FB, ..."
                    value={query}
                    name="query"
                    id="search-input"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearch}
                />
            </div>
            {
                show && (<div ref={ref} className="searchResultHolder">
                    <List>
                        {
                            data && data.length ? data.map(item => {
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
        </div>
    )
}

export default StockFetcher
