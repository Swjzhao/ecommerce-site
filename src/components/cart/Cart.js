import {Container, Typography} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';

import CartListing from './CartListing';
import useStyles from './styles';

const Cart = () => {
  // const isEmpty = useSelector((state) => state?.user?.cart?.total_items === 0);
  const cart = useSelector((state) => state.user.cart);
  const classes = useStyles();
  console.log(cart);

  return (
    <Container maxWidth={'lg'} className={classes.wrapper}>
      <Typography className={classes.title} variant='h4'>
        Your Shopping Cart
      </Typography>
      {cart?.line_items.length !== 0 ? (
          <CartListing cart={cart}/>
          ) : (
        <Typography variant='subtitle1'>
          You have no items in your shopping cart
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
