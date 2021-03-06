import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import logo from '../../assets/EdenLogo.png';
import useStyles from './styles';
const NavBar = () => {
  const classes = useStyles();
  const count = useSelector((state) => state?.cart?.cart?.total_items);

  return (
    <AppBar position='fixed' className={classes.appBar} color='inherit'>
      <Toolbar>
        <Typography className={classes.logo} variant='h6'>
          <Link to='/'>
            <IconButton
              aria-label='Shopping cart'
              color='inherit'
              disableRipple
            >
              <img src={logo} alt='Title' height={40} styles={{resizeMode: 'contain'}} />
            </IconButton>
          </Link>
        </Typography>
        <div className={classes.grow} />
        <div className={classes.button}>

          <IconButton component={Link} to='/cart'aria-label='Shopping cart' color='inherit'>
            <Badge badgeContent={count} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>

        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
