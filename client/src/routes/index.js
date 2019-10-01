import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../pages/Home'
import Transaction from '../pages/Transaction'
import Historic from '../pages/Historic'

const Routes = () => {
    return (
        <BrowserRouter basename="/">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/transaction' component={Transaction} />
                <Route exact path='/historic' component={Historic} />
                <Route component={() => <h1>Not Found</h1>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;