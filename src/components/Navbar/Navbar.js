import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from '../../styles/NavStyles';
import { Link } from 'react-router-dom';
import image from '../../images/intelly_logo.png';

function Navbar(props) {
  const { classes } = props;
  return (
    <nav className={classes.nav}>
      <div>
        <Link to='/'>
          <img className={classes.logo} src={image} alt='Intelly' />
        </Link>
      </div>
      <div className={classes.navLinks}>
        <Link className={classes.navLinkItem} to='/contact'>
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default withStyles(styles)(Navbar);
