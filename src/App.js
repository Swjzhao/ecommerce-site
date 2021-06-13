import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {NavBar, ProductListings} from './components';
import Scaffold from './components/Scaffold';
import {commerce} from './lib/commerce';
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
      <NavBar />
      <Scaffold>
        <ProductListings
          products={products}/>
      </Scaffold>
    </div>
  );
};

export default App;
