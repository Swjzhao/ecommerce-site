import {makeStyles} from '@material-ui/core/styles';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '64px',
  },
}));

const Scaffold = (props) => {
  const {children} = props;
  const classes = useStyles();
  return (
    <>

      <div className={classes.root}>
        {children}
      </div>
    </>
  );
};

export default Scaffold;
