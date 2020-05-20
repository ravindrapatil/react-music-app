import React, { useState, useEffect, useRef } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    makeStyles,
    Grid,
    Badge,
    Slider,
    Button
} from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import defaultImg from '../../images/default-movie.jpg';
import GenreList from './GenreList';

const useStyles = makeStyles({
    title: {
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    genreStyle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    filterCount: {
        color: '#fd2401',
        fontWeight: '600'
    },
    filterLabel: {
        fontWeight: 'bold',
        paddingBottom: '10px',
        color: '#0988b9'
    }
});

let moviegener = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
]

function MovieCard(props) {
    const moviesList = props.movies;
    const classes = useStyles();

    let max;
    let popular;
    let rating;
    if (moviesList && moviesList.length) {
        max = Math.max(...moviesList.map(item => item.vote_count));
        popular = Math.max(...moviesList.map(item => item.popularity));
        rating = Math.max(...moviesList.map(item => item.vote_average));
    }

    const initialValue = {
        voteCount: max,
        popularCount: popular,
        voteAverage: rating,
        movies: null
    }
    const [state, setstate] = useState(initialValue);
    const { voteCount, popularCount, movies, voteAverage } = state;

    useEffect(() => {
        if (moviesList && moviesList.length) {
            setstate({
                ...state,
                movies: moviesList
            })
        } else if (moviesList && moviesList.data && moviesList.data.crew && moviesList.data.crew.length) {
            setstate({
                ...state,
                movies: moviesList.data.crew
            })
        }
    }, [props]);

    const gotoMovieDetails = path => {
        props.history.push(path);
    }

    const handleVoteChange = (e, newValue) => {
        setstate({
            ...state,
            voteCount: newValue
        });
    }

    const handlePopularityChange = (e, newValue) => {
        setstate({
            ...state,
            popularCount: newValue
        });
    }

    const handleRatingChange = (e, newValue) => {
        setstate({
            ...state,
            voteAverage: newValue
        });
    }

    useEffect(() => {
        applyFilter();
    }, [voteCount, popularCount, voteAverage]);

    const applyFilter = () => {
        let tempRooms = moviesList;

        // Filter by Vote Count
        if (voteCount && tempRooms.length) {
            tempRooms = tempRooms.filter(item => item.vote_count <= voteCount);
            setstate({
                ...state,
                movies: tempRooms
            })
        }

        // Filter by popularity
        if (popularCount && tempRooms.length) {
            tempRooms = tempRooms.filter(item => item.popularity <= popularCount);
            setstate({
                ...state,
                movies: tempRooms
            })
        }

        // Filter by Rating
        if (voteAverage && tempRooms.length) {
            tempRooms = tempRooms.filter(item => item.vote_average <= voteAverage && item.vote_average >= 0);
            setstate({
                ...state,
                movies: tempRooms
            })
        }
    }

    const resetFilter = () => {
        setstate({
            ...state,
            voteCount: max,
            popularCount: popular,
            voteAverage: rating,
            movies: moviesList
        })
    }

    return (
        <>
            <div style={{ margin: '20px 0' }}>
                <Typography variant="subtitle2" className={classes.filterLabel} style={{ fontWeight: 'bold' }}>
                    Apply Filter
                </Typography>
                <Grid container>
                    <Grid item lg={3} xs={12} sm={3} md={3}>
                        <div style={{ width: '80%' }}>
                            <Typography variant="caption" display="block" className="roomPriceLabel">
                                Audiance Voting : <span className={classes.filterCount}>{voteCount}</span>
                            </Typography>
                            <Slider
                                value={voteCount}
                                min={0} max={max}
                                onChange={handleVoteChange}
                                aria-labelledby="continuous-slider" />
                        </div>
                    </Grid>
                    <Grid item lg={3} xs={12} sm={3} md={3}>
                        <div style={{ width: '80%' }}>
                            <Typography variant="caption" display="block" className="roomPriceLabel">
                                Popularity : <span className={classes.filterCount}>{popularCount}</span>
                            </Typography>
                            <Slider
                                value={popularCount}
                                min={0} max={popular}
                                onChange={handlePopularityChange}
                                aria-labelledby="continuous-slider" />
                        </div>
                    </Grid>
                    <Grid item lg={3} xs={12} sm={3} md={3}>
                        <div style={{ width: '80%' }}>
                            <Typography variant="caption" display="block" className="roomPriceLabel">
                                Critic Rating : <span className={classes.filterCount}>{voteAverage}</span>
                            </Typography>
                            <Slider
                                value={voteAverage}
                                min={0} max={rating}
                                onChange={handleRatingChange}
                                aria-labelledby="continuous-slider" />
                        </div>
                    </Grid>
                    <Grid item lg={3} xs={12} sm={3} md={3} style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Button onClick={resetFilter} variant="contained" size="small" color="primary" style={{ fontSize: '0.751rem' }}>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
            {
                movies && movies.length ?
                    <>
                        <Grid container spacing={3}>
                            {
                                movies && movies.length && movies.map((item, index) => {
                                    const genres = moviegener.filter(genre => {
                                        const match = item.genre_ids.filter(genreId => genreId === genre.id);
                                        return match[0] === genre.id;
                                    });

                                    const ratingClass = () => {
                                        return item.vote_average > 7 ? 'green' : 'grey'
                                    }

                                    const path = `/movie/${item.id}`;

                                    return (
                                        <Grid item xs={12} md={3} lg={2} sm={2} key={index}>
                                            <Badge className={`badgeStyle ${ratingClass()}`} anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }} badgeContent={item.vote_average} color="primary" />
                                            <Card className={classes.root}>
                                                <CardActionArea className={classes.cardBtn} onClick={() => gotoMovieDetails(path)}>
                                                    <CardMedia
                                                        component="img"
                                                        alt={item.title}
                                                        height="278"
                                                        image={item.poster_path ? `https://image.tmdb.org/t/p/w185//${item.poster_path}` : `${defaultImg}`}
                                                        title={item.title}
                                                    />
                                                    <CardContent>
                                                        <Typography variant="subtitle2" gutterBottom className={classes.title} title={item.title}>
                                                            {item.title}
                                                        </Typography>
                                                        <div className={classes.genreStyle}>
                                                            {genres && <GenreList genres={genres} />}
                                                        </div>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </> : <div style={{ textAlign: 'center', padding: '50px 20px' }}>No Record found</div>
            }

        </>
    )
}

export default withRouter(MovieCard)
