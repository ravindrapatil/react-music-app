import React, { useEffect, useState, useContext } from 'react';
import themoviedb from '../../apis/themoviedb';
import {
    ButtonGroup,
    Button,
    InputBase,
    Grid,
    Snackbar
} from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import MovieCard from './MovieCard';

import { GlobalContext } from "../GlobalState";

function Movies(props) {
    const [{ movieGenerState }, dispatch] = useContext(GlobalContext);

    const [popularMoviesData, setPopularMoviesData] = useState([]);
    const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
    const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
    const [searchQuery, setsearchQuery] = useState('');
    const [btnGroup, setBtnGroup] = useState(movieGenerState);
    const [snackbarOpen, setSnackbarOpen] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const setApiError = data => {
        setSnackbarOpen({...snackbarOpen, open: true });
    }

    const {open, vertical, horizontal} = snackbarOpen;

    const getLatestMovies = async () => {
        await themoviedb.getLatestMovies().then(res => {
            if (res.status >= 200 && res.status < 300) {
                setPopularMoviesData(res);
            } else {
                setApiError(true);
            }
        }).catch(err => {
            setApiError(true);
            console.log(err);
        });

    }

    const setMovieGener = data => {
        dispatch({ type: 'setMovieGener', snippet: data });
    }

    useEffect(() => {
        if (btnGroup === 'popular') {
            getLatestMovies();
        } else if (btnGroup === 'top_rated') {
            getTopRatedMovies();
        } else if (btnGroup === 'upcoming') {
            upcomingMoviesList();
        }
    }, [btnGroup])

    const popularMovies = (newvalue) => {
        setBtnGroup(newvalue);
        getLatestMovies();
    };

    const getTopRatedMovies = async () => {
        await themoviedb.getTopRatedMovies().then(res => {
            if (res.status >= 200 && res.status < 300) {
                setTopRatedMoviesData(res);
            } else {
                setApiError(true);
            }
        }).catch(err => {
            console.log(err);
            setApiError(true);
        });
    }

    const topRatedMovies = (newvalue) => {
        setBtnGroup(newvalue);
        // getTopRatedMovies()
        setMovieGener(newvalue);
    };

    const upcomingMoviesList = async () => {
        await themoviedb.getUpcomingMovies().then(res => {
            if (res.status >= 200 && res.status < 300) {
                setUpcomingMoviesData(res)
            } else {
                setApiError(true);
            }
        }).catch(err => {
            console.log(err);
            setApiError(true);
        });

    }

    const upcomingMovies = (newvalue) => {
        setBtnGroup(newvalue);
        // upcomingMoviesList();
        setMovieGener(newvalue);
    };

    const handleOnChange = (e) => {
        if (e.target.value.length > 0) {
            props.history.push(`/searchmovies/${e.target.value}`);
            // props.history.push({
            //     pathname: '/searchmovies'
            // });
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
                {btnGroup === 'popular' && <MovieCard movies={popularMoviesData} />}
                {btnGroup === 'top_rated' && <MovieCard movies={topRatedMoviesData} />}
                {btnGroup === 'upcoming' && <MovieCard movies={upcomingMoviesData} />}
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