import React from 'react';
import { connect } from 'react-redux';
import {
    Grid
} from '@material-ui/core/';
import { withRouter, Switch, Route, Link } from "react-router-dom";

import StockFetcher from './StockFetcher';
import StockInfo from './StockInfo';
import News from './News';

function Dashboard({news}) {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <StockFetcher />
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}>
                    <StockInfo />
                    <News />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
