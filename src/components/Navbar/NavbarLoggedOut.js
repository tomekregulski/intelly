import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from '../../styles/NavStyles';
import { Link } from 'react-router-dom';
import image from '../../images/intelly_logo.png';

function NavbarLoggedOut(props) {
  const { classes } = props;

  return (
    <nav className={classes.nav}>
      <div className='NavLinksRight'>
        <Link to='/'>
          <img className={classes.logo} src={image} alt='Intelly' />
        </Link>
      </div>
    </nav>
  );
}

export default withStyles(styles)(NavbarLoggedOut);
