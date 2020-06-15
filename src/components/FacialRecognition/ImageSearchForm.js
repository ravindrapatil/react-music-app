import React, { useState } from 'react';
import {
    makeStyles,
    Paper,
    InputBase,
    Button,
    Typography
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height: 40,
        margin: '30px auto 0'
    },
    input: {
        marginLeft: '10px',
        marginRight: '10px',
        flex: 1,
    },
    btn: {
        margin: '20px auto',
        display: 'flex'
    }
}));

function ImageSearchForm({onInputChange, onSubmit}) {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h4" style={{ margin: '20px 0 0', textAlign: 'center', color: '#176cd6' }}>
                Facial Recognition
            </Typography>
            <form onSubmit={onSubmit} noValidate autoComplete="off">
                <Paper className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Imgage URL..."
                        onChange={onInputChange}
                        inputProps={{ 'aria-label': 'search...' }}
                    />
                </Paper>
                <Button type="submit" className={classes.btn} variant="contained" size="medium" color="primary">
                    Detect
                </Button>
            </form>
        </div>
    )
}

export default ImageSearchForm
