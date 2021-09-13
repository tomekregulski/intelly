// eslint-disable-next-line import/no-anonymous-default-export
export default {
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4rem',
  },
  heading: {
    margin: '2rem 2rem 0 2rem',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
  },
  input: {
    width: '70%',
    padding: '1rem',
    color: 'black',
    backgroundColor: 'rgba(69,69,122,.4)',
    border: 'none',
    borderBottom: '1px solid black',
    transition: 'ease-in',
    marginBottom: '2rem',
    '&::placeholder': {
      color: 'black',
      opacity: '1',
    },
  },
  textarea: {
    width: '70%',
    padding: '1rem',
    color: 'black',
    backgroundColor: 'rgba(69,69,112,.4)',
    border: 'none',
    borderBottom: '1px solid black',
    marginBottom: '2rem',
    transition: 'ease-in',
    resize: 'none',
    '&::placeholder': {
      color: 'black',
      opacity: '1',
    },
  },
  prompt: {
    display: 'flex',
    flexDirection: 'column',
  },
  prompt: {
    display: 'flex',
    flexDirection: 'column',
  },

  firstLine: {
    paddingBottom: '10px',
  },
  submitBtn: {
    animation: '$moveInBottom 5000ms',
    background: 'transparent',
    border: '2px solid #17D0FF',
    color: 'black',
    padding: '.5rem 3rem',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: '400',
    transition: '.7s',
    '&:hover': {
      transform: 'translateY(-3px)',
      background: 'transparent',
      boxShadow: '0 0.3rem 0.2rem rgba(0, 0, 0, 0.256)',
      transition: '.7s',
    },
    '&active': {
      transform: 'translateY(-1px)',
      boxShadow: '0 0.2rem 0.1rem rgba(0, 0, 0, 0.256)',
      transition: '0.4s',
    },
  },
  '@media screen and (min-width: 360px)': {},
  '@media screen and (min-width: 375px)': {},
  '@media screen and (min-width: 411px)': {},
  '@media screen and (min-width: 660px)': {
    input: {
      width: '460px',
    },
    textarea: {
      width: '460px',
    },
  },
  '@media screen and (min-width: 768px)': {},
  '@media screen and (min-width: 1366px)': {
    heading: {
      marginTop: '2rem',
      paddingTop: '4rem',
    },
  },
  '@media screen and (min-width: 1920px)': {},
};
