import React from 'react';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from '../configureStore';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "../Theme/theme";
import CssBaseline from "@mui/material/CssBaseline";

export const store = configureStore();

export const AppProvider = (props) => {
    return (
        <Provider store={store}>
            <Router basename="/ims">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <SnackbarProvider maxSnack={3}>
                        {props.children}
                    </SnackbarProvider>
               </ThemeProvider>
            </Router>
        </Provider>
    );
};
