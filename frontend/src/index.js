import React from 'react';

import ImsApp from './ImsApp';
import reportWebVitals from './reportWebVitals';
import {AppProvider} from "./component/AppProvider";
import * as ReactDOM from "react-dom";


const rootNode = document.getElementById('root');
ReactDOM.render(

    <React.StrictMode>
        <AppProvider>
            <ImsApp/>
        </AppProvider>
    </React.StrictMode>, rootNode);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
