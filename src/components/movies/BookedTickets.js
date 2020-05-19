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
import defaultImg from '../../images/default-movie.jpg';

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: '#3f51b5'
    },
    tableCell: {
        color: '#fff'
    },
    tableContainer: {
        margin: '20px 0 0'
    },
    imgStyle: {
        height: '100px'
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
                                        <TableCell className={classes.tableCell} align="left">Time</TableCell>
                                        <TableCell className={classes.tableCell} align="right">Seat No/s</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ticketBooking.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell scope="row" style={{ width: '200px', textAlign: 'center' }}>
                                                <img className={classes.imgStyle}
                                                    src={row.movie.poster_path ? `https://image.tmdb.org/t/p/w300///${row.movie.poster_path}` : `${defaultImg}`}
                                                    alt={row.movie.title}
                                                    title={row.movie.title} />
                                                <p>
                                                    {row.movie.title}
                                                </p>
                                            </TableCell>
                                            <TableCell align="left">{row.dateTime.slice(0, 15)}</TableCell>
                                            <TableCell align="left">{row.movieShowTime}</TableCell>
                                            <TableCell align="right">
                                                {row.seatSelected.map(seat => <span style={{ display: 'inline-block', padding: '0 10px' }} key={seat}>{seat}</span>)}
                                            </TableCell>
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
