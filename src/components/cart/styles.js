import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cartActions: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
  itemContainer: {
    'minHeight': '200px',
    'flexGrow': 1,
    'display': 'flex',
    'padding': '10px',
    'flexDirection': 'row',

    '& img': {
      objectFit: 'contain',
      height: '200px',
      width: '200px',
      paddingLeft: '10px',

      paddingRight: '10px',
    },
  },
  itemInfoBox: {
    paddingLeft: '10px',

    paddingRight: '10px',
    flexGrow: 1,
  },
  itemPrice: {
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

}));
