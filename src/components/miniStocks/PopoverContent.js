import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Typography,
    ListItem,
    makeStyles,
    Tooltip,
    Button
} from '@material-ui/core/';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { stockAdded, removeStockFav, fetchStockNews } from '../../appRedux';

const useStyles = makeStyles(() => ({
    listHolder: {
        borderBottom: '1px solid #bdbbbb',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '0 !important'
    },
    stockContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    hoverContentHolder: {
        display: 'block',
        position: 'absolute',
        width: '94%',
        top: '0',
        height: '32px',
        paddingTop: '3px',
        textAlign: 'right'
    },
    btnHolder: {
        backgroundColor: '#fff',
        display: 'inline-block'
    },
    smallBtn: {
        minWidth: '25px',
        height: '24px',
        marginRight: '10px',
        padding: '0',
        fontSize: '12px',
        boxShadow: 'none !important',
        marginTop: '4px'
    },
    last: {
        marginRight: '0 !important',
    },
    smallBtnWithIcons: {
        backgroundColor: '#fff',
        minWidth: '30px',
        marginRight: '10px',
        padding: '1px 0',
        fontSize: '12px',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        }
    },
}))

function PopoverContent(props) {
    const { item, showHideBtns, getSelectedStockNews, removeFromFavourite, addToFavourite } = props;
    const [state, setstate] = useState({
        listHover: false
    })
    const classes = useStyles();

    const { listHover } = state;

    const onMouseOver = (e) => {
        setstate({ ...state, listHover: true })
    }

    const onMouseOut = (e) => {
        setstate({ ...state, listHover: false })
    }

    const getCalls = (item) => {
        getSelectedStockNews(item);
    }

    return (
        <>
            <ListItem key={item.iexId}
                className={classes.listHolder}>
                <div className={classes.stockContent}
                    onMouseEnter={(e) => onMouseOver(e)}
                    onMouseLeave={(e) => onMouseOut(e)}>
                    <Typography variant='body1' style={{ fontSize: '0.8rem' }}>
                        {item.value}
                    </Typography>
                    <Typography variant='body1' style={{ fontSize: '0.7rem' }}>
                        <span title={item.name}>{item.name.slice(0, 25)}...</span>
                        <span className={item.exchange.toLowerCase() === 'nys' ? 'nys' : 'pse'}>{item.exchange}</span>
                    </Typography>
                    {
                        listHover &&
                        <div className={classes.hoverContentHolder}>
                            <div className={classes.btnHolder}>
                                {/* <Tooltip title="Chart">
                                    <Button size="small" className={`${classes.smallBtn} popoverBtns`} variant="contained" color="primary">
                                        <TrendingUpIcon />
                                    </Button>
                                </Tooltip> */}
                                <Tooltip title="Market Depth">
                                    <Button size="small" className={`${classes.smallBtn} popoverBtns`} variant="contained" 
                                        color="secondary"
                                        onClick={() => getCalls(item)}>
                                        <FormatAlignCenterIcon />
                                    </Button>
                                </Tooltip>
                                {
                                    !showHideBtns && <Tooltip title="Add">
                                        <Button size="small" className={`${classes.smallBtn} ${classes.last} popoverBtns`} variant="contained"
                                            color="primary"
                                            onClick={() => addToFavourite(item)}>
                                            <AddIcon />
                                        </Button>
                                    </Tooltip>
                                }
                                {
                                    showHideBtns && <Tooltip title="Add">
                                        <Button size="small" className={`${classes.smallBtn} ${classes.last} popoverBtns`} variant="contained"
                                            color="primary"
                                            onClick={() => removeFromFavourite(item)}>
                                            <DeleteOutlineIcon />
                                        </Button>
                                    </Tooltip>
                                }
                            </div>
                        </div>
                    }
                </div>

            </ListItem>
        </>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        getSelectedStockNews: (item) => dispatch(fetchStockNews(item)),
        removeFromFavourite: (item) => dispatch(removeStockFav(item)),
        addToFavourite: (item) => dispatch(stockAdded(item))
    }
}

export default connect(undefined, mapDispatchToProps)(PopoverContent)
