import React from 'react';
import {
    Grid
} from '@material-ui/core/';

import StockFetcher from './StockFetcher';
import StockInfo from './StockInfo';
import StockDetails from './StockDetails';

function Dashboard({news}) {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <StockFetcher />
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}>
                    {/* <StockInfo /> */}
                    {/* <News /> */}
                    <StockDetails />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
