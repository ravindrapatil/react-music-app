import axios from 'axios';
import {
    QUERY_TERM,
    START_FETCH,
    FETCH_SUCCESS,
    FETCH_ERROR,
    STOCK_ADDED,
    STOCK_REMOVED,
    START_STOCKNEWS_FETCH,
    FETCH_STOCKNEWS_SUCCESS,
    FETCH_STOCKNEWS_ERROR,
    FETCH_STOCKINEWS_SUCCESS
} from './stocksTypes'

const newsdata = {
    "status": {
        "code": 0,
        "message": ""
    },
    "data": {
        "news": {
            "columns": [
                "date",
                "title",
                "link",
                "description",
                "imageLink",
                "source",
                "sourceDomain"
            ],
            "values": [
                [
                    "2020-04-25T10:59:39Z",
                    "Hot Stock zu verfolgen :: Adani Enterprises Limited (NSE ...",
                    "http://www.ims-magazin.de/hot-stock-zu-verfolgen-adani-enterprises-limited-nse-adanient-29144/",
                    "Adani Enterprises Limited (NSE: ADANIENT) LAGER IM FOKUS: �berkaufte und �berverkaufte Niveaus. Die Aktie hat einen RSI-Wert von 14.",
                    "http://www.ims-magazin.de/wp-content/uploads/2019/11/novo-nordisk.jpg",
                    "Internationales Magazin für Sicherheit",
                    null
                ],
                [
                    "2020-01-16T18:05:08Z",
                    "CBI files case against Adani, government officials in coal supply deal",
                    "https://finance.yahoo.com/news/cbi-files-case-against-adani-180508831.html?.tsrc=rss",
                    "India\\u0027s federal investigating agency has filed a case against the country\\u0027s biggest coal importer and trader Adani Enterprises Ltd and several government officials for alleged criminal conspiracy in a coal supply deal in 2010, a report filed by the agency said on Thursday.  The Central Bureau of Investigation (CBI) has charged past officials of National Cooperative Consumers\\u0027 Federation of India Ltd (NCCF), a government cooperative body, with conduct &quot;unbecoming of public servants and in criminal conspiracy&quot; by giving undue favour to Adani Enterprises in a six million tonne coal supply contract awarded in 2010, the CBI report said.  NCCF did not immediately reply to an email seeking comment.",
                    null,
                    "Yahoo Finance",
                    null
                ],
                [
                    "2019-10-22T02:07:28Z",
                    "Australian mining magnate applies for big new coal mine",
                    "https://finance.yahoo.com/news/australian-mining-magnate-applies-big-020728817.html?.tsrc=rss",
                    "Australian mining magnate Clive Palmer has renewed a push to develop a new coal mine in Queensland state, close to a controversial mine under construction by India\\u0027s Adani Enterprises.  Palmer\\u0027s Waratah Coal applied to Australia\\u0027s Department of Natural Resources on Oct. 4 for a 35-year mining lease in the Galilee Basin, a new coal region that won the green light this year for development.  The application signals a resumption in development planning for the mine, which was first proposed in 2011 but which has been on ice in recent years.",
                    "https://s.yimg.com/uu/api/res/1.2/vKiNCXura_FRoBTxI8Em_A--~B/aD01MDg7dz04MDA7c209MTthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en-US/reuters.com/7c11abe091e830cf1a5320804d425cba",
                    "Yahoo Finance",
                    null
                ],
                [
                    "2019-10-18T04:39:11Z",
                    "Adani awards rail contract to support Australian thermal coal mine",
                    "https://news.yahoo.com/adani-awards-rail-contract-support-043911352.html?.tsrc=rss",
                    "India\\u0027s Adani Enterprises \\u003cADEL.NS\\u003e has awarded a contract to an Australian rail company as the conglomerate steps up infrastructure spending to support its new thermal coal mine in Queensland state.  The A$100 million ($68.30 million) contract was awarded to privately held Martinus Rail, based in the regional city of Rockhampton, Adani said in a statement on Friday.  Adani Mining Chief Executive Lucas Dow said more than A$450 million worth of contracts had already been awarded on the Carmichael Project, the majority to regional Queensland areas.",
                    "https://s.yimg.com/ny/api/res/1.2/gojQWKkaX4_vmoeo4Nr2LA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTg5ODtoPTU5MA--/https://s.yimg.com/uu/api/res/1.2/rmJn59CVcUBxe9ncywSQ8A--~B/aD0yOTU7dz00NDk7c209MTthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en-US/reuters.com/464ae4d05570fbda5397b8dec1c8b704",
                    "Yahoo Finance",
                    null
                ],
                [
                    "2019-07-22T05:50:55Z",
                    "Australia detains French TV crew filming anti-coal protest",
                    "https://news.yahoo.com/australia-detains-french-tv-crew-055055781.html?.tsrc=rss",
                    "A French television reporter and his crew were arrested on Monday while filming protesters blockading a coal port in Australia\\u0027s northeastern state of Queensland.  Reporter Hugo Clément said he and his television crew from French public broadcaster France 2 were filming protesters blocking access to Indian conglomerate Adani Enterprise\\u0027s Abbot Point coal terminal for an environmental documentary about oceans, including the Great Barrier Reef.",
                    "https://s.yimg.com/ny/api/res/1.2/1JJ3x3NGtS2w.hG271cGvA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTg5ODtoPTUwNg--/https://s.yimg.com/uu/api/res/1.2/CcOuSbf4edJKtWzshMkJBw--~B/aD0yNTM7dz00NDk7c209MTthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en-US/reuters.com/73a17991057967a6a82bc088a641d519",
                    "Yahoo Finance",
                    null
                ],
                [
                    "2019-06-13T03:54:25Z",
                    "Adani wins green light for long awaited Australian coal mine",
                    "https://finance.yahoo.com/news/adani-wins-final-approval-long-035425473.html?.tsrc=rss",
                    "India\\u0027s Adani Enterprises on Thursday received the go-ahead to start construction of a controversial coal mine in outback Australia, after a state government approved a final permit on ground water management.  The Carmichael mine has been a lightning rod for climate change concerns in Australia, and was seen as a factor in the surprise return to power of the conservative Liberal/National coalition in a national election in May.  First acquired by Adani in 2010, the project is slated to produce 8-10 million tonnes of thermal coal a year and cost up to $1.5 billion, but has been mired in court battles and opposition from green groups.",
                    "https://s.yimg.com/uu/api/res/1.2/8wINkzEK34PkrCTuC6ybUw--~B/aD0zMDg7dz00NTA7c209MTthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en-US/reuters.com/18b45c07afa6a0d104f18e59784002a8",
                    "Yahoo Finance",
                    null
                ],
                [
                    "2018-11-11T00:00:00Z",
                    "How Did Adani Enterprises Limited's (NSE:ADANIENT) 4.5% ROE Fare Against \\nThe Industry?",
                    "https://simplywall.st/news/how-did-adani-enterprises-limiteds-nseadanient-4-5-roe-fare-against-the-industry/",
                    "How Did Adani Enterprises Limited\\u0027s (NSE:ADANIENT) 4.5% ROE Fare Against The Industry? Simply Wall St December 11, 2018. One of the best investments",
                    "https://simplywall.st/api/company/image/NSEI:ADANIENT/cover",
                    "Simply Wall St",
                    null
                ],
                [
                    "2018-06-29T00:00:00Z",
                    "What You Must Know About Adani Enterprises Limited's (NSE:ADANIENT) ROE",
                    "https://simplywall.st/news/what-you-must-know-about-adani-enterprises-limiteds-nseadanient-roe/",
                    "Adani Enterprises Limited (NSE:ADANIENT) delivered an ROE of 4.54% over the past 12 months, which is relatively in-line with its industry",
                    null,
                    "Simply Wall St",
                    null
                ],
                [
                    "2018-05-26T00:00:00Z",
                    "Is It Time To Buy Adani Enterprises Limited (NSE:ADANIENT)?",
                    "https://simplywall.st/stocks/in/capital-goods/nse-adanient/adani-enterprises-shares/news/is-it-time-to-buy-adani-enterprises-limited-nseadanient/",
                    "Adani Enterprises Limited (NSE:ADANIENT), a trade distributors company based in India, saw a decent share price growth in the teens level on",
                    null,
                    "Simply Wall St",
                    null
                ],
                [
                    "2018-05-15T00:00:00Z",
                    "Is Adani Enterprises Limited's (NSE:ADANIENT) PE Ratio A Signal To Buy For \\nInvestors?",
                    "https://simplywall.st/stocks/in/capital-goods/nse-adanient/adani-enterprises-shares/news/is-adani-enterprises-limiteds-nseadanient-pe-ratio-a-signal-to-buy-for-investors/",
                    "Is Adani Enterprises Limited\\u0027s (NSE:ADANIENT) PE Ratio A Signal To Buy For Investors? Simply Wall St June 15, 2018. This analysis is intended to introduce",
                    null,
                    "Simply Wall St",
                    null
                ]
            ]
        }
    }
}

