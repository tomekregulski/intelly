import * as React from 'react';
import Box from '@mui/material/Box';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useAPI } from '../../context/apiContext';

import styles from '../../styles/NavStyles';
import { withStyles } from '@material-ui/styles';

function DataMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const {
    userBrands,
    brand,
    setBrand,
    setRegion,
    currentBrandRegions,
    region,
    allBrandTimeframes,
    setCurrentTimeframe,
  } = useAPI();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeRegion = (event) => {
    event.preventDefault();
    setRegion(event.target.value);
  };

  const handleChangeBrand = (event) => {
    event.preventDefault();
    setBrand(event.target.value);
  };

  const handleChangeTimeframe = (event) => {
    event.preventDefault();
    setCurrentTimeframe(event.target.value);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
            <BubbleChartIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <FormControl
            id='brandMenu'
            // className={classes.formControl}
          >
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
        </MenuItem>
        <MenuItem>
          <FormControl
            id='timeframeMenu'
            // className={classes.formControl}
          >
            <InputLabel>Select a Timeframe</InputLabel>
            <Select
              style={{ width: '130px' }}
              labelId='timeframeSelect'
              id='timeframeSelect'
              value={''}
              onChange={handleChangeTimeframe}
            >
              {allBrandTimeframes.length
                ? allBrandTimeframes.map((timeframe, index) => (
                    <MenuItem key={index} value={timeframe}>
                      {timeframe}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl
            id='regionSelect'
            // className={classes.formControl}
          >
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
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default withStyles(styles)(DataMenu);
