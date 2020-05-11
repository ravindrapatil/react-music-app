import React, { useEffect, useState } from 'react';
import {
    Grid,
    makeStyles,
    Typography,
    CircularProgress,
    Snackbar
} from '@material-ui/core/';
import { Helmet } from "react-helmet";
import themoviedb from '../../apis/themoviedb';
import MoviesGallery from './MoviesGallery';
import MovieCard from './MovieCard';
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

function PersonDetails(props) {
    const classes = useStyles();
    const id = props.match.params.id;
    const [person, setperson] = useState();
    const [peronImagesList, setPeronImagesList] = useState();
    const [personCrewList, setpersonCrewList] = useState();
    const [showHideKnownBySection, setshowHideKnownBySection] = useState(true);
    const [loading, setloading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const setApiError = data => {
        setSnackbarOpen({ ...snackbarOpen, open: true });
    }
    const { open, vertical, horizontal } = snackbarOpen;

    const getArtistDetails = async (id) => {
        setloading(true);
        await themoviedb.getArtistDetails(id).then(res => {
            if (res.status >= 200 && res.status < 300) {
                setperson(res.data);
                setloading(false);
            } else {
                setApiError(true);
                setloading(false);
            }
        }).catch(err => {
            console.log(err);
            setApiError(true);
            setloading(false);
        });
    }

    const getPersonImageList = async (id) => {
        await themoviedb.getPersonImages(id).then(res => {
            if (res.status >= 200 && res.status < 300) {
                setPeronImagesList(res.data.profiles);
            } else {
                setApiError(true);
            }
        }).catch(err => {
            console.log(err);
            setApiError(true);
        });
    }

    const getPersonsMovieCredits = async (id) => {
        await themoviedb.getMovieCredits(id).then(res => {
            if (res.status >= 200 && res.status < 300) {
                setpersonCrewList(res);
                const showHide = res.data.crew.length === 0 ? false : true
                setshowHideKnownBySection(showHide);
            } else {
                setApiError(true);
            }
        }).catch(err => {
            console.log(err);
            setApiError(true);
        });
    }

    useEffect(() => {
        getArtistDetails(id);
        getPersonImageList(id);
        getPersonsMovieCredits(id);
    }, [id]);

    const handleClose = () => {
        setSnackbarOpen({ ...snackbarOpen, open: false });
    };

    return (
        <>
            {
                loading ? <div style={{ margin: '30px auto', textAlign: 'center' }}><CircularProgress size={50} /></div>
                    :
                    <>
                        <Helmet>
                            {
                                person && <title>SIM Music - {person.name}</title>
                            }
                        </Helmet>
                        <div style={{ marginTop: '30px' }}>
                            {
                                person && <Grid container spacing={3}>
                                    <Grid item xs={12} md={3} lg={3} sm={3}>
                                        <img className={classes.imgStyle}
                                            src={person.profile_path ? `https://image.tmdb.org/t/p/w300///${person.profile_path}` : `${defaultImg}`}
                                            alt={person.name}
                                            title={person.name} />
                                    </Grid>
                                    <Grid item xs={12} md={9} lg={9} sm={9}>
                                        <>
                                            <div>
                                                <div className={classes.content}>
                                                    <Typography variant="h5" gutterBottom>
                                                        {person.name}
                                                    </Typography>
                                                </div>

                                                <div className={classes.content}>
                                                    <Typography variant="caption" gutterBottom>
                                                        Birthday:
                                </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {person.birthday}
                                                    </Typography>
                                                </div>

                                                <div className={classes.content}>
                                                    <Typography variant="caption" gutterBottom>
                                                        Place of birth:
                                </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {person.place_of_birth}
                                                    </Typography>
                                                </div>

                                                <div className={classes.content}>
                                                    <Typography variant="caption" gutterBottom>
                                                        Biography:
                                </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {person.biography}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div>
                                                <MoviesGallery movieImages={peronImagesList} />
                                            </div>
                                        </>
                                    </Grid>
                                </Grid>
                            }
                        </div>
                    </>
            }
            {
                showHideKnownBySection && personCrewList &&
                <div>
                    <Typography variant="h5" gutterBottom>KNOWN BY</Typography>
                    <MovieCard movies={personCrewList} />
                </div>
            }
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
                message="Oops. Something went wrong. Please try again later"
                className="snackbarStyle"
            />
        </>
    )
}

export default PersonDetails
