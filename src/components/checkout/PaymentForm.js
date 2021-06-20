import {
  Backdrop, Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
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


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const PaymentForm = (props) => {
  const {backStep, checkoutToken, shippingData, nextStep} = props;
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [paymentError, setPaymentError] = useState(null);

  const classes = useStyles();

  const dispatch = useDispatch();
  const fetchShippingOptions = async (
      checkoutTokenId,
      country,
      stateProvince = null,
  ) => {
    const options = await commerce.checkout.getShippingOptions(
        checkoutTokenId,
        {country, region: stateProvince},
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
    setLoading(false);
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
    try {
      const {paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      const finalOrderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'Temp',
          street: shippingData.address1,
          town_city: shippingData.city,
          subDivision: shippingData.shippingSubdivision,
          country: shippingData.shippingCountry,
          postal_code: shippingData.zip,
        },
        fulfillment: {
          shipping_method: shippingOption,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },

      };

      setLoading(true);
      try {
        await dispatch(handleCheckout(checkoutToken.id, finalOrderData));
        setLoading(false);
        nextStep();
      } catch (err) {
        console.log('Error');
        setPaymentError(err.message);
        setLoading(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setPaymentError('Payment Incorrect');
    }
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
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
              <Typography variant='p' color={'secondary'} gutterBottom>
                {paymentError}
              </Typography>
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
