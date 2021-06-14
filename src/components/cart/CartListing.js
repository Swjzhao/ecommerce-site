import {Button, Divider, Grid, Link, Typography} from '@material-ui/core';
import React from 'react';

import CartItem from './CartItem';
import useStyles from './styles';

const CartListing = (props) => {
  const classes = useStyles();
  const {cart} = props;
  return (
    <Grid container className={classes.listingContainer} spacing={2}>
      <Grid item xs={12} sm={12} md={9}>
        <Grid container spacing={3}>
          {cart?.line_items.map((item) => {
            return (
              <Grid item xs={12} key={item.id}>
                <CartItem item={item} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <Typography variant='h6'>Summary</Typography>
        <div>
          <Typography component='p' className={classes.summaryItems}>
            <div>Subtotal:</div>
            {`${cart?.subtotal.formatted_with_symbol}`}
          </Typography>
          <Typography component='p' className={classes.summaryItems}>
            <div>Estimated Shipping:</div>
            {`-`}
          </Typography>
          <Typography component='p' className={classes.summaryItems}>
            <div>Taxes:</div>
            {`-`}
          </Typography>
        </div>
        <Divider />
        <div>
          <Typography component='p' className={classes.summaryItems}>
            <div>Total:</div>
            {`${cart?.subtotal.formatted_with_symbol}`}
          </Typography>
        </div>
        <Divider />
        <div className={classes.cartActions}>
          <Button
            className={classes.emptyButton}
            size='large'
            component={Link}
            href='/checkout'
            type='button'
            variant='contained'
            color='primary'
            fullWidth
            classes={{label: classes.buttonLabel}}
            style={{textDecoration: 'none'}}
          >
            Checkout
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default CartListing;
