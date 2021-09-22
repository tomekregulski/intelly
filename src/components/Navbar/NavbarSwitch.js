import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import NavbarLoggedOut from './NavbarLoggedOut';
import AuthService from '../../Services/auth-service';

function NavbarSwitch() {
  const [currentUser, setCurrentUser] = useState({});

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser({});
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  if (currentUser.hasOwnProperty('first_name')) {
    return <Navbar handleLogout={handleLogout} />;
  } else {
    return <> </>;
    // <NavbarLoggedOut />;
  }
}

export default NavbarSwitch;
