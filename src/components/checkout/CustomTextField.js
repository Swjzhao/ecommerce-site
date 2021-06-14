import {Grid, TextField} from '@material-ui/core';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

const CustomTextField = (props) => {
  const {control} = useFormContext();
  const {name, label, required, col} = props;
  return (
    <Grid item xs={12} sm={col ?? 12}>
      <Controller
        render={({field}) => (
          <TextField
            fullWidth
            name={name}
            label={label}
            required={required}
            variant="outlined"
          />
        )}
        control={control}/>
    </Grid>
  );
};

export default CustomTextField;
