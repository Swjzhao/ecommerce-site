import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {commerce} from '../../lib/commerce';
import CustomTextField from './CustomTextField';
import FormNavButtons from './FormNavButtons';

const AddressForm = (props) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  // const [shippingOptions, setShippingOptions] = useState([]);
  // const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();

  const {checkoutToken, next} = props;

  const fetchShippingCountries = async (checkoutTokenId) => {
    const res = await commerce.services.localeListShippingCountries(
        checkoutTokenId,
    );
    setShippingCountries(res.countries);
    setShippingCountry(Object.keys(res.countries)[0]);

    // Object.entries(shippingCountries)
    //                .map(([code, name]) => ({id: code, label: name}))
  };

  const fetchSubDivision = async (countryCode) => {
    const res = await commerce.services.localeListSubdivisions(countryCode);
    // console.log(res);
    setShippingSubdivisions(res.subdivisions);
    if (res.subdivisions.length > 0) {
      setShippingSubdivision(Object.keys(res.subdivisions)[0]);
    }
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id);
    return () => {};
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubDivision(shippingCountry);
    }
  }, [shippingCountry]);

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({...data, shippingCountry, shippingSubdivision}),
          )}
        >
          <Grid container spacing={3}>
            <CustomTextField required name='email' label='Email' />
            <CustomTextField
              required
              name='firstName'
              label='First Name'
              col={6}
            />
            <CustomTextField
              required
              name='lastName'
              label='Last Name'
              col={6}
            />
            <CustomTextField required name='address1' label='Address Line 1' />
            <CustomTextField required name='city' label='City' />
            <Grid item xs={12} sm={4}>
              <FormControl variant='outlined' required fullWidth>
                <InputLabel>Country</InputLabel>

                <Select
                  variant='outlined'
                  value={shippingCountry}
                  label='Country'
                  name='country'
                  fullWidth
                  required
                  onChange={(e) => setShippingCountry(e.target.value)}
                >
                  {Object.entries(shippingCountries)
                      .map(([code, name]) => ({id: code, label: name}))
                      .map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                variant='outlined'
                required={Object.values(shippingSubdivisions).length > 0}
                fullWidth
              >
                <InputLabel>Region</InputLabel>
                <Select
                  value={shippingSubdivision}
                  fullWidth
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                  label='Region'
                  name='region'
                >
                  {Object.entries(shippingSubdivisions)
                      .map(([code, name]) => ({id: code, label: name}))
                      .map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
            <CustomTextField required name='zip' label='Postal Code' col={4} />
          </Grid>
          <br />

          <FormNavButtons step={0} />
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
