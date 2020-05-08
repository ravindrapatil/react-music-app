import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBarHeader from './header/AppBarHeader';
import MainSection from './MainSection';
// import SideBarMenu from './SideBarMenu';
import ScrollToTop from './ScrollToTop';

import "../apis/saveCountry";

function AppContainer() {

    return (
        <Router>
            <ScrollToTop>
                <AppBarHeader />
                <Route component={MainSection} />
                {/* <SideBarMenu /> */}
            </ScrollToTop>
        </Router>
    )
}

export default AppContainer
