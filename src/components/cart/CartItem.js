import {IconButton, MenuItem, Select, Typography} from '@material-ui/core';
import {DeleteRounded as DeleteRoundedIcon} from '@material-ui/icons';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {removeFromCart, updateCartQuantity} from '../../store/actions';
import {CustomizedSelect, range} from '../../utils';
import useStyles from './styles';

const qtyArray = range(1, 100);
const CartItem = (props) => {
  const {item} = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(item?.quantity ?item?.quantity : 0);

  const handleChange = (event) => {
    setQuantity(event.target.value);
    dispatch(updateCartQuantity(item.id, event.target.value));
  };


  return (
    <div className={classes.itemContainer} >
      <img src ={item.media.source } />

      <div className={classes.itemInfoBox}>
        <Typography variant="h6">{item.name}</Typography>
        <div className={classes.itemAction}>
          <Typography component="p">Quantity
            <Select
              value={quantity}
              onChange={handleChange}
              input={<CustomizedSelect />}
            >
              {qtyArray.map((num) =>
                <MenuItem value={num} key={num}>{num}</MenuItem>,
              )}

            </Select>
          </Typography>
        </div>
      </div>
      <div className={classes.itemPrice}>
        <Typography variant="h6">
          {item.price.formatted_with_symbol}
        </Typography>
        <IconButton size={'small'} onClick={()=> dispatch(removeFromCart(item.id))}>
          <DeleteRoundedIcon className={classes.icon} />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
