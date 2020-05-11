import React, { useEffect, useState } from 'react';
import themoviedb from '../../apis/themoviedb';
import {
    InputBase,
    Button,
    CircularProgress,
    Snackbar
} from '@material-ui/core/';
import { Helmet } from "react-helmet";
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
    const [snackbarOpen, setSnackbarOpen] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

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

    const setApiError = data => {
        setSnackbarOpen({ ...snackbarOpen, open: true });
    }
    const { open, vertical, horizontal } = snackbarOpen;

    const handleClose = () => {
        setSnackbarOpen({ ...snackbarOpen, open: false });
    }

    const makeSearchApiCall = async (searchQuery, page_num) => {
        setloading(true);
        await themoviedb.getSearchMovies(searchQuery, page_num).then(res => {
            if (res.status >= 200 && res.status < 300) {
                setmoviesState({
                    ...moviesState, movies: res, total_pages: res.data.total_pages
                });
                setloading(false);
            } else {
                setloading(false);
                setApiError(true);
                setmoviesState({
                    ...moviesState, movies: [], total_pages: res.data.total_pages
                })
            }
        }).catch(err => {
            setApiError(true);
            console.log(err);
            setloading(false);
        });

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
            <Helmet>
                <title>SIM Music - Search Movies</title>
            </Helmet>
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
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
                message="Please check your network connection"
                className="snackbarStyle"
            />
        </div>
    )
}

export default SearchMovies
