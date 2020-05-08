import React, { useEffect, useState, useContext } from 'react';
import themoviedb from '../../apis/themoviedb';
import {
    ButtonGroup,
    Button,
    InputBase
} from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import MovieCard from './MovieCard';

import { GlobalContext } from "../GlobalState";

function Movies(props) {
    const [{ movieGenerState }, dispatch] = useContext(GlobalContext);

    const [popularMoviesData, setPopularMoviesData] = useState([]);
    const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
    const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setsearchQuery] = useState('');
    const [moviesCard, setMoviesCard] = useState(true);
    const [btnGroup, setBtnGroup] = useState(movieGenerState);
    const [generBtnGroup, setGenerBtnGroup] = useState(true);

    const getLatestMovies = async () => {
        const latestMovies = await themoviedb.getLatestMovies();
        setPopularMoviesData(latestMovies.data.results);
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
        const topRatedMovies = await themoviedb.getTopRatedMovies();
        setTopRatedMoviesData(topRatedMovies.data.results);
    }

    const topRatedMovies = (newvalue) => {
        setBtnGroup(newvalue);
        // getTopRatedMovies()
        setMovieGener(newvalue);
    };

    const upcomingMoviesList = async () => {
        const upcomingMoviesResult = await themoviedb.getUpcomingMovies();
        setUpcomingMoviesData(upcomingMoviesResult.data.results)
    }

    const upcomingMovies = (newvalue) => {
        setBtnGroup(newvalue);
        // upcomingMoviesList();
        setMovieGener(newvalue);
    };

    const handleOnChange = (e) => {
        if (e.target.value.length > 0) {
            setsearchQuery(e.target.value);
            setMoviesCard(false);
            setGenerBtnGroup(false)
        } else {
            setsearchQuery(e.target.value);
            setMoviesCard(true);
            setGenerBtnGroup(true);
        }
    }

    const makeSearchApiCall = async (searchQuery) => {
        const searchResult = await themoviedb.getSearchMovies(searchQuery);
        setSearchResult(searchResult.data.results)
    }

    useEffect(() => {
        console.log(searchQuery);
        if (searchQuery.length > 1) {
            makeSearchApiCall(searchQuery)
        }
    }, [searchQuery])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '17px 0 0' }}>
                {
                    generBtnGroup && <div>
                        <ButtonGroup color="primary" size="small" aria-label="outlined primary button group">
                            <Button className={btnGroup === 'popular' ? 'active' : 'gener-btn'} onClick={(e) => popularMovies('popular')}>Popular</Button>
                            <Button className={btnGroup === 'top_rated' ? 'active' : 'gener-btn'} onClick={(e) => topRatedMovies('top_rated')}>Top rated</Button>
                            <Button className={btnGroup === 'upcoming' ? 'active' : 'gener-btn'} onClick={(e) => upcomingMovies('upcoming')}>Upcoming</Button>
                        </ButtonGroup>
                    </div>
                }
                <div>
                    <form className="searchForm" noValidate autoComplete="off">
                        <InputBase
                            fullWidth
                            placeholder="Search..."
                            autoFocus
                            onChange={handleOnChange}
                            value={searchQuery}
                        />
                    </form>
                </div>
            </div>
            {
                moviesCard && <div className="moviesCard">
                    {btnGroup === 'popular' && <MovieCard movies={popularMoviesData} />}
                    {btnGroup === 'top_rated' && <MovieCard movies={topRatedMoviesData} />}
                    {btnGroup === 'upcoming' && <MovieCard movies={upcomingMoviesData} />}
                </div>
            }
            {
                searchResult && <MovieCard movies={searchResult} />
            }

        </div>
    )
}

export default withRouter(Movies)


// https://maqsudkarimov.github.io/tmdb-app/