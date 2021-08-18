// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nav: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    borderBottom: '1px solid rgb(45, 179, 244)',
    marginBottom: '.5rem',
  },
  logo: {
    width: '10rem',
    margin: '1rem 0 1rem 2rem',
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '.5rem',
  },
  //   firstNavLinks: {
  //     display: 'flex',
  //     justifyContent: 'center',
  //   },
  //   secondNavLinks: {
  //     display: 'flex',
  //     justifyContent: 'center',
  //   },
  navLinkItem: {
    marginRight: '.5rem',
    // marginLeft: '.5rem',
    marginBottom: '.5rem',
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
  '@media screen and (min-width: 411px)': {},
  '@media screen and (min-width: 768px)': {
    nav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginLeft: '2rem',
      marginBottom: '1rem',
    },
  },
  '@media screen and (min-width: 1366px)': {
    navLinks: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    navLinkItem: {
      marginBottom: '0',
      marginRight: '4rem',
    },
  },
  '@media screen and (min-width: 1920px)': {},
};
