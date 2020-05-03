import React, { useContext, useCallback, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { GlobalContext } from "../GlobalState";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Container
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import SearchBox from './SearchBox';

const styles = {
    root: {
        display: 'flex'
    },
    title: {
        textAlign: 'center',
        width: 'calc(100% - 96px)'
    }
}

function AppBarHeader(props) {
    const [{ searchState }, dispatch] = useContext(GlobalContext);

    const setSearchState = useCallback(
        data => {
            dispatch({ type: 'setSearchState', snippet: data });
        }, [dispatch]
    );

    useEffect(() => {
        // if the page is on search we will change the search state
        const changeAppBar = () => {
            const path = props.history.location.pathname;
            if (path === '/search') {
                setSearchState("searching")
            } else {
                setSearchState("home")
            }
            console.log("history change detected in app bar");
        };
        changeAppBar();
        const unlisten = props.history.listen(location => {
            changeAppBar();
        })
        return () => {
            unlisten()
        }
    }, [setSearchState, props.history])

    const toggleSearch = () => {
        if (searchState === 'home') {
            return (
                <>
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={styles.title}>
                        SIM Music
                     </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="Search"
                        onClick={() => setSearchState('clicked')}
                    >
                        <SearchIcon />
                    </IconButton>
                </>
            )
        } else {
            return <SearchBox />
        }
    }

    return (
        <>
            <AppBar id="navbar" position="sticky">
                <Container disableGutters={true}>
                    <Toolbar>
                        {toggleSearch()}
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default withRouter(AppBarHeader)
