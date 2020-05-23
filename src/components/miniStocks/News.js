import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core/';

function News({ news }) {
    const newsList = news && news.news && news.news.values && news.news.values.map(news => {
        return {
            date: news[0],
            title: news[1],
            url: news[2],
            description: news[3],
            imgURL: news[4],
            newsFrom: news[5]
        }
    })
    
    return (
        <div>
            {
                newsList && newsList.length &&
                <>
                    <h4>News</h4>
                    <Card>
                        {
                            newsList.map((news, index) => {
                                return <CardContent key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <Typography component="h5">
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
                </>
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        news: state.stocks.selectedStockNews
    }
}

export default connect(mapStateToProps, undefined)(News)
