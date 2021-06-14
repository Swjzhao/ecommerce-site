import React from 'react';

import ProductListings from '../components/products/ProductListings';
const HomePage = (props) => {
  return (
    <>
      <ProductListings products={props.products}/>
    </>
  );
};

export default HomePage;
