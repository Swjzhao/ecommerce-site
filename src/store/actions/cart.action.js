// import * as api from '../../api';
import {commerce} from '../../lib/commerce';
import * as types from '../constants';

export const addAllCart = () => async (dispatch) => {
  try {
    const res = await commerce.cart.retrieve();
    dispatch({type: types.SET_CART, payload: res});
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = (cartItemId, quantity) => async (dispatch) => {
  try {
    const res = await commerce.cart.add(cartItemId, quantity);

    dispatch({type: types.SET_CART, payload: res.cart});
  } catch (err) {
    console.log(err);
  }
};

export const updateCartQuantity = (cartItemId, quantity) => async (dispatch) => {
  try {
    const res = await commerce.cart.update(cartItemId, {quantity});
    dispatch({type: types.SET_CART, payload: res.cart});
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCart = (cartItemId) => async (dispatch) => {
  try {
    const res = await commerce.cart.remove(cartItemId);

    dispatch({type: types.SET_CART, payload: res.cart});
  } catch (err) {
    console.log(err);
  }
};
export const emptyCart = () => async (dispatch) => {
  try {
    const res= await commerce.cart.empty();
    dispatch({type: types.SET_CART, payload: res.cart});
  } catch (err) {
    console.log(err);
  }
};
export const refreshCart = () => async (dispatch) => {
  try {
    const res = await commerce.cart.refresh();
    dispatch({type: types.SET_CART, payload: res});
  } catch (err) {
    console.log(err);
  }
};

export const handleCheckout = (checkoutTokenId, newOrder) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await commerce.checkout.capture(checkoutTokenId, newOrder);
      dispatch({type: types.SET_ORDER, payload: res});
      dispatch(refreshCart());
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};


