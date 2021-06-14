import {Typography} from '@material-ui/core';
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React from 'react';

import FormNavButtons from './FormNavButtons';
import ReviewForm from './ReviewForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = (props) => {
  const {backStep, checkoutToken} = props;

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const {err, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (err) {
      console.log(err);
      return;
    }

    const finalOrderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: 'Temp',
        street: shippingData.addrees1,
        town_city: shippingData.city,
        subDivision: shippingData.shippingSubdivision,
        country: shippingData.shippingCountry,
        postal_code: shippingData.zip,
      },
      fulfillment: {
        shipping_method: shippingData.shippingOption,
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      },
    };
  };
  return (
    <div>
      <ReviewForm checkoutToken={checkoutToken} />

      <Typography variant='h6' gutterBottom>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe}) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <FormNavButtons step={1} backStep={backStep} />
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
