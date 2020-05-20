import React, { useEffect, useState } from 'react';
import {
    Grid,
    makeStyles,
    Typography,
    Snackbar,
    Button,
    Dialog
} from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";

import themoviedb from '../../apis/themoviedb';
import GenreList from './GenreList';
import MoviesGallery from './MoviesGallery';
import CastAndCrewComponent from './CastAndCrew';
import MovieCard from './MovieCard';
import BookTicket from './BookTicket';
import { formatMoney, formatTime, genresList } from '../../utilities/utilities';
import defaultImg from '../../images/default-movie.jpg';

const useStyles = makeStyles(() => ({
    imgStyle: {
        objectFit: 'cover',
        borderRadius: '4px',
        width: '100%'
    },
    content: {
        paddingBottom: '20px'
    }
}));

function MovieFullView(props) {
    const classes = useStyles();
    const movieId = props.match.params.id;
    const [movie, setMovie] = useState({});
    const [movieImages, setMovieImages] = useState();
    const [castAndCrew, setCastAndCrew] = useState();
    const [recommendedMoviesList, setRecommendedMoviesList] = useState();
    const [showHideRecSection, setshowHideRecSection] = useState(true);
    const [loading, setloading] = useState(false);
    const [dialogopen, setDialogopen] = useState(false);
    let revenue, budget, runtime, moviegenre;

    const [snackbarOpen, setSnackbarOpen] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const setApiError = data => {
        setSnackbarOpen({ ...snackbarOpen, open: true });
    }
    const { open, vertical, horizontal } = snackbarOpen;

    const getMovieDetails = async (id) => {
        setloading(true);
        await themoviedb.getMovieDetails(id).then(res => {
            if (res.status >= 200 && res.status < 300) {
                setMovie(res.data);
                setloading(false);
            } else {
                setApiError(true);
                setloading(false);
            }
        }).catch(err => {
            console.log(err);
            setloading(false);
            setApiError(true);
        });
    }

    const getMovieImages = async (id) => {
        await themoviedb.getImages(id).then(res => {
            if (res.status >= 200 && res.status < 300) {
                let posters = res.data.posters;
                posters.length = 10;
                setMovieImages(posters);
            } else {
                setApiError(true);
            }
        }).catch(err => {
            console.log(err);
            setApiError(true);
        });
    }

    const getCastAndCrew = async (id) => {
        await themoviedb.getCredits(id).then(res => {
            if (res.status >= 200 && res.status < 300) {
                const castcrew = res.data.cast;
                if (res.data.cast.length > 10) {
                    castcrew.length = 40;
                }
                // castcrew.length = 40;
                setCastAndCrew(castcrew);
            } else {
                setApiError(true);
            }
        }).catch(err => {
            console.log(err);
            setApiError(true);
        });
    }

    const getRecommendedMovies = async (id) => {
        await themoviedb.getRecommendations(id).then(res => {
            if (res.status >= 200 && res.status < 300) {
                setRecommendedMoviesList(res.data.results);
                const showHide = res.data.results.length === 0 ? false : true;
                setshowHideRecSection(showHide);
            } else {
                setApiError(true);
            }
        }).catch(err => {
            console.log(err);
            setApiError(true);
        });
    }

    useEffect(() => {
        getMovieDetails(movieId);
        getMovieImages(movieId);
        getCastAndCrew(movieId);
        getRecommendedMovies(movieId)
    }, [movieId])

    if (Object.keys(movie).length !== 0) {
        revenue = formatMoney(movie.revenue);
        budget = formatMoney(movie.budget);
        runtime = formatTime(movie.runtime);
        moviegenre = genresList(movie.genres);
    }

    const handleClose = () => {
        setSnackbarOpen({ ...snackbarOpen, open: false });
    };

    const openBookTicketModel = () => {
        setDialogopen(true)
    }

    const handleDialogClose = () => {
        setDialogopen(false)
    }

    const gotoTicketBooking = (movie) => {
        props.history.push(`/ticketBooking`, {
            movieInfo: movie
        });
    }

    return (
        <>
            {
                // loading ? <div style={{ margin: '30px auto', textAlign: 'center' }}><CircularProgress size={50} /></div>
                //     :
                <>
                    <Helmet>
                        {
                            movie ? <title>{`SIM Music - ${movie.title}`}</title> : <title>{`SIM Music - Movie Details`}</title>
                        }
                    </Helmet>
                    <div style={{ marginTop: '30px' }}>
                        {
                            movie && <Grid container spacing={3}>
                                <Grid item xs={12} md={3} lg={3} sm={3}>
                                    <img className={classes.imgStyle}
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300///${movie.poster_path}` : `${defaultImg}`}
                                        alt={movie.title}
                                        title={movie.title} />
                                </Grid>
                                <Grid item xs={12} md={9} lg={9} sm={9}>
                                    <div className={`${classes.content}`}>
                                        <Typography variant="caption" gutterBottom>
                                            Title:
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            {movie.title}
                                        </Typography>
                                    </div>

                                    <div className={classes.content}>
                                        <Typography variant="caption" gutterBottom>
                                            Overview:
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {movie.overview}
                                        </Typography>
                                    </div>

                                    <div className={classes.content}>
                                        <Typography variant="caption" gutterBottom>
                                            Release date:
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {movie.release_date}
                                        </Typography>
                                    </div>

                                    <div className={classes.content}>
                                        <Typography variant="caption" gutterBottom>
                                            Budget:
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            $ {budget}
                                        </Typography>
                                    </div>

                                    <div className={classes.content}>
                                        <Typography variant="caption" gutterBottom>
                                            Revenue:
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            $ {revenue}
                                        </Typography>
                                    </div>

                                    <div className={classes.content}>
                                        <Typography variant="caption" gutterBottom>
                                            Duration:
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {runtime}
                                        </Typography>
                                    </div>

                                    <div className={classes.content}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                {moviegenre && <GenreList moviegenre={moviegenre} />}
                                            </div>
                                            <div>
                                                {/* <Button variant="contained" color="primary" onClick={openBookTicketModel}>
                                                    Book Ticket
                                                </Button> */}
                                                <Button variant="contained" color="primary" onClick={() => gotoTicketBooking(movie)}>
                                                    Book Ticket
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        }
                    </div>
                </>
            }
            <div>
                <MoviesGallery movieImages={movieImages} />
            </div>
            <div>
                <CastAndCrewComponent castAndCrew={castAndCrew} />
            </div>
            {
                showHideRecSection && recommendedMoviesList &&
                <>
                    <Typography variant="h5" gutterBottom>RECOMMENDATIONS</Typography>
                    <MovieCard movies={recommendedMoviesList} />
                </>
            }
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
                message="Please check your network connection"
                className="snackbarStyle"
            />
            <Dialog
                open={dialogopen}
                onClose={handleDialogClose}
                aria-labelledby="book-my-ticket"
            >
                <BookTicket movie={movie}
                    handleDialogClose={handleDialogClose} />
            </Dialog>
        </>
    )
}

export default withRouter(MovieFullView)
