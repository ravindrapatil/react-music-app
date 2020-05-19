import React, { useState, useContext } from 'react';
import {
    Card,
    CardContent,
    Typography,
    ButtonGroup,
    Button,
    CardActions,
    Grid,
    Dialog,
    DialogContent,
    DialogActions
} from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DrawSeatGrid from './DrawSeatGrid';

import { GlobalContext } from "../GlobalState";

const showTimes = [
    {
        time: '12:00 PM',
        id: 101
    },
    {
        time: '3:00 PM',
        id: 102
    },
    {
        time: '6:00 PM',
        id: 103
    },
    {
        time: '9:00 PM',
        id: 104
    }
]

const res = [
    { name: "Today", id: 101 },
    { name: "Tomorrow", id: 102 },
    { name: "Day After", id: 103 }
];

function BookTicket(props) {
    const movie = props.location.state.movieInfo;
    const [{ ticketBooking }, dispatch] = useContext(GlobalContext);

    let today = new Date();
    let dayAfter = new Date(today.getTime() + (40 * 60 * 60 * 1000));
    const formatedDayAfter = dayAfter.toString().slice(0, 15);

    const initialState = {
        seat: [
            'A1', 'A2', 'A3', 'A4', 'A5', 'A6',
            'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
            'C1', 'C2', 'C3', 'C4', 'C5', 'C6'
        ],
        seatAvailable: [
            'A1', 'A2', 'A3', 'A4', 'A5', 'A6',
            'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
            'C1', 'C2', 'C3', 'C4', 'C5', 'C6'
        ],
        seatReserved: [],
        seatSelected: [],
        condition: 101,
        timeSetter: 101,
        dateTime: today.toString(),
        movieShowTime: '12:00 PM',
        btnTxt: false,
        movie: movie,
        dialogShowHide: false
    }
    const [seats, setseats] = useState(initialState);
    const { seat, seatAvailable, seatReserved, seatSelected, condition, timeSetter, btnTxt, dialogShowHide } = seats;

    const showDayPicker = (data) => {
        if (data.id === 101) {
            let today = new Date();
            setseats({
                ...seats,
                condition: data.id,
                dateTime: today.toString()
            })
        } else if (data.id === 102) {
            let today = new Date();
            let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
            setseats({
                ...seats,
                condition: data.id,
                dateTime: tomorrow.toString()
            })
        } else if (data.id === 103) {
            let today = new Date();
            let dayAfter = new Date(today.getTime() + (48 * 60 * 60 * 1000));
            setseats({
                ...seats,
                condition: data.id,
                dateTime: dayAfter.toString()
            })
        }
    }

    const getShowTimes = (time) => {
        if (time.id === 101) {
            setseats({
                ...seats,
                timeSetter: time.id,
                movieShowTime: time.time
            })
        } else if (time.id === 102) {
            setseats({
                ...seats,
                timeSetter: time.id,
                movieShowTime: time.time
            })
        } else if (time.id === 103) {
            setseats({
                ...seats,
                timeSetter: time.id,
                movieShowTime: time.time
            })
        } else if (time.id === 104) {
            setseats({
                ...seats,
                timeSetter: time.id,
                movieShowTime: time.time
            })
        }
    }

    const onClickSeat = (seat) => {
        if (seatReserved.indexOf(seat) > -1) {
            setseats({
                ...seats,
                seatAvailable: seatAvailable.concat(seat),
                seatReserved: seatReserved.filter(res => res !== seat)
            })
        } else {
            setseats({
                ...seats,
                seatReserved: seatReserved.concat(seat),
                seatAvailable: seatAvailable.filter(res => res !== seat)
            })
        }
    }

    const checktrue = (row) => {
        if (seatSelected.indexOf(row) > -1) {
            return false
        } else {
            return true
        }
    }

    const bookMyTicket = () => {
        setseats({
            ...seats,
            seatSelected: seatSelected.concat(seatReserved),
            seatReserved: [],
            btnTxt: true
        });
    }

    const confirmTicket = () => {
        dispatch({ type: 'setTicketBooking', snippet: seats });
        setseats({
            ...seats,
            dialogShowHide: true
        })
    }

    const cancelBooking = () => {
        setseats(initialState)
    }

    const handleDialogClose = () => {
        setseats({
            ...seats,
            dialogShowHide: false
        });
        props.history.push(`/bookedtickets`);
    }

    return (
        <>
            <Card style={{ margin: '40px 0 0' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {movie.title}
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography variant="subtitle2" gutterBottom style={{ paddingBottom: '6px' }}>
                                Day:
                        </Typography>
                            <div>
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    {
                                        res.map((data) => {
                                            return <Button key={data.id} size="small"
                                                className={`button ${condition === data.id ? "active" : ""}`}
                                                onClick={() => showDayPicker(data)}
                                            >
                                                {data.name === 'Day After' ? formatedDayAfter : data.name}
                                            </Button>
                                        })
                                    }
                                </ButtonGroup>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography variant="subtitle2" gutterBottom style={{ paddingBottom: '6px' }}>
                                ShowTime:
                            </Typography>
                            <div style={{ marginBottom: '25px' }}>
                                {
                                    showTimes.map((time) => {
                                        return <Button key={time.id}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            className={`button ${timeSetter === time.id ? 'active' : ''}`}
                                            style={{ margin: '0 5px' }}
                                            onClick={() => getShowTimes(time)}
                                        >{time.time}</Button>
                                    })
                                }
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="subtitle2">Seat Reservation System</Typography>
                            <DrawSeatGrid
                                seat={seat}
                                seatAvailable={seatAvailable}
                                seatReserved={seatReserved}
                                seatSelected={seatSelected}
                                onClickSeat={onClickSeat}
                                checktrue={checktrue}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions style={{ justifyContent: 'center', marginBottom: '25px' }}>
                    {
                        btnTxt && <Button size="small" variant="contained" color="primary" onClick={() => cancelBooking()}>
                            Cancel
                    </Button>
                    }
                    <Button size="small" variant="contained" color="primary"
                        onClick={!btnTxt ? () => bookMyTicket() : () => confirmTicket()}>
                        {!btnTxt ? 'Book' : 'Confirm'}
                    </Button>
                </CardActions>
            </Card>
            <Dialog onClose={handleDialogClose} aria-labelledby="simple-dialog-title" open={dialogShowHide}>
                <DialogContent>
                    <div style={{ textAlign: 'center' }}>
                        <CheckBoxIcon style={{ width: '2.5rem', height: '2.5rem', color: 'green' }} />
                        <Typography variant="h6" gutterBottom style={{ paddingBottom: '6px' }}>
                            Booking Successfull
                </Typography>
                        <Typography variant="body2" gutterBottom style={{ paddingBottom: '6px' }}>
                            Your ticket booking is successfull. The ticket has been sent to your email address and phone
                </Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default withRouter(BookTicket)
