// import * as api from '../../api';
import {commerce} from '../../lib/commerce';
import * as types from '../constants';

export const addAllCart = () => async (dispatch) => {
  try {
    const res = await commerce.cart.retrieve();
    dispatch({type: types.ADD_ALL_CART, payload: res});
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    const res = await commerce.cart.add(productId, quantity);
    console.log(res);
    dispatch({type: types.ADD_ALL_CART, payload: res.cart});
  } catch (err) {
    console.log(err);
  }
};
