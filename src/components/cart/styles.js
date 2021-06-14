import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    paddingTop: 20,
  },
  listingContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  checkoutButton: {
    borderRadius: '50px',
    textDecoration: 'none !important',
  },
  buttonLabel: {
    textTransform: 'none',
  },
  link: {
    textDecoration: 'none',
    textTransform: 'none',
  },
  cartActions: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'center',
  },
  itemContainer: {
    'minHeight': '200px',
    'flexGrow': 1,
    'display': 'flex',
    'flexDirection': 'row',
    [theme.breakpoints.down('xs')]: {
      'minHeight': '150px',

    },

    '& img': {
      objectFit: 'contain',
      height: '200px',
      width: '200px',
      paddingLeft: '10px',
      paddingRight: '10px',
      [theme.breakpoints.down('xs')]: {
        height: '80px',
        width: '80px',
      },
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
  summaryItems: {
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
