import React from 'react';
import { Link } from 'react-router-dom';

import UserMenu from '../UserMenu/UserMenu';
import DataMenu from '../DataMenu/DataMenu';

import { withStyles } from '@material-ui/styles';
import styles from '../../styles/NavStyles';
import image from '../../images/intelly_logo.png';

function Navbar(props) {
  const { classes, handleLogout } = props;

  return (
    <nav className={classes.nav}>
      <div className={classes.navLinks}>
        <DataMenu />
        <Link to='/'>
          <img className={classes.logo} src={image} alt='Intelly' />
        </Link>
        <UserMenu handleLogout={handleLogout} />
      </div>
    </nav>
  );
}

export default withStyles(styles)(Navbar);
