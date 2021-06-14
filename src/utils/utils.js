import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';

export const range = (start, end) => {
  return Array(end - start + 1).fill().map((_, idx) => start + idx);
};

export const CustomizedSelect = withStyles((theme) => ({
  input: {

    'position': 'relative',
    'fontSize': 16,
    'padding': '10px 35px 10px 12px',
    'transition': theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {

      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
