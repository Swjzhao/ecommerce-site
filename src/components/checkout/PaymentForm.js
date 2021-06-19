import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {commerce} from '../../lib/commerce';
import {handleCheckout} from '../../store/actions/cart.action';
import FormNavButtons from './FormNavButtons';
import ReviewForm from './ReviewForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = (props) => {
  const {backStep, checkoutToken, shippingData, nextStep, getToken} = props;
  console.log(shippingData);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const fetchShippingOptions = async (
      checkoutTokenId,
      country,
      stateProvince = null,
  ) => {
    console.log(country);
    console.log(stateProvince);
    const options = await commerce.checkout.getShippingOptions(
        checkoutTokenId,
        {country, region: stateProvince},
    );
    console.log(options);
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingOptions(
        checkoutToken.id,
        shippingData.shippingCountry,
        shippingData.shippingSubdivision,
    );
  }, [checkoutToken, shippingData]);

  useEffect(() => {
    commerce.checkout.checkShippingOption(checkoutToken.id, {
      shipping_option_id: shippingOption,
      country: shippingData.shippingCountry,
      region: shippingData.shippingSubdivision,
    }).then((response) => console.log(response));
  });

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
    console.log(paymentMethod);

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
    const dispatch = useDispatch();
    dispatch(handleCheckout(checkoutToken.id, finalOrderData));
    nextStep();
  };
  return (
    <div>
      <ReviewForm checkoutToken={checkoutToken} />
      <Divider />
      <Grid item xs={12} sm={6}>
        <FormControl component='fieldset' styles={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

          <Typography variant='h6' gutterBottom>
     Shipping Method
          </Typography>
          <FormGroup>
            {shippingOptions
                .map((sO) => ({
                  id: sO.id,
                  name: `${sO.description}`,
                  label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                }))
                .map((item) => (
                  <FormControlLabel
                    key={item.id}
                    value={item.id}
                    control={
                      <Checkbox
                        color={'primary'}
                        checked={shippingOption === item.id}
                        onChange={(e) => setShippingOption(e.target.value)}
                        name={item.label}
                      />
                    }
                    label={item.label}
                  />
                ))}
          </FormGroup>
        </FormControl>
      </Grid>
      <Divider />
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
