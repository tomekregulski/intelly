import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';

import UserMenu from '../UserMenu/UserMenu';
import DataMenu from '../DataMenu/DataMenu';
import DesktopNavLoggedIn from './DesktopNavLoggedIn';

import { withStyles } from '@material-ui/styles';
import styles from '../../styles/NavStyles';
import image from '../../images/intelly_logo.png';

function Navbar(props) {
  const { user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = user;

  const [query, setQuery] = useState({});

  const [width, setWidth] = useState(window.innerWidth);

  const { classes, handleLogout } = props;

  useEffect(() => {
    if (Object.keys(userData).length) {
      setQuery({
        email: userData.email,
        password: userData.password,
      });
    }
  }, [userData]);

  const breakpoint = 1200;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <nav className={classes.nav}>
      <div className={classes.navLinks}>
        {width > breakpoint ? <DesktopNavLoggedIn /> : <DataMenu />}
        {width < breakpoint && (
          <a
            href={`https://gallant-wing-415919.netlify.app/?${query.email}&${query.password}`}
          >
            <img className={classes.logo} src={image} alt='Intelly' />
          </a>
        )}
        <UserMenu handleLogout={handleLogout} />
      </div>
    </nav>
  );
}

export default withStyles(styles)(Navbar);
