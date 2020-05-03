import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Search } from "@material-ui/icons";

function AutoSearchResult({ results, onSearchSelect }) {
    return (
        <>
            {
                results && results.length ? <List>
                    {
                        results.map((result, index) => {
                            return <ListItem key={index} onClick={() => onSearchSelect(result[0])} button>
                                <ListItemIcon style={{ paddingLeft: "16px" }}>
                                    <Search />
                                </ListItemIcon>
                                <ListItemText primary={result[0]} />
                            </ListItem>
                        })
                    }
                </List> : ''
            }
        </>
    )
}

export default AutoSearchResult