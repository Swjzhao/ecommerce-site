import {
  AppBar,
  Badge,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import React from 'react';
import {useSelector} from 'react-redux';

import logo from '../../assets/EdenLogo.png';
import useStyles from './styles';
const NavBar = () => {
  const classes = useStyles();
  const count = useSelector((state) => state?.user?.cart?.total_items);

  return (
    <AppBar position='fixed' className={classes.appBar} color='inherit'>
      <Toolbar>
        <Typography className={classes.logo} variant='h6'>
          <Link href='/'>
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
          <Link href='/cart'>
            <IconButton aria-label='Shopping cart' color='inherit'>
              <Badge badgeContent={count} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
