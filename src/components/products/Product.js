import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import React from 'react';
import {useDispatch} from 'react-redux';

import {addToCart} from '../../store/actions';
import useStyles from './styles';

const Product = (props) => {
  const {product} = props;
  console.log(product);
  const classes = useStyles();

  const dispatch = useDispatch();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={
          product.media.source ??
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/330px-Clouds_over_the_Atlantic_Ocean.jpg'
        }
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant='h5' gutterBottom>
            {product.name}
          </Typography>
          <Typography variant='h5'>{`${product.price.formatted_with_symbol}`}</Typography>
        </div>
        <Typography variant='p' color='textSecondary' dangerouslySetInnerHTML={{__html: product.description}} />
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <IconButton aria-label='Add to Cart' onClick={() => {
          dispatch(addToCart(product.id, 1));
        }}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
