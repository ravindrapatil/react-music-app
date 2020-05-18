import React, { useContext } from 'react';
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
import { GlobalContext } from "../GlobalState";
import { Helmet } from "react-helmet";

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

function BookedTickets() {
    const [{ ticketBooking }] = useContext(GlobalContext);
    const classes = useStyles();

    return (
        <>
            <div>
                <Helmet>
                    <title>SIM Music - Booked Tickets for Movie/s</title>
                </Helmet>
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
                        <div style={{ padding: '40px 0', textAlign: 'center' }}>
                            There are no tickets booked. To book a ticket go to movies details and click 'BOOK TICKET' button.
                        </div>
                }

            </div>
        </>
    )
}

export default BookedTickets
