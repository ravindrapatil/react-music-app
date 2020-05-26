import React from 'react';
import { connect } from 'react-redux';
import configureHighcharts from '../../utilities/highchartsConfig'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function StockChart({ historicData }) {
    let chartConfig;

    if (historicData && historicData.prices && Object.keys([historicData.prices]).length) {
        const symbol = historicData.symbol;
        const ohlc = historicData.prices.values.map((item) => {
            return [Date.parse(item[0]), item[1], item[2], item[3], item[4]]
        });
        const volume = historicData.prices.values.map((item) => {
            return [Date.parse(item[0]), item[5]]
        });
        const groupingUnits = [[
            'week',
            [1]
        ], [
            'month',
            [1, 2, 3, 4, 6]
        ]];
        chartConfig = configureHighcharts(groupingUnits, volume, ohlc, symbol);
    }

    return (
        <div className="highchart">
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={chartConfig}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        historicData: state.stocks.historicData
    }
}

export default connect(mapStateToProps, undefined)(StockChart)
