import { createStore, compose, combineReducers } from 'redux';

import user from './reducers/user';
import account from './reducers/account';
import transactions from './reducers/transactions';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const reducers = combineReducers({
    user, account, transactions
})
const store = createStore(reducers, composeEnhancer);

export default store;