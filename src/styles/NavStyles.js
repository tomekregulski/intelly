// import { CssBaseline } from '@material-ui/core';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nav: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '.2rem',
  },
  logo: {
    width: '130px',
    margin: '0 auto 10px',
    display: 'block',
  },
  navLinks: {
    '& #regionSelect': {
      marginRight: '10px',
    },
    '& #brandSelect': {
      marginLeft: '10px',
    },
  },
  NavLinksRight: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    borderColor: 'black',
    // border: 'solid .5px black',
    color: 'black',
  },
  logoutButtonLink: {
    color: 'black',
    textDecoration: 'none',
    '&visited': {
      color: 'black',
    },
  },
  navLinkItem: {
    marginRight: '.5rem',
    // marginLeft: '.5rem',
    // marginBottom: '.5rem',
    transition: 'all .5s',
    textDecoration: 'none',
    color: 'black',
    '&:visited': {
      color: 'black',
    },
    '&:hover': {
      color: 'white',
      textShadow: '0.2rem 0.2rem 10px black',
    },
  },
  '@media screen and (min-width: 360px)': {},
  '@media screen and (min-width: 411px)': {
    nav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '1rem 1.5rem 1rem 1.5rem',
      // marginBottom: '1rem',
    },
    logo: {
      width: '10rem',
      margin: '.5rem 0 1rem 1rem',
    },
  },
  '@media screen and (min-width: 768px)': {},
  '@media screen and (min-width: 1366px)': {
    navLinks: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    NavLinksRight: {
      width: '300px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    navLinkItem: {
      marginBottom: '0',
      marginRight: '4rem',
    },
    logoutButton: {
      marginBottom: '5px',
      marginRight: '10px',
    },
  },
  '@media screen and (min-width: 1920px)': {},
};
