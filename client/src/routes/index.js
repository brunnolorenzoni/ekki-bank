import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../pages/Home'

const Routes = () => {
    return (
        <BrowserRouter basename="/">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route component={() => <h1>Not Found</h1>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;