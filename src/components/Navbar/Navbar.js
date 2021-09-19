import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from '../../styles/NavStyles';
import { Link } from 'react-router-dom';
import image from '../../images/intelly_logo.png';
import { useAPI } from '../../context/apiContext';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

function Navbar(props) {
  const {
    userBrands,
    brand,
    setBrand,
    setRegion,
    currentBrandRegions,
    region,
  } = useAPI();

  const { classes, handleLogout } = props;

  const handleChangeRegion = (event) => {
    event.preventDefault();
    setRegion(event.target.value);
  };

  const handleChangeBrand = (event) => {
    event.preventDefault();
    setBrand(event.target.value);
  };

  return (
    <nav className={classes.nav}>
      <div className={classes.navLinks}>
        <FormControl id='regionSelect' className={classes.formControl}>
          <InputLabel>Select a Region</InputLabel>
          <Select
            style={{ width: '130px' }}
            labelId='regionLabel'
            id='regionSelect'
            value={region || ''}
            onChange={handleChangeRegion}
          >
            <MenuItem value={'all regions'}>All Regions</MenuItem>
            {currentBrandRegions.length
              ? currentBrandRegions.map((reg, index) => (
                  <MenuItem key={index} value={reg}>
                    {reg}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>

        <FormControl id='brandSelect' className={classes.formControl}>
          <InputLabel>Select a Brand</InputLabel>
          <Select
            style={{ width: '130px' }}
            labelId='brandLabel'
            id='brandSelect'
            value={brand || ''}
            onChange={handleChangeBrand}
          >
            {userBrands.length
              ? userBrands.map((brand, index) => (
                  <MenuItem key={index} value={brand}>
                    {brand.charAt(0).toUpperCase() +
                      brand.slice(1).toLowerCase()}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </div>
      <div className={classes.NavLinksRight}>
        <Button
          className={classes.logoutButton}
          variant='outlined'
          color='primary'
        >
          <Link
            className={classes.logoutButtonLink}
            to='/login'
            onClick={() => handleLogout()}
          >
            Logout
          </Link>
        </Button>
        <Link to='/'>
          <img className={classes.logo} src={image} alt='Intelly' />
        </Link>
      </div>
      {/* <div className={classes.navLinks}>
        <Link className={classes.navLinkItem} to='/contact'>
          Contact
        </Link>
      </div> */}
    </nav>
  );
}

export default withStyles(styles)(Navbar);
