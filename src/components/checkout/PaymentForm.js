import {Typography} from '@material-ui/core';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React from 'react';

import FormNavButtons from './FormNavButtons';

const stripePromise = loadStripe();

const PaymentForm = (props) => {
  const {backStep} = props;
  return (
    <div>
      <Typography variant="h6" gutterBottom>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe}) => (
            <form>
              <CardElement />
              <br />
              <br />
              <FormNavButtons step={1} backStep={backStep}/>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
