import React from 'react';
import { Provider } from 'react-redux';

import ImsApp from './ImsApp';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import * as ReactDOM from "react-dom";
import {store} from "./redux/store";

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter basename="/ims">
            <ImsApp />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>, container
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
