import React, { useContext, useEffect, useState } from 'react';
import { withRouter, Switch, Route, Link } from "react-router-dom";
import { Tabs, Tab, withStyles, Container, Badge } from '@material-ui/core';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import HomeIcon from '@material-ui/icons/Home';
import GetAppIcon from '@material-ui/icons/GetApp';
import HistoryIcon from '@material-ui/icons/History';
import { Helmet } from "react-helmet";
import MovieIcon from '@material-ui/icons/Movie';

import { GlobalContext } from "./GlobalState";
import SearchResult from './SearchResult';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import MainPlayer from '../components/player/MainPlayer';
import RelatedVideos from './RelatedVideos';
import Settings from './Settings';
import Movies from './movies/Movies';
import MovieFullView from './movies/MovieFullView';
import PersonDetails from './movies/PersonDetails';
import SearchMovies from './movies/SearchMovies';
import History from './History';
import BookedTickets from '../components/movies/BookedTickets'

const AntTab = withStyles({
    root: {
        background: "#3f51b5",
        // position: "fixed",
        bottom: 0,
        left: 0,
        padding: 0,
        width: "100%",
        zIndex: 1300
    },
    indicator: {
        display: "none"
    }
})(Tabs);

const AntTabs = withStyles({
    root: {
        color: "#cbd2f7",
        fontSize: ".75rem",
        margin: 0,

        "&:hover": {
            color: "#ffffffed",
            opacity: 1
        },
        "&$selected": {
            color: "#fff"
        },
        "&:focus": {
            color: "#FFFFFF"
        }
    },
    selected: {}
})(Tab);

let previousLocation;

function MainSection({ history, location }) {
    const [{ currentVideoSnippet, searchResult, ticketBooking }] = useContext(GlobalContext);
    const [redirectState, setRedirectState] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const noOfMookedTickets = ticketBooking.length;

    const continueToHome = () => {
        localStorage.setItem('isThisNew', 'no');
        history.replace('/home');
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    useEffect(() => {
        const isThisNewUser = localStorage.getItem('isThisNew');
        if (isThisNewUser === 'no') {
            setRedirectState(true)
        }

        // if this is not a new user redirect it to home
        previousLocation = location;
        history.listen(location => {
            if (location.pathname !== "/play") {
                previousLocation = location;
                console.log(previousLocation);
            }
        });
    }, []);

    useEffect(() => {
        if (redirectState && history.location.pathname === '/') {
            history.replace('/home');
        }
    }, [setRedirectState, redirectState, history]);

    const returnMainPlayer = props => {
        // return the main player if the path is not the "/"\
        if (window.location.pathname !== '/') {
            return <MainPlayer {...props} />
        } else {
            return null;
        }
    }

    const checkPrevLocation = () => {
        if (location.pathname === '/play') {
            return previousLocation
        } else {
            return location
        }
    }

    console.log(" Location history - " + JSON.stringify(previousLocation));

    return (
        <>
            <Helmet>
                <title>SIM Music - Listen to songs</title>
            </Helmet>
            <Container style={{ marginBottom: '100px' }}>
                <Switch location={checkPrevLocation()}>
                    <Route
                        exact
                        path="/"
                        render={props => {
                            return <LoginPage continueToHome={continueToHome} />;
                        }}
                    />
                    <Route
                        path="/search"
                        render={props => {
                            return <SearchResult videos={searchResult} />
                        }}
                    />
                    <Route
                        path="/home"
                        render={props => {
                            // setTabValue(0);
                            return <HomePage />
                        }}
                    />
                    <Route
                        path="/relatedvideos"
                        render={props => {
                            // setTabValue(1);
                            return <RelatedVideos />
                        }}
                    />
                    <Route
                        path="/movies"
                        render={props => {
                            return <Movies {...props} />
                        }}
                    />
                    <Route
                        path="/movie/:id"
                        render={props => {
                            return <MovieFullView {...props} />
                        }}
                    />
                    <Route
                        path="/person/:id"
                        render={props => <PersonDetails {...props} />}
                    />
                    <Route
                        path="/searchmovies/:query"
                        render={props => {
                            return <SearchMovies {...props} />
                        }}
                    />
                    <Route
                        path="/history"
                        render={props => {
                            return <History {...props} />
                        }}
                    />
                    <Route
                        path="/bookedtickets"
                        render={props => {
                            return <BookedTickets {...props} />
                        }}
                    />
                    <Route path="/settings" component={Settings} />
                </Switch>
                <Route path="/" render={props => returnMainPlayer(props)} />
                <div style={{ height: currentVideoSnippet.id ? "100px" : "0px" }} />
            </Container>
            <div className="stickyFooterLinks">
                <Container style={{ position: 'relative' }}>
                    <AntTab value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                        <AntTabs aria-label="Home" icon={<HomeIcon />} to="/home" label="Home" component={Link} />
                        <AntTabs aria-label="Liked" icon={<QueueMusicIcon />} to="/relatedvideos" label="Related Videos" component={Link} />
                        <AntTabs aria-label="Movies" icon={<GetAppIcon />} to="/movies" label="Movies" component={Link} />
                        <AntTabs aria-label="History" icon={<HistoryIcon />} to="/history" label="History" component={Link} />
                    </AntTab>
                    <div className="sticky">
                        <Link to="/bookedtickets" style={{color: '#efff00'}} alt="Booked Ticket" title="Booked Ticket">
                            <Badge badgeContent={noOfMookedTickets} showZero color="primary">
                                <MovieIcon />
                            </Badge>
                        </Link>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default withRouter(MainSection)