export const querying = () => {
    return {
        type: QUERY_TERM
    }
}

export const stockAdded = (stock) => {
    return {
        type: STOCK_ADDED,
        payload: { favStockList: stock }
    }
}

export const removeStockFav = (stock) => {
    return {
        type: STOCK_REMOVED,
        payload: { favStockList: stock }
    }
}

export const startFetch = (queryTerm) => {
    return {
        type: START_FETCH,
        payload: { queryTerm, isFetching: true }
    }
}

export const fetchSuccess = (data) => {
    return {
        type: FETCH_SUCCESS,
        payload: { data, isFetching: false }
    }
}

export const fetchError = (error) => {
    return {
        type: FETCH_ERROR,
        payload: { error, isFetching: false }
    }
}

export const startFetchStockNews = () => {
    return {
        type: START_STOCKNEWS_FETCH,
        payload: { isFetching: true }
    }
}

export const fetchStockNewsSuccess = (data) => {
    return {
        type: FETCH_STOCKNEWS_SUCCESS,
        payload: { isFetching: false, selectedStockNews: data }
    }
}

export const fetchStockNewsError = (error) => {
    return {
        type: FETCH_STOCKNEWS_ERROR,
        payload: { isFetching: false, error }
    }
}

export const fetchStocks = (query) => {
    const url = `https://api.stockdio.com/freedata/financial/info/v1/getsymbols?app-key=4662E30B3D4949FEA48CD62D0EDEBADB&query=${query}&exchange=NSE&includecolumnnames=false`;
    return (dispatch) => {
        dispatch(startFetch(query));
        axios.get(url)
            .then(res => {
                dispatch(fetchSuccess(res.data.data.Symbols))
            })
            .catch(error => {
                dispatch(fetchError(error));
            })
    }
}

export const fetchStockNews = (stock) => {
    const url = `https://api.stockdio.com/data/financial/info/v1/getNewsEx/?app-key=4662E30B3D4949FEA48CD62D0EDEBADB&symbol=${stock.value}&stockExchange=nse&includeImages=true&includeDescriptions=false&includeRelated=true&nItems=10&culture=english-us`;
    return (dispatch) => {
        dispatch(startFetchStockNews());
        axios.get(url)
            .then(res => {
                dispatch(fetchStockNewsSuccess(res.data.data))
            })
            .catch(error => {
                dispatch(fetchStockNewsError(error));
            })
    }
}
