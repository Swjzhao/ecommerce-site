import {AppBar, Badge, IconButton, Toolbar, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import React from 'react';
import {useSelector} from 'react-redux';

import useStyles from './styles';

const NavBar = () => {
  const classes = useStyles();
  const count = useSelector((state) => state?.user?.cart?.total_items);


  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography className={classes.logo} variant="h6">
          <img src='' alt="Title" className={classes.logoImg} />
                  Title
        </Typography>
        <div className={classes.grow} />
        <div className={classes.button}>
          <IconButton aria-label="Shopping cart" color="inherit">
            <Badge badgeContent={count} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
