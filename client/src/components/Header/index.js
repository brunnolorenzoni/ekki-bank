import React, { useState } from 'react';

import MenuAppBar from './MenuAppBar'
import MenuList from './MenuList'

const Header = () => {

    const [showMenu, setShowMenu] = useState(false);

    const toggleDrawer = (event) => {

        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setShowMenu(!showMenu);

    };

    return (
        <header>
            <MenuAppBar clickListener={toggleDrawer}/>
            <MenuList clickListener={toggleDrawer} open={showMenu}/>
        </header>
    )
}

export default Header;