import React from 'react';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from '../configureStore';
import {ThemeProvider} from '@mui/material/styles';
import {Theme} from "../Theme/theme";

export const store = configureStore();

export const AppProvider = (props) => {
    return (
        <Provider store={store}>
            <Router basename="/ims">
                <ThemeProvider theme={Theme}>
                    <SnackbarProvider maxSnack={3}>
                        {props.children}
                    </SnackbarProvider>
                </ThemeProvider>
            </Router>
        </Provider>
    );
};
