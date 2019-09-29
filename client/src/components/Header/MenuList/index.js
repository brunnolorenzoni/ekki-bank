import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Home from '@material-ui/icons/Home';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import GroupIcon from '@material-ui/icons/Group';
import ListIcon from '@material-ui/icons/List';

import SideList from './SideList'

const MenuList = (props) => {

  const { clickListener, open } = props;

  const listItems = [

    {
      label: "Home",
      icon: <Home/>,
      href: "/"
    },

    {
      label: "Transferência",
      icon: <SwapHorizIcon/>,
      href: "/transaction"
    },

    {
      label: "Contatos",
      icon: <GroupIcon/>,
      href: "/contacts"
    },

    {
      label: "Extrato",
      icon: <ListIcon/>,
      href: "/historic"
    },


  ]

  const toggleDrawer = (event) => {
    clickListener();
  }
  
  return (
    <div>
      <SwipeableDrawer
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <SideList items={listItems} clickListener={clickListener}/>
      </SwipeableDrawer>
    </div>
  );
}

export default MenuList;