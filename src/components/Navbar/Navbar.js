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
  const { setRegion, timeframeRegions, region } = useAPI();

  const { classes } = props;

  const handleChange = (event) => {
    event.preventDefault();
    setRegion('' || event.target.value);
  };

  return (
    <nav className={classes.nav}>
      <div>
        <FormControl id='regionSelect' className={classes.formControl}>
          <InputLabel>Select a Region</InputLabel>
          <Select
            style={{ width: '130px' }}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={region}
            onChange={handleChange}
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
