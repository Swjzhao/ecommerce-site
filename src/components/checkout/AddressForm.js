import {Grid, Typography} from '@material-ui/core';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import CustomTextField from './CustomTextField';

const AddressForm = () => {
  const methods = useForm();
  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form >
          <Grid container spacing={3}>
            <CustomTextField required name="firstName" label="First Name" half />
            <CustomTextField required name="lastName" label="Last Name" half />
            <CustomTextField required name="address1" label="Address Line 1"/>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
