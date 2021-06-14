import {Button, Container, Link, Typography} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';

import CartListing from '../components/cart/CartListing';
import useStyles from '../components/cart/styles';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const classes = useStyles();
  console.log(cart);

  return (
    <Container maxWidth={'lg'} className={classes.wrapper}>
      <Typography className={classes.title} variant='h4'>
        Your Shopping Cart
      </Typography>
      {cart?.line_items.length && cart?.line_items.length !== 0 ? (
          <CartListing cart={cart}/>
          ) : (
            <>
              <Typography variant='subtitle1'>
                      You have no items in your shopping cart
              </Typography>
              <Button component={Link}
                style={{textDecoration: 'none'}}
                to='/'
                type='button'
                variant='contained'
                color='primary'> Continue Shopping </Button>
            </>
      )}
    </Container>
  );
};

export default Cart;
