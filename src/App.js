import React from 'react';

import {NavBar, ProductListings} from './components';
import Scaffold from './components/Scaffold';

const App = () => {
  return (
    <div>
      <NavBar />
      <Scaffold>
        <ProductListings />
      </Scaffold>
    </div>
  );
};

export default App;
