import {
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import React, {useState} from 'react';

import {AddressForm, PaymentForm} from '../components/checkout';
import useStyles from '../components/checkout/styles';

const steps = ['Shipping', 'Payment', 'Confirmation'];

const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const classes = useStyles();
  const renderForm = (step) => {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
    }
  };
  return (
    <Container maxWidth={'lg'} className={classes.wrapper}>
      <Paper className={classes.paper}>
        <Typography variant='h4'>Checkout</Typography>
        <Stepper activeStep={step} className={classes.stepper}>
          {
            (steps.
                map((name) =>(
                  <Step key={name}>
                    <StepLabel>{name}</StepLabel>
                  </Step>),
                ))
          }
        </Stepper>
        {renderForm(step)}
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
