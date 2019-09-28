import { createStore, compose, combineReducers } from 'redux';

import user from './reducers/user';
import account from './reducers/account';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const reducers = combineReducers({
    user, account
})
const store = createStore(reducers, composeEnhancer);

export default store;