import React, { useEffect, useState, useContext } from 'react';
import themoviedb from '../../apis/themoviedb';
import { makeStyles } from '@material-ui/core/styles';
import {
    ButtonGroup,
    Button
} from '@material-ui/core/';

import MovieCard from './MovieCard';

import { GlobalContext } from "../GlobalState";

const useStyles = makeStyles(() => ({
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0'
    }
}))

function Movies(props) {
    const classes = useStyles();
    const [{ movieGenerState }, dispatch ] = useContext(GlobalContext);

    const [popularMoviesData, setPopularMoviesData] = useState([]);
    const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
    const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);

    const getLatestMovies = async () => {
        const latestMovies = await themoviedb.getLatestMovies();
        setPopularMoviesData(latestMovies.data.results);
    }

    const [btnGroup, setBtnGroup] = useState(movieGenerState);

    const setMovieGener = data => {
        dispatch({ type: 'setMovieGener', snippet: data });
    }

    useEffect(() => {
        if(btnGroup === 'popular') {
            getLatestMovies();
        } else if(btnGroup === 'top_rated') {
            getTopRatedMovies();
        } else if(btnGroup === 'upcoming') {
            upcomingMoviesList();
        }
    }, [btnGroup])

    const popularMovies = (newvalue) => {
        setBtnGroup(newvalue);
        getLatestMovies();
    };

    const getTopRatedMovies = async () => {
        const topRatedMovies =  await themoviedb.getTopRatedMovies();
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

    console.log(btnGroup);

    return (
        <div>
            <div className={classes.buttonGroup}>
                <ButtonGroup color="primary" size="small" aria-label="outlined primary button group">
                    <Button className={btnGroup === 'popular' ? 'active' : 'gener-btn'} onClick={(e) => popularMovies('popular')}>Popular</Button>
                    <Button className={btnGroup === 'top_rated' ? 'active' : 'gener-btn'} onClick={(e) => topRatedMovies('top_rated')}>Top rated</Button>
                    <Button className={btnGroup === 'upcoming' ? 'active' : 'gener-btn'} onClick={(e) => upcomingMovies('upcoming')}>Upcoming</Button>
                </ButtonGroup>
            </div>
            <div className="moviesCard">
                {btnGroup === 'popular' && <MovieCard movies = {popularMoviesData} />}
                {btnGroup === 'top_rated' && <MovieCard movies = {topRatedMoviesData} />}
                {btnGroup === 'upcoming' && <MovieCard movies = {upcomingMoviesData} />}
            </div>
        </div>
    )
}

export default Movies


// https://maqsudkarimov.github.io/tmdb-app/