import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 'auto',
  },
  link: {
    display: 'block',
    width:  '100%'
  },
  text: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    minWidth: 'auto',
    marginRight: '3px'
  }
});

const SideList = (props) => {

  const { clickListener, items } = props;

  const classes = useStyles();

  const toggleDrawer = (event) => {
    clickListener();
  }

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
    >
      <List>
        {items.map((item, index) => (
          <ListItem button key={index}>
            <Link className={classes.link} to={item.href}>
              <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
              <ListItemText className={classes.text} primary={item.label} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SideList;