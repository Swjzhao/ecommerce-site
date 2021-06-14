import {Button, Container, Grid, Link, Typography} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';

import CartItem from './CartItem';
import useStyles from './styles';

const Cart = () => {
  // const isEmpty = useSelector((state) => state?.user?.cart?.total_items === 0);
  const cart = useSelector((state) => state.user.cart);
  const classes = useStyles();
  console.log(cart);

  const renderNonEmptyCart = () => {
    return ( <>
      <Grid container spacing={3}>
        {cart?.line_items.map((item) => {
          return (<Grid item xs={12} key={item.id}>
            <CartItem item={item} />
          </Grid>);
        })}
        <Grid item xs={12}>  <Typography variant='h4'>
          {' '}
          {`Subtotal:${cart?.subtotal.formatted_with_symbol}`}
        </Typography></Grid>
      </Grid>

      <div className={classes.cartActions}>

        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color="secondary"
          >
            Empty
          </Button>
          <Button
            className={classes.emptyButton}
            size='large'
            component={Link}
            to="/checkout"
            type='button'
            variant='contained'
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </> );
  };
  return (
    <Container maxWidth={'lg'} className={classes.wrapper}>
      <Typography className={classes.title} variant='h3'>
        Your Shopping Cart
      </Typography>
      {cart?.line_items.length !== 0 ? (
               renderNonEmptyCart()
          ) : (
        <Typography variant='subtitle1'>
          You have no items in your shopping cart
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
