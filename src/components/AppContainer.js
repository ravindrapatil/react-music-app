import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBarHeader from './header/AppBarHeader';
import MainSection from './MainSection';
// import SideBarMenu from './SideBarMenu';

import "../apis/saveCountry";

function AppContainer() {
    
    return (
        <Router>
            <AppBarHeader />
            <Route component={MainSection} />
            {/* <SideBarMenu /> */}
        </Router>
    )
}

export default AppContainer
