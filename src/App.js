import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import {NavBar} from './components';
import Scaffold from './components/Scaffold';
import {commerce} from './lib/commerce';
import {CartPage, CheckoutPage, HomePage} from './pages';
import {addAllCart} from './store/actions';

const App = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await commerce.products.list();
    setProducts(res.data);
    // console.log(res);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    dispatch(addAllCart());
  }, []);

  return (
    <div>
      <Router>
        <NavBar />
        <Scaffold>
          <Switch>
            <Route exact path='/'>
              <HomePage products={products} />
            </Route>
            <Route exact path='/cart'>
              <CartPage />
            </Route>
            <Route exact path='/checkout'>
              <CheckoutPage />
            </Route>
            <Route path='/'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Scaffold>
      </Router>

    </div>
  );
};

export default App;
