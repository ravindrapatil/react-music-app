import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import EmployeeService from './services/EmployeeService';
import {
    makeStyles,
    Paper,
    InputBase,
    IconButton,
    Grid,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        margin: '30px auto 0'
    },
    input: {
        marginLeft: '10px',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function Dashboard() {
    const classes = useStyles();
    const [playerStatistics, playerGameModeStatistics] = EmployeeService();

    const [state, setstate] = useState({
        query: '',
        statusCode: '',
        playerData: [],
        gameData: []
    });
    const { query, playerData, gameData, statusCode } = state;

    const handleChange = (e) => {
        setstate({
            ...state,
            query: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getPlayerInfo(query)
    }

    const getPlayerInfo = async (query) => {
        try {
            const apiData = await playerStatistics({
                request: {
                    firstName: 'ravi',
                    query: query
                }
            });
            if (apiData) {
                setstate({
                    ...state,
                    statusCode: apiData.status,
                    playerData: playerData.concat(query, apiData.data.data[0].id)
                });
            } else {
                setstate({
                    ...state,
                    statusCode: 404,
                    playerData: []
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (playerData.length > 0) {
            getPlayerGameData();
        }
    }, [playerData])

    const getPlayerGameData = async () => {
        const playerGameData = await playerGameModeStatistics({
            request: {
                firstName: 'ravi',
                mode: playerData[1]
            }
        });
        console.log(playerGameData)
        if (playerGameData && playerGameData.data.data.length > 0) {
            setstate({
                ...state,
                gameData: gameData.concat(
                    playerData,
                    playerGameData.data.data[0].attributes.gameModeStats.squad.kills,
                    playerGameData.data.data[0].attributes.gameModeStats.squad.damageDealt,
                    playerGameData.data.data[0].attributes.gameModeStats.squad.headshotKills,
                    playerGameData.data.data[0].attributes.gameModeStats.squad.longestKill,
                    playerGameData.data.data[0].attributes.gameModeStats.squad.vehicleDestroys
                )
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Paper className={classes.root}>
                    <SearchIcon style={{ marginLeft: '6px' }} />
                    <InputBase
                        className={classes.input}
                        placeholder="Search..."
                        value={query}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'search...' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <DoubleArrowIcon />
                    </IconButton>
                </Paper>
                <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '12px', color: '#c3c0c0' }}>
                    eg: king
                </div>
            </form>
            {
                statusCode !== 404 && gameData && gameData.length > 0 &&
                <Grid container spacing={3} style={{ backgroundColor: '#f5f5f5', marginTop: '50px' }}>
                    <Grid item xs={4} sm={6} md={4} lg={4}>
                        <Typography variant="h5">
                            {gameData[0]}
                        </Typography>
                        <Divider light style={{ margin: '20px 0' }} />
                        <Typography variant="h6">
                            About
                        </Typography>
                        <Typography variant="body2">
                            The following attributes are the LIFETIME stats of the player from the PC-Steam version of PlayerUnknown's Battle Grounds.These stas are being fetched from PUBG's developer API. No data is saved on the server. All rights reserved to PUBG and it's products. More data will be avaialble as I am maintaning it..
                    </Typography>
                    </Grid>
                    <Grid item xs={8} sm={6} md={4} lg={4}>
                        <Typography variant="h5">
                            Stats
                        </Typography>
                        <List>
                            <ListItem>
                                Total Kills: {gameData[2]}
                            </ListItem>
                            <ListItem>
                                Damage Dealt: {gameData[3]}
                            </ListItem>
                            <ListItem>
                                Headshot Kills: {gameData[4]}
                            </ListItem>
                            <ListItem>
                                Longest Kill: {gameData[5]}
                            </ListItem>
                            <ListItem>
                                Vehicles Destroyed: {gameData[6]}
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            }
            {
                statusCode === 404 && <div style={{ margin: '30px auto 0', textAlign: 'center', fontSize: '13px' }}>
                    Sorry! We couldn't find any players corresponding to that username in PUBG-PC version.
                    </div>
            }
            <ToastContainer />
        </div>
    )
}

export default Dashboard
