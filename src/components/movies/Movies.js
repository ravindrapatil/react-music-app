import React, { useEffect, useState, useContext } from 'react';
import themoviedb from '../../apis/themoviedb';
import {
    ButtonGroup,
    Button,
    InputBase,
    Grid,
    Snackbar,
    CircularProgress
} from '@material-ui/core/';
import { Helmet } from "react-helmet";
import { withRouter } from 'react-router-dom';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

import { GlobalContext } from "../GlobalState";

function Movies(props) {
    const [{ movieGenerState }, dispatch] = useContext(GlobalContext);

    const [popularMoviesData, setPopularMoviesData] = useState({
        movies: {},
        total_pages: null,
        page_num: 1
    });
    const [loading, setloading] = useState(false);
    const [searchQuery, setsearchQuery] = useState('');
    const [btnGroup, setBtnGroup] = useState(movieGenerState);
    const [snackbarOpen, setSnackbarOpen] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { movies, total_pages, page_num } = popularMoviesData;

    const setApiError = data => {
        setSnackbarOpen({ ...snackbarOpen, open: true });
    }
    const { open, vertical, horizontal } = snackbarOpen;

    const setMovieGener = data => {
        dispatch({ type: 'setMovieGener', snippet: data });
    }

    const getMovies = async (type, page_num) => {
        let moviesList;
        if(type === 'popular') {
            moviesList = themoviedb.getPopularMovies(page_num);
        } else if(type === 'top_rated') {
            moviesList = themoviedb.getTopRatedMovies(page_num);
        } else if(type === 'upcoming') {
            moviesList = themoviedb.getUpcomingMovies(page_num);
        }

        await moviesList.then(res => {
            if (res.status >= 200 && res.status < 300) {
                setPopularMoviesData({
                    ...popularMoviesData,
                    movies: res, total_pages: res.data.total_pages
                });
                setloading(false);
            } else {
                setApiError(true);
                setloading(false);
            }
        }).catch(err => {
            setApiError(true);
            console.log(err);
            setloading(false);
        });

        // console.log(moviesList);
        // setPopularMoviesData({
        //     ...popularMoviesData,
        //     movies: moviesList, total_pages: moviesList.data.total_pages
        // });
    }

    const nextPage = () => {
        if(movies && page_num < total_pages) {
            setPopularMoviesData({
                ...popularMoviesData,
                page_num: popularMoviesData.page_num += 1
            });
            if(btnGroup === 'popular') {
                getMovies(btnGroup, popularMoviesData.page_num);
            } else if (btnGroup === 'top_rated') { 
                getMovies(btnGroup, popularMoviesData.page_num);
            } else if (btnGroup === 'upcoming') { 
                getMovies(btnGroup, popularMoviesData.page_num);
            }
        }
    };

    const previousPage = () => {
        if(movies && movies.data.results.length && page_num !== 1) {
            setPopularMoviesData({
                ...popularMoviesData,
                page_num: popularMoviesData.page_num -= 1
            });
            if(btnGroup === 'popular') {
                getMovies(btnGroup, popularMoviesData.page_num);
            } else if (btnGroup === 'top_rated') { 
                getMovies(btnGroup, popularMoviesData.page_num);
            } else if (btnGroup === 'upcoming') { 
                getMovies(btnGroup, popularMoviesData.page_num);
            }
        }
    }

    useEffect(() => {
        if (btnGroup === 'popular') {
            getMovies('popular', popularMoviesData.page_num);
        } else if (btnGroup === 'top_rated') {
            getMovies('top_rated', popularMoviesData.page_num);
        } else if (btnGroup === 'upcoming') {
            getMovies('upcoming', popularMoviesData.page_num);
        }
    }, [btnGroup])

    const popularMovies = (newvalue) => {
        setBtnGroup(newvalue);
        setPopularMoviesData({
            ...popularMoviesData, page_num : 1
        })
    };

    const topRatedMovies = (newvalue) => {
        setBtnGroup(newvalue);
        setMovieGener(newvalue);
        setPopularMoviesData({
            ...popularMoviesData, page_num : 1
        })
    };

    const upcomingMovies = (newvalue) => {
        setBtnGroup(newvalue);
        setMovieGener(newvalue);
        setPopularMoviesData({
            ...popularMoviesData, page_num : 1
        })
    };

    const handleOnChange = (e) => {
        if (e.target.value.length > 0) {
            props.history.push(`/searchmovies/${e.target.value}`);
            setsearchQuery(e.target.value);
        } else {
            setsearchQuery(e.target.value);
        }
    }

    const handleClose = () => {
        setSnackbarOpen({ ...snackbarOpen, open: false });
    };

    return (
        <div>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12} md={6} lg={6} sm={6}>
                    <div>
                        <ButtonGroup color="primary" size="small" aria-label="outlined primary button group">
                            <Button className={btnGroup === 'popular' ? 'active' : 'gener-btn'} onClick={(e) => popularMovies('popular')}>Popular</Button>
                            <Button className={btnGroup === 'top_rated' ? 'active' : 'gener-btn'} onClick={(e) => topRatedMovies('top_rated')}>Top rated</Button>
                            <Button className={btnGroup === 'upcoming' ? 'active' : 'gener-btn'} onClick={(e) => upcomingMovies('upcoming')}>Upcoming</Button>
                        </ButtonGroup>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6} sm={6}>
                    <div className="moviesSearchPage">
                        <form className="searchForm" noValidate autoComplete="off">
                            <InputBase
                                fullWidth
                                placeholder="General Movie Search..."
                                autoFocus
                                onChange={(e) => handleOnChange(e)}
                                value={searchQuery}
                            />
                        </form>
                    </div>
                </Grid>
            </Grid>

            {/* <div style={{ display: 'flex', justifyContent: 'space-between', padding: '17px 0 0' }}>


            </div> */}
            <div className="moviesCard">
                {loading && <div style={{ margin: '30px auto', textAlign: 'center' }}><CircularProgress size={50} /></div>}
                {btnGroup === 'popular' &&
                    <>
                        <Helmet>
                            <title>SIM Music - Popular Movies</title>
                        </Helmet>
                        <MovieCard movies={popularMoviesData.movies} />
                        <Pagination popularMoviesData={popularMoviesData}
                            setPopularMoviesData={setPopularMoviesData}
                            previousPage={previousPage} 
                            nextPage={nextPage} />
                    </>
                }
                {btnGroup === 'top_rated' &&
                    <>
                        <Helmet>
                            <title>SIM Music - Top Rated Movies</title>
                        </Helmet>
                        <MovieCard movies={popularMoviesData.movies} />
                        <Pagination popularMoviesData={popularMoviesData}
                            setPopularMoviesData={setPopularMoviesData}
                            previousPage={previousPage} 
                            nextPage={nextPage} />
                    </>
                }
                {btnGroup === 'upcoming' &&
                    <>
                        <Helmet>
                            <title>SIM Music - Upcoming Movies</title>
                        </Helmet>
                        <MovieCard movies={popularMoviesData.movies} />
                        <Pagination popularMoviesData={popularMoviesData}
                            setPopularMoviesData={setPopularMoviesData}
                            previousPage={previousPage} 
                            nextPage={nextPage} />
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

export default withRouter(Movies)


// https://maqsudkarimov.github.io/tmdb-app/