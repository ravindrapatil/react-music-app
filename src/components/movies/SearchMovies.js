import React, { useEffect, useState } from 'react';
import themoviedb from '../../apis/themoviedb';
import {
    InputBase,
    Button,
    CircularProgress
} from '@material-ui/core/';
import { useDebounce } from 'use-debounce';
import MovieCard from './MovieCard';

function SearchMovies(props) {
    const [moviesState, setmoviesState] = useState({
        movies: [],
        total_pages: null,
        page_num: 1,
        query: props.match.params.query,
        loading: false
    });
    const [loading, setloading] = useState(false);

    const { movies, total_pages, page_num, query } = moviesState;

    const [text, setText] = useState(props.match.params.query);
    const [debouncedText] = useDebounce(text, 1000);

    useEffect(() => {
        setmoviesState({
            ...moviesState, page_num: 1, query: debouncedText
        });
    }, [debouncedText]);

    useEffect(() => {
        makeSearchApiCall(query, page_num);
    }, [query]);

    const handleOnChange = (e) => {
        if (e.target.value.length === 0) {
            props.history.goBack()
        } else {
            setText(e.target.value);
        }
    }

    const makeSearchApiCall = async (searchQuery, page_num) => {
        setloading(true);
        debugger;
        const searchResult = await themoviedb.getSearchMovies(searchQuery, page_num);
        if (searchResult && searchResult.data && searchResult.data.results.length) {
            setmoviesState({
                ...moviesState, movies: searchResult, total_pages: searchResult.data.total_pages
            });
            setloading(false);
        } else {
            setloading(false);
            setmoviesState({
                ...moviesState, movies: [], total_pages: searchResult.data.total_pages
            })
        }
    }

    const nextPage = () => {
        if (movies && page_num < total_pages) {
            setmoviesState({
                ...moviesState,
                page_num: moviesState.page_num += 1
            });
            makeSearchApiCall(moviesState.query, moviesState.page_num);
        }
    };

    const previousPage = () => {
        if (movies && movies.data.results.length && page_num !== 1) {
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
                        value={text}
                    />
                </form>
            </div>
            <div>
                {
                    loading ?
                        <div style={{ margin: '30px auto', textAlign: 'center' }}><CircularProgress size={50} /></div>
                        :
                        movies &&
                        <>
                            <MovieCard movies={movies} />
                            {
                                total_pages > 1 && <div style={{ margin: '20px auto', textAlign: 'center' }}>
                                    <Button onClick={() => previousPage()} variant="outlined" size="small" color="primary">
                                        Previous
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button onClick={() => nextPage()} variant="outlined" size="small" color="primary">
                                        Next
                                    </Button>
                                </div>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default SearchMovies
