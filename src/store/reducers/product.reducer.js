import * as types from '../constants';

const initState = {
  products: null,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_ALL_PRODUCTS:
      return {
        products: action.payload,
      };
    default:
      return state;
  }
};


export default productReducer;
