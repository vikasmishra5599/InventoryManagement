import React from 'react';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import {ConnectedRouter} from 'connected-react-router';
import configureStore, {history} from '../configureStore';
import {ThemeProvider} from '@mui/material/styles';
import {Theme} from "../Theme/theme";

export const store = configureStore();

export const AppProvider = (props) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={Theme}>
                    <SnackbarProvider maxSnack={3}>
                        {props.children}
                    </SnackbarProvider>
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
};
