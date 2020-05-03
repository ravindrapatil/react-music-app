import React, { useContext, useEffect, useState } from 'react';
import { withRouter, Switch, Route, Link } from "react-router-dom";
import { Tabs, Tab, withStyles, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import GetAppIcon from '@material-ui/icons/GetApp';
import HistoryIcon from '@material-ui/icons/History';

import { GlobalContext } from "./GlobalState";
import SearchResult from './SearchResult';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import MainPlayer from '../components/player/MainPlayer';
import RelatedVideos from './RelatedVideos';

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
    const [{ currentVideoSnippet, searchResult }] = useContext(GlobalContext);
    const [redirectState, setRedirectState] = useState(null);
    const [tabValue, setTabValue] = useState(0);

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
                            setTabValue(0);
                            return <HomePage />
                        }
                        }
                    />
                    <Route
                        path="/relatedvideos"
                        render={props => {
                            setTabValue(1);
                            return <RelatedVideos />
                        }
                        }
                    />
                </Switch>
                <Route path="/" render={props => returnMainPlayer(props)} />
                <div style={{ height: currentVideoSnippet.id ? "100px" : "0px" }} />
            </Container>
            <div className="stickyFooterLinks">
                <Container>
                    <AntTab value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                        <AntTabs aria-label="Home" icon={<HomeIcon />} to="/home" label="Home" component={Link} />
                        <AntTabs aria-label="Liked" icon={<SearchIcon />} to="/relatedvideos" label="Related Videos" component={Link} />
                        <AntTabs aria-label="Download" icon={<GetAppIcon />} to="/download" label="Download" component={Link} />
                        <AntTabs aria-label="History" icon={<HistoryIcon />} to="/history" label="History" component={Link} />
                    </AntTab>
                </Container>
            </div>
        </>
    )
}

export default withRouter(MainSection)
