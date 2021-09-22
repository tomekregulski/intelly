import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Navbar from './Navbar';
// import NavbarLoggedOut from './NavbarLoggedOut';
import AuthService from '../../Services/auth-service';

function NavbarSwitch() {
  const [authState, setAuthState] = useContext(AuthContext);

  const handleLogout = () => {
    AuthService.logout();
    setAuthState({});
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setAuthState(user);
    }
  }, []);

  if (authState.first_name !== '') {
    return <Navbar handleLogout={handleLogout} />;
  } else {
    return <> </>;
    // <NavbarLoggedOut />;
  }
}

export default NavbarSwitch;
