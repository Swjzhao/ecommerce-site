import {Button, Link} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  navButtonContainer: {display: 'flex', justifyContent: 'space-between'},
}));
const FormNavButtons = (props) => {
  const {backStep} = props;
  const classes = useStyles();
  return (
    <div className={classes.navButtonContainer}>
      {props.step && props.step == 0 ?
        <Button component={Link} variant="outlined" href="/cart">Back to Cart</Button> :
        <Button variant="outlined" onClick={backStep}>Back</Button>}
      <Button type="submit" variant="contained" color="primary">
        {props.step && props.step == 1 ?'Place Order' : 'Next' }</Button>
    </div>
  );
};

export default FormNavButtons;
