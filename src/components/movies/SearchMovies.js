import React, { useEffect, useState } from 'react';
import themoviedb from '../../apis/themoviedb';
import {
    InputBase
} from '@material-ui/core/';
import MovieCard from './MovieCard';

function SearchMovies(props) {
    const [searchQuery, setSearchQuery] = useState();
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setSearchQuery(props.match.params.query);
        makeSearchApiCall(searchQuery);
    }, [props]);

    // const setParams = (query) => {
    //     const searchParams = new URLSearchParams();
    //     searchParams.set("", query || "");
    //     return searchParams.toString();
    // }

    const handleOnChange = (e) => {
        setSearchQuery(e.target.value);
        makeSearchApiCall(searchQuery);
        // const url =  setParams(searchQuery);
        // props.history.replace(`/searchmovies/${url}`);

        if (e.target.value.length === 0) {
            props.history.goBack()
        }
    }

    // useEffect(() => {
    //     props.history.push(`${searchQuery}`);
    // }, []);

    const makeSearchApiCall = async (searchQuery) => {
        const searchResult = await themoviedb.getSearchMovies(searchQuery);
        // setSearchResult(searchResult.data.results);
        if(searchResult && searchResult.data && searchResult.data.results.length) {
            setSearchResult(searchResult.data.results);
        }
        console.log(searchResult);
        
    }

    // useEffect(() => {
    //     console.log(searchQuery);
    //     makeSearchApiCall(searchQuery);
    // }, [searchQuery])

    console.log(searchQuery);

    return (
        <div>
            <div>
                <form className="searchForm searchInputForm" noValidate autoComplete="off">
                    <InputBase
                        fullWidth
                        placeholder="Search..."
                        autoFocus
                        onChange={(e) => handleOnChange(e)}
                        value={searchQuery}
                    />
                </form>
            </div>
            <div>
                {
                    searchResult && <MovieCard movies={searchResult} />
                }
            </div>
        </div>
    )
}

export default SearchMovies
