import React, { useState, useContext } from 'react';
// import defaultImg from '../../images/default-movie.jpg';
import {
    Button,
    Typography,
    ButtonGroup,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core/';

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

function BookTicket({ movie, handleDialogClose }) {
    const [{ ticketBooking }, dispatch] = useContext(GlobalContext);

    let today = new Date();
    let dayAfter = new Date(today.getTime() + (40 * 60 * 60 * 1000));
    const formatedDayAfter = dayAfter.toString().slice(0, 15);

    const [condition, setCondition] = useState(101);
    const [timeSetter, setTimeSetter] = useState(101);
    const [dateTime, setDateTime] = useState(today);
    const [movieShowTime, setMovieShowTime] = useState('12:00 PM');

    const showDayPicker = (data) => {
        if (data.id === 101) {
            let today = new Date();
            setDateTime(today);
            setCondition(data.id);
        } else if (data.id === 102) {
            let today = new Date();
            let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
            setDateTime(tomorrow);
            setCondition(data.id);
        } else if (data.id === 103) {
            let today = new Date();
            let dayAfter = new Date(today.getTime() + (48 * 60 * 60 * 1000));
            setDateTime(dayAfter);
            setCondition(data.id);
        }
    }

    const getShowTimes = (time) => {
        if (time.id === 101) {
            setTimeSetter(time.id);
            setMovieShowTime(time.time);
        } else if (time.id === 102) {
            setTimeSetter(time.id);
            setMovieShowTime(time.time);
        } else if (time.id === 103) {
            setTimeSetter(time.id);
            setMovieShowTime(time.time);
        } else if (time.id === 104) {
            setTimeSetter(time.id);
            setMovieShowTime(time.time);
        }
    }

    const bookMyTicket = () => {
        const booking = {
            name: movie.title,
            day: dateTime.toString(),
            time: movieShowTime
        }
        dispatch({ type: 'setTicketBooking', snippet: booking });
        handleDialogClose();
    }

    return (
        <>
            <div>
                <DialogTitle style={{ cursor: 'move' }} id="book-my-ticket">
                    {movie.title}
                </DialogTitle>
                <DialogContent style={{ borderBottom: '1px solid #c8cef1', borderTop: '1px solid #c8cef1' }}>
                    <Typography variant="subtitle2" gutterBottom>
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
                    <Typography variant="subtitle2" gutterBottom style={{ paddingBottom: '6px', margin: '20px 0 0' }}>
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
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={handleDialogClose} color="primary" >
                        Cancel
                </Button>
                    <Button size="small" variant="contained" color="primary" onClick={() => bookMyTicket()}>
                        Book My Ticket/s 
                </Button>
                </DialogActions>
            </div>
        </>
    )
}

export default BookTicket
