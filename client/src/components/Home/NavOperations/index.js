import React from 'react';

import { SwapHoriz } from '@material-ui/icons/';

const NavOperations = () => {

    return (
        <nav className="nav nav-home nav-operations">
            <button type="button" className="btn-operations">
                <SwapHoriz className="icon"/>
                <p className="text">Fazer transferência</p>
            </button>
        </nav>
    )
}

export default NavOperations;