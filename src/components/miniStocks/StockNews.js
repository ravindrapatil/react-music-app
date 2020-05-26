import React from 'react';
import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core/';

function StockNews({ newsList }) {
    return (
        <Card>
            {
                newsList.map((news, index) => {
                    return <CardContent key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <Typography component="h5" style={{ fontSize: '13.5px', paddingBottom: '5px' }}>
                            <a style={{ textDecoration: 'none' }} href={news.url} target='blank'>{news.title}</a>
                        </Typography>
                        <Typography variant="subtitle2" style={{ fontSize: '13px' }}>
                            {news.description.slice(0, 150)}...
                        </Typography>
                        <Typography variant="subtitle2" style={{ fontSize: '13px', padding: '10px 0 0', color: '#8c8989' }}>
                            {news.newsFrom}
                        </Typography>
                    </CardContent>
                })
            }
        </Card>
    )
}

export default StockNews
