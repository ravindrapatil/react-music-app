import React, { useEffect, useState } from 'react';
import themoviedb from '../../apis/themoviedb';
import {
    InputBase,
    Button
} from '@material-ui/core/';
import { useDebounce } from 'use-debounce';
import MovieCard from './MovieCard';

function SearchMovies(props) {
    const [moviesState, setmoviesState] = useState({
        movies: [],
        total_pages: null,
        page_num: 1,
        query: props.match.params.query
    });

    const [text, setText] = useState(props.match.params.query);
    const [debouncedText] = useDebounce(text, 1000);

    useEffect(() => {
        setmoviesState({
            ...moviesState, page_num: 1, query: debouncedText
        });
    }, [debouncedText]);

    useEffect(() => {
        makeSearchApiCall(moviesState.query, moviesState.page_num);
    }, [moviesState.query]);

    const handleOnChange = (e) => {
        if (e.target.value.length === 0) {
            props.history.goBack()
        } else {
            setText(e.target.value);
        }
    }

    const makeSearchApiCall = async (searchQuery, page_num) => {
        const searchResult = await themoviedb.getSearchMovies(searchQuery, page_num);
        if (searchResult && searchResult.data && searchResult.data.results.length) {
            setmoviesState({
                ...moviesState, movies: searchResult, total_pages: searchResult.data.total_pages
            })
        } else {
            setmoviesState({
                ...moviesState, movies: [], total_pages: searchResult.data.total_pages
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
                        value={text}
                    />
                </form>
            </div>
            <div>
                {
                    moviesState.movies && moviesState.movies.length !== 0 ?
                        <>
                            <MovieCard movies={moviesState.movies} />
                            {
                                moviesState.total_pages > 1 && <div style={{ margin: '20px auto', textAlign: 'center' }}>
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
                        :
                        <div style={{ textAlign: 'center', padding: '50px 20px' }}>No Movie/s found</div>
                }
            </div>
        </div>
    )
}

export default SearchMovies
