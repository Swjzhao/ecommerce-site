import * as types from '../constants';

const initState = {
  cart: null,
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_ALL_CART:
      console.log(action.payload);
      return {
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
