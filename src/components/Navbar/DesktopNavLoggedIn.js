import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BrandSelect from '../DataMenu/BrandSelect';
import RegionSelect from '../DataMenu/RegionSelect';
import TimeframeSelect from '../DataMenu/TimeframeSelect';

import { withStyles } from '@material-ui/styles';
import styles from '../../styles/NavStyles';
import image from '../../images/intelly_logo.png';

function DesktopNavLoggedIn(props) {
  const { classes } = props;

  return (
    <div className={classes.desktopNavContainer}>
      <Link style={{ marginRight: '30px' }} to='/'>
        <img className={classes.logo} src={image} alt='Intelly' />
      </Link>
      <BrandSelect />
      <RegionSelect />
      <TimeframeSelect />
    </div>
  );
}
export default withStyles(styles)(DesktopNavLoggedIn);
