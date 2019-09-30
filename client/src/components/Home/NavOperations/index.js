import React from 'react';
import { Link } from 'react-router-dom'

import { SwapHoriz } from '@material-ui/icons/';

const NavOperations = () => {

    return (
        <nav className="nav nav-home nav-operations">
            <button type="button" className="btn-operations">
                <Link to="/transaction">
                    <SwapHoriz className="icon"/>
                    <p className="text">Fazer transferência</p>
                </Link>
            </button>
        </nav>
    )
}

export default NavOperations;