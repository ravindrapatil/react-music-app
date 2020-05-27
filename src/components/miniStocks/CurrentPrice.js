import React from 'react';
import { connect } from 'react-redux';
import {
    Typography,
    Card,
    CardContent
} from '@material-ui/core/';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

function CurrentPrice({ currentPrice }) {
    return (
        <div>
            {
                currentPrice && Object.keys(currentPrice).length &&
                <Card>
                    <CardContent>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                                <Typography variant="h6">
                                    NSE <span style={{ color: '#019e01' }}>LIVE</span>
                                </Typography>
                                <Typography variant="h6">
                                    {new Date(currentPrice.data.timestamp).toDateString()},
                                    {/* {new Date(currentPrice.data.timestamp).toTimeString().slice(0, 5)} */}
                                    {new Date(currentPrice.data.timestamp).toLocaleTimeString()}
                                </Typography>
                            </div>
                            <div>
                                <TrendingFlatIcon style={{ width: '8rem', fontSize: '61px' }} />
                            </div>
                            <div>
                                <Typography variant="h1">
                                    {currentPrice.data.price}
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentPrice: state.stocks.currentPrice
    }
}

export default connect(mapStateToProps, undefined)(CurrentPrice)
