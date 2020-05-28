import React, { useContext, useState } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Tabs, Tab, withStyles, Container, Badge } from '@material-ui/core';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import HomeIcon from '@material-ui/icons/Home';
import GetAppIcon from '@material-ui/icons/GetApp';
import HistoryIcon from '@material-ui/icons/History';
import MovieIcon from '@material-ui/icons/Movie';

import { GlobalContext } from "./GlobalState";
import SpeedDialLab from './SpeedDialLab';

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

function FooterTabs() {
    const [{ ticketBooking }] = useContext(GlobalContext);
    const [tabValue, setTabValue] = useState(0);
    const noOfMookedTickets = ticketBooking.length;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    return (
        <Container style={{ position: 'relative' }}>
            <AntTab value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                <AntTabs aria-label="Home" icon={<HomeIcon />} to="/home" label="Home" component={Link} />
                <AntTabs aria-label="Liked" icon={<QueueMusicIcon />} to="/relatedvideos" label="Related Videos" component={Link} />
                <AntTabs aria-label="Movies" icon={<GetAppIcon />} to="/movies" label="Movies" component={Link} />
                <AntTabs aria-label="Mini Stocks" icon={<HistoryIcon />} to="/ministocks" label="Mini Stocks" component={Link} />
            </AntTab>
            <div className="sticky">
                <Link to="/bookedtickets" style={{ color: '#efff00' }} alt="Booked Ticket" title="Booked Ticket">
                    <Badge badgeContent={noOfMookedTickets} showZero color="primary">
                        <MovieIcon />
                    </Badge>
                </Link>
            </div>
            <SpeedDialLab />
        </Container>
    )
}

export default withRouter(FooterTabs)
