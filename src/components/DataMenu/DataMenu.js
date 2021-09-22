import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BarChartIcon from '@mui/icons-material/BarChart';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BrandSelect from './BrandSelect';
import RegionSelect from './RegionSelect';
import TimeframeSelect from './TimeframeSelect';

import styles from '../../styles/NavStyles';
import { withStyles } from '@material-ui/styles';

function DataMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
            <BarChartIcon />
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
          <BrandSelect />
        </MenuItem>
        <MenuItem>
          <TimeframeSelect />
        </MenuItem>
        <MenuItem>
          <RegionSelect />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default withStyles(styles)(DataMenu);
