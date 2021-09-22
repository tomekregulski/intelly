import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UserMenu from '../UserMenu/UserMenu';
import DataMenu from '../DataMenu/DataMenu';
import DesktopNavLoggedIn from './DesktopNavLoggedIn';

import { withStyles } from '@material-ui/styles';
import styles from '../../styles/NavStyles';
import image from '../../images/intelly_logo.png';

function Navbar(props) {
  const [width, setWidth] = useState(window.innerWidth);

  const { classes, handleLogout } = props;

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
          <Link to='/'>
            <img className={classes.logo} src={image} alt='Intelly' />
          </Link>
        )}
        <UserMenu handleLogout={handleLogout} />
      </div>
    </nav>
  );
}

export default withStyles(styles)(Navbar);
