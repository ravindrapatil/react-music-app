import React, { useContext, useEffect, useState } from 'react';
import { withRouter, Switch, Route } from "react-router-dom";
import { Container } from '@material-ui/core';
import { Helmet } from "react-helmet";

import { GlobalContext } from "./GlobalState";
import SearchResult from './SearchResult';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import MainPlayer from '../components/player/MainPlayer';
import RelatedVideos from './RelatedVideos';
import Settings from './Settings';
import BookTicket from './movies/BookTicket';
import Movies from './movies/Movies';
import MovieFullView from './movies/MovieFullView';
import PersonDetails from './movies/PersonDetails';
import SearchMovies from './movies/SearchMovies';
import History from './History';
import BookedTickets from '../components/movies/BookedTickets';
import Dashboard from '../components/miniStocks/Dashboard';
import DashboardPubG from '../components/pubGStats/Dashboard'
import FooterTabs from './FooterTabs';
import ShoppingCart from '../components/ShoppingCartCheckout/ShoppingCart';

let previousLocation;

function MainSection({ history, location }) {
    const [{ currentVideoSnippet, searchResult }] = useContext(GlobalContext);
    const [redirectState, setRedirectState] = useState(null);

    const continueToHome = () => {
        localStorage.setItem('isThisNew', 'no');
        history.replace('/home');
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
                    <Route path="/ticketBooking" render={props => {
                        return <BookTicket {...props} />
                    }} />
                    <Route path="/ministocks" render={props => {
                        return <Dashboard {...props} />
                    }} />
                    <Route path="/pubgstats" render={props => {
                        return <DashboardPubG />
                    }} />
                    <Route path="/shoppingCartCheckout" render={props => {
                        return <ShoppingCart />
                    }} />

                </Switch>
                <Route path="/" render={props => returnMainPlayer(props)} />
                <div style={{ height: currentVideoSnippet.id ? "100px" : "0px" }} />
            </Container>
            <div className="stickyFooterLinks">
                <FooterTabs />
            </div>
        </>
    )
}

export default withRouter(MainSection)
