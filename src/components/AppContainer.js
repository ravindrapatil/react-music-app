import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { GlobalContext } from './GlobalState';
import AppBarHeader from './header/AppBarHeader';
import MainSection from './MainSection';

// import "../../external/saveCountry";
import "../apis/saveCountry";

function AppContainer() {
    const globalState = useContext(GlobalContext)
    const { name } = globalState;
    
    return (
        <Router>
            <AppBarHeader />
            <Route component={MainSection} />
        </Router>
    )
}

export default AppContainer
