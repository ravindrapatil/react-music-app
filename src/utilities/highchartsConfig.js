const config = (GU, vol, ohl, symbol) => ({
    colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
        '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: null,
        style: {
            // fontFamily: 'Signika, serif'
        }
    },
    rangeSelector: {
        selected: 5,
        buttonTheme: {
            fill: 'white',
            stroke: '#C0C0C8',
            'stroke-width': 1,
            states: {
                select: {
                    fill: '#D0D0D8'
                }
            }
        }
    },

    title: {
        text: `${symbol} Historical`,
        style: {
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    },

    subtitle: {
        style: {
            color: 'black'
        }
    },
    tooltip: {
        borderWidth: 0
    },
    labels: {
        style: {
            color: '#6e6e70'
        }
    },
    legend: {
        backgroundColor: '#E0E0E8',
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },

    plotOptions: {
        series: {
            shadow: true
        },
        candlestick: {
            lineColor: '#404048'
        },
        map: {
            shadow: false
        }
    },

    xAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },

    yAxis: [
        {
            labels: {
                align: "right",
                x: -3,
                style: {
                    color: '#6e6e70'
                }
            },
            title: {
                text: 'OHLC'
            },
            height: "70%",
            lineWidth: 2,
            resize: {
                enabled: true
            }
        },
        {
            labels: {
                align: "right",
                x: -3,
                style: {
                    color: '#6e6e70'
                }
            },
            title: {
                text: "Volume"
            },
            top: "75%",
            height: "45%",
            offset: 0,
            lineWidth: 2
        }
    ],

    scrollbar: {
        trackBorderColor: '#C0C0C8'
    },

    series: [
        {
            type: "candlestick",
            name: symbol,
            data: ohl,
            dataGrouping: {
                units: GU
            }
        },
        {
            type: "column",
            name: "Volume",
            data: vol,
            yAxis: 1,
            dataGrouping: {
                units: GU
            }
        }
    ]
})

export default config