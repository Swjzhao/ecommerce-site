import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '74px',
  },
}));

const Scaffold = (props) => {
  const {children} = props;
  const classes = useStyles();
  return (
    <Container maxWidth={false} className={classes.root}>
      {children}
    </Container>
  );
};

export default Scaffold;
