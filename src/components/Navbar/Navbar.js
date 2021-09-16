import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from '../../styles/NavStyles';
import { Link } from 'react-router-dom';
import image from '../../images/intelly_logo.png';
import { useAPI } from '../../context/apiContext';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Navbar(props) {
  const { brand, setBrand, setRegion, timeframeRegions, region } = useAPI();

  const { classes } = props;

  const handleChangeRegion = (event) => {
    event.preventDefault();
    setRegion('' || event.target.value);
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
            value={region}
            onChange={handleChangeRegion}
          >
            <MenuItem value={'all regions'}>All Regions</MenuItem>
            {timeframeRegions.length
              ? timeframeRegions.map((reg, index) => (
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
            value={brand}
            onChange={handleChangeBrand}
          >
            <MenuItem value={'SIMMER'}>Simmer</MenuItem>
            <MenuItem value={'SaSo'}>Saso</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
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
