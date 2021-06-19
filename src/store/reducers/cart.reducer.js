import * as types from '../constants';

const initState = {
  cart: null,
  order: null,
};
const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_CART:
      // console.log(action.payload);
      return {
        ...state,
        cart: action.payload,
      };
    case types.SET_ORDER: return {
      ...state,
      order: action.payload,
    };
    default:
      return state;
  }
};

export default cartReducer;
