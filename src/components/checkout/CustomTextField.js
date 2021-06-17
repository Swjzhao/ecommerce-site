import {Grid, TextField} from '@material-ui/core';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

const CustomTextField = (props) => {
  const {control} = useFormContext();
  const {name, label, required, col} = props;
  return (
    <Grid item xs={12} sm={col ?? 12}>
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <TextField
            fullWidth

            label={label}
            required={required}
            {...field}
            variant="outlined"
          />
        )}/>
    </Grid>
  );
};

export default CustomTextField;
