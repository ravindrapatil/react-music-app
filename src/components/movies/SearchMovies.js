import React, { useEffect, useState } from 'react';
import themoviedb from '../../apis/themoviedb';
import {
    InputBase,
    Button
} from '@material-ui/core/';
import MovieCard from './MovieCard';

function SearchMovies(props) {
    const [moviesState, setmoviesState] = useState({
        movies: [],
        total_pages: null,
        page_num: 1,
        query: props.match.params.query
    });

    useEffect(() => {
        setmoviesState({
            ...moviesState, page_num: 1
        });
        makeSearchApiCall(moviesState.query, moviesState.page_num);
    }, [moviesState.query])

    const handleOnChange = (e) => {
        setmoviesState({
            ...moviesState,
            page_num: 1,
            query: e.target.value
        });
        if (e.target.value.length === 0) {
            props.history.goBack()
        }
    }

    const makeSearchApiCall = async (searchQuery, page_num) => {
        const searchResult = await themoviedb.getSearchMovies(searchQuery, page_num);
        if (searchResult && searchResult.data && searchResult.data.results.length) {
            setmoviesState({
                ...moviesState, movies: searchResult, total_pages: searchResult.data.total_pages
            })
        }
    }

    const nextPage = () => {
        if (moviesState.movies && moviesState.page_num < moviesState.total_pages) {
            setmoviesState({
                ...moviesState,
                page_num: moviesState.page_num += 1
            });
            makeSearchApiCall(moviesState.query, moviesState.page_num);
        }
    };

    const previousPage = () => {
        if (moviesState.movies && moviesState.movies.data.results.length && moviesState.page_num !== 1) {
            setmoviesState({
                ...moviesState,
                page_num: moviesState.page_num -= 1
            });
            makeSearchApiCall(moviesState.query, moviesState.page_num);
        }
    }

    return (
        <div>
            <div>
                <form className="searchForm searchInputForm" noValidate autoComplete="off">
                    <InputBase
                        fullWidth
                        placeholder="Search..."
                        autoFocus
                        onChange={(e) => handleOnChange(e)}
                        value={moviesState.query}
                    />
                </form>
            </div>
            <div>
                {
                    moviesState.movies && <>
                        <MovieCard movies={moviesState.movies} />
                        <div style={{ margin: '20px auto', textAlign: 'center' }}>
                            <Button onClick={() => previousPage()} variant="outlined" size="small" color="primary">
                                Previous
                            </Button>
                            &nbsp;&nbsp;
                            <Button onClick={() => nextPage()} variant="outlined" size="small" color="primary">
                                Next
                            </Button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default SearchMovies
