import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCricketPlayers } from '../appRedux';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableContainer,
    makeStyles
} from '@material-ui/core/';
import { GlobalContext } from "./GlobalState";

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: '#3f51b5'
    },
    tableCell: {
        color: '#fff'
    },
    tableContainer: {
        margin: '20px 0 0'
    }
})

function Settings() {
    const cricPlayers = useSelector(state => state.cricketPlayers)
    console.log('Indian cricket team ', cricPlayers.players);
    const dispatch = useDispatch();
    const [{ ticketBooking }] = useContext(GlobalContext);
    const classes = useStyles();

    return (
        <>
            <div>
                <button onClick={() => dispatch(fetchCricketPlayers())}>API Call</button>
            </div>
            <div>
                {
                    ticketBooking && ticketBooking.length ?
                        <TableContainer component={Paper} className={classes.tableContainer}>
                            <Table aria-label="simple table">
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>Movie</TableCell>
                                        <TableCell className={classes.tableCell} align="left">Day</TableCell>
                                        <TableCell className={classes.tableCell} align="right">Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ticketBooking.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.day}</TableCell>
                                            <TableCell align="right">{row.time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <div>There are no booked tickets</div>
                }

            </div>
        </>
    )
}

export default Settings
