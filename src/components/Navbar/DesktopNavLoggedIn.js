import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../context/authContext';

import BrandSelect from '../DataMenu/BrandSelect';
import RegionSelect from '../DataMenu/RegionSelect';
import TimeframeSelect from '../DataMenu/TimeframeSelect';

import { withStyles } from '@material-ui/styles';
import styles from '../../styles/NavStyles';
import image from '../../images/intelly_logo.png';

function DesktopNavLoggedIn(props) {
  const { user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = user;

  const [query, setQuery] = useState({});

  const { classes } = props;

  useEffect(() => {
    if (Object.keys(userData).length) {
      setQuery({
        token: userData.token,
      });
    }
  }, [userData]);

  return (
    <div className={classes.desktopNavContainer}>
      <a href={`https://gallant-wing-415919.netlify.app/?${query.token}`}>
        <img
          className={classes.logo}
          style={{ marginRight: '30px' }}
          src={image}
          alt='Intelly'
        />
      </a>
      <BrandSelect />
      <RegionSelect />
      <TimeframeSelect />
    </div>
  );
}
export default withStyles(styles)(DesktopNavLoggedIn);
