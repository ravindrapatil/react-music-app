import React, { useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Slide
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import DraftsIcon from "@material-ui/icons/Drafts";

import { GlobalContext } from '../GlobalState';

const useStyles = makeStyles(() => ({
    root: {
        width: 250,
        maxWidth: 400,
        backgroundColor: "#f3f3f3",
        height: "calc(100vh - 114px)",
        position: 'absolute',
        top: '56px',
        left: '17px',
        border: '1px solid #dedede',
        color: '#000'
    }
}));

function MakeshiftDrawer({ open }) {
    const [{}, dispatch] = useContext(GlobalContext);
    const classes = useStyles();

    const handleListItemClick = (data) => {
        dispatch({ type: "setMenuOpen", snippet: data })
    }

    return (
        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                <List component="nav"
                    onClick={() => handleListItemClick(false)}>
                    <ListItem button component={Link} to="/settings">
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
                <List component="nav"
                    onClick={() => handleListItemClick(false)}>
                    <ListItem button component={Link} to="/hallform">
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Book My Show" />
                    </ListItem>
                </List>
                {/* <Divider /> */}
            </div>
        </Slide>
    )
}

export default MakeshiftDrawer
