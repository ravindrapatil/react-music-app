import React, { useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';

import { GlobalContext } from "./GlobalState";

function SideBarMenu() {

    const [{ menuOpen }, dispatch] = useContext(GlobalContext);

    const setSideMenu = data => {
        dispatch({ type: 'setMenuOpen', snippet: data });
    }

    return (
        <Drawer
            open={menuOpen}
            onClose={() => setSideMenu(false)}
        >
            sdsd
        </Drawer>
    )
}

export default SideBarMenu
