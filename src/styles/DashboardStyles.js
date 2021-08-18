// eslint-disable-next-line import/no-anonymous-default-export
export default {
  '@keyframes hiSlide': {
    '0%': {
      opacity: '0',
      // transform: 'translateX(-100px)',
    },
    '30%': {
      opacity: '0',
    },
    // '70%': {
    //   opacity: '.5',
    // transform: 'translateX(-100px)',
    // },
    '100%': {
      opacity: '1',
      // transform: 'translateX(0)',
    },
  },
  '@keyframes moveInBottom': {
    '0%': {
      opacity: '0',
      transform: 'translateY(30px)',
    },
    '80%': {
      opacity: '0',
      transform: 'translateY(30px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)',
    },
  },
  '@media screen and (min-width: 360px)': {},
  '@media screen and (min-width: 375px)': {},
  '@media screen and (min-width: 411px)': {},
  '@media screen and (min-width: 768px)': {},
  '@media screen and (min-width: 1366px)': {},
  '@media screen and (min-width: 1920px)': {},
};
