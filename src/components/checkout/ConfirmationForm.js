import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const ConfirmationForm = () => {
  const order = useSelector((state) => state.cart.order);
  return (
    <>
      {' '}
      {order.customer ? (
        <div>
          <Typography variant='h5'>
            Thank you for your purchase {order.customer.firstname}{' '}
            {order.customer.lastname}!
          </Typography>
          <Typography variant='h6'>
            Your total is {order.order.total.formatted_with_symbol}
          </Typography>
          <Divider />
          <Typography variant='subtitle2'>
            Order Ref: {order.customer_reference}
          </Typography>
          <br />
          <Button component={Link} to='/' variant='outlined' type='button'>
            Back to home
          </Button>
        </div>
      ) : (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </>
  );
};

export default ConfirmationForm;
