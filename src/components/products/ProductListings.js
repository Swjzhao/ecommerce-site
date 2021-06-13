import {Container, Grid} from '@material-ui/core';
import React from 'react';

import Product from './Product';
import useStyles from './styles';

const mockProducts = [
  {id: 1, name: 'Shoes', description: 'Running shoes.', price: 5},
  {id: 2, name: 'Macbook', description: 'Apple macbook.', price: 10},
];

const ProductListings = (props) => {
  const classes = useStyles();
  const {products} = props;
  return (
    <Container maxWidth={false} className={classes.listWrapper}>

      <Grid container justify="center" spacing={4}>
        {products.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={6} lg={3}>
              <Product product={item}/>
            </Grid>);
        })}
      </Grid>

    </Container>
  );
};

export default ProductListings;
