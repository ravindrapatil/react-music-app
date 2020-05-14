import React from 'react';
import '../App.css';
import { Provider } from 'react-redux';
import store from '../appRedux/store';
import { GlobalState } from "./GlobalState";
import AppContainer from "./AppContainer";

function App() {
    return (
        <Provider store={store}>
            <GlobalState>
                <AppContainer />
            </GlobalState>
        </Provider>
    )
}

export default App
