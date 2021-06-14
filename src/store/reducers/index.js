
import {combineReducers} from 'redux';

import cartReducer from './cart.reducer';
import productReducer from './product.reducer';
const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});


export default rootReducer;
