import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import axios from 'axios';

import Box from '@mui/material/Box';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

import styles from '../../styles/NavStyles';
import { withStyles } from '@material-ui/styles';

const UserButton = styled(Button)({
  color: 'rgba(0, 180, 249, 0.872)',
  borderColor: 'rgba(0, 180, 249, 0.872)',
  backgroundColor: 'none',
});

function UserMenu(props) {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = user;

  const [anchorEl, setAnchorEl] = useState(null);
  const [width, setWidth] = React.useState(window.innerWidth);

  const open = Boolean(anchorEl);

  const { classes, handleLogout } = props;

  const breakpoint = 650;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginStatus = () => {
    async function fetchData() {
      const apiResponse = await axios.get(
        `https://intelly-auth-service.herokuapp.com/api/users/current-user`,
        // 'http://localhost:5000/api/users/current-user',
        { withCredentials: true }
      );
      console.log(apiResponse);
      //  setAuthState(apiResponse);
    }
    fetchData();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          {width > breakpoint ? (
            <>
              {/* <UserButton variant='outlined' onClick={handleLoginStatus}>
                check login
              </UserButton> */}
              <UserButton variant='outlined' onClick={handleClick}>
                {userData.first_name} {userData.last_name}
              </UserButton>
            </>
          ) : (
            <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
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
          <Link className={classes.navLinkItem} to='/'>
            <ListItemIcon>
              <HomeIcon fontSize='small' />
            </ListItemIcon>
            Intelly Home
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className={classes.navLinkItem} to='/contact'>
            <ListItemIcon>
              <ContactSupportIcon fontSize='small' />
            </ListItemIcon>
            Contact Support
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className={classes.navLinkItem}
            to='/login'
            onClick={() => handleLogout()}
          >
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default withStyles(styles)(UserMenu);
