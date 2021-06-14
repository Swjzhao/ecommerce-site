import {
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {AddressForm, PaymentForm, ReviewForm} from '../components/checkout';
import useStyles from '../components/checkout/styles';
import {commerce} from '../lib/commerce';

const steps = ['Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  const cart = useSelector((state) => state.cart.cart);

  const next = (data) => {
    if (step === 0) {
      setShippingData(data);
    }
    console.log(data);
    nextStep();
  };


  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const backStep = () => setStep((prevStep) => prevStep > 0? prevStep - 1: prevStep);

  const renderForm = (step, checkoutToken) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            checkoutToken={checkoutToken}
            step={step}
            next={next}
          />
        );
      case 1:
        return (
          <PaymentForm
            checkoutToken={checkoutToken}
            nextStep={nextStep}
            backStep={backStep}
          />
        );
      case 2:
        return (
          <ReviewForm
            checkoutToken={checkoutToken}
            nextStep={nextStep}
            backStep={backStep}
          />
        );
    }
  };

  const getToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: 'cart',
      });
      console.log(token);
      setCheckoutToken(token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
    return () => {};
  }, [cart]);

  return (
    <Container maxWidth={'lg'} className={classes.wrapper}>
      <Paper className={classes.paper}>
        <Typography variant='h4'>Checkout</Typography>
        <Stepper activeStep={step} className={classes.stepper}>
          {steps.map((name) => (
            <Step key={name}>
              <StepLabel>{name}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {checkoutToken && renderForm(step, checkoutToken)}
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
