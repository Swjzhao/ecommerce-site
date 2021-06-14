import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React from 'react';

import useStyles from './styles';

const ReviewForm = (props) => {
  const {checkoutToken} = props;
  const classes = useStyles();
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Summary
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((item) => (
          <ListItem key={item.name}>
            <ListItemIcon className={classes.itemIcon}>
              <img src={item.media.source} />
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant='body2'>
              {item.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary={'Total:'} />
          <Typography variant="h6">
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};
export default ReviewForm;
