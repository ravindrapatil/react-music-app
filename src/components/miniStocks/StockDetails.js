import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    CircularProgress,
    AppBar,
    Tabs,
    Tab,
    Typography
} from '@material-ui/core/';
import StockNews from './StockNews';
import TabPanel from './TabPanel';
import CompanyInfo from './CompanyInfo';
import StockChart from './StockChart';

function StockDetails({ news, loading, companyInfo }) {
    const newsList = news && news.news && news.news.values && news.news.values.map(news => {
        return {
            date: news[0],
            title: news[1],
            url: news[2],
            description: news[3],
            imgURL: news[4],
            newsFrom: news[5]
        }
    });

    const initialState = {
        tabValue: 0
    }
    const [state, setstate] = useState(initialState);
    const { tabValue } = state;
    const handleTabChange = (event, newValue) => {
        setstate({
            ...state,
            tabValue: newValue
        })
    }

    return (
        <div style={{ marginTop: '30px' }}>
            {
                loading ? <div className="loading"><CircularProgress size={50} /></div>
                    :
                    companyInfo && Object.keys(companyInfo).length &&
                    <>
                        <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>
                            {companyInfo.symbol} - {companyInfo.company}
                        </Typography>
                        <StockChart />
                        <AppBar position="static" color="default" style={{ backgroundColor: '#777bef', marginTop: '40px' }}>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto">
                                <Tab label="News" style={{ color: '#fff' }} />
                                <Tab label="Company" style={{ color: '#fff' }} />
                                <Tab label="Item Three" style={{ color: '#fff' }} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={tabValue} index={0}>
                            {
                                newsList && newsList.length ?
                                    <StockNews newsList={newsList} />
                                    : <div>No News available</div>
                            }
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            {
                                companyInfo && Object.keys(companyInfo).length ?
                                    <CompanyInfo companyInfo={companyInfo} />
                                    : <div>No data found</div>
                            }
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            Item Three
                    </TabPanel>
                    </>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        news: state.stocks.selectedStockNews,
        loading: state.stocks.isFetching,
        companyInfo: state.stocks.selectedStockCompany.data
    }
}

export default connect(mapStateToProps, undefined)(StockDetails)
