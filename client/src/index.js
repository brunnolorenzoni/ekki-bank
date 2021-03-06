import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/';

import { Provider } from 'react-redux';
import store from './store/';

import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,

document.getElementById('app'));