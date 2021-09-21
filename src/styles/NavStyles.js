// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nav: {
    marginTop: '1rem',
    marginBottom: '.2rem',
  },
  logo: {
    width: '130px',
    margin: '0 auto 10px',
    display: 'block',
  },
  navLinks: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  navLinkItem: {
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
      maxWidth: '750px',
      margin: '1rem auto',
    },
    logo: {
      width: '10rem',
      margin: '.5rem 0 1rem 1rem',
    },
  },
  '@media screen and (min-width: 768px)': {},
  '@media screen and (min-width: 1366px)': {
    navLinks: {
      justifyContent: 'space-between',
    },
  },
  '@media screen and (min-width: 1550px)': {
    nav: {
      maxWidth: '1550px',
    },
  },
  '@media screen and (min-width: 1920px)': {},
};
