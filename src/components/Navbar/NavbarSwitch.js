import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';

function NavbarSwitch() {
  const { auth, user } = useContext(AuthContext);
  const [isAuth, setIsAuth] = auth;
  const [userData, setUserData] = user;

  const history = useHistory();

  const handleLogout = () => {
    axios.post('https://intelly-auth-service.herokuapp.com/api/users/logout');
    localStorage.removeItem('user');
    setUserData({});
    setIsAuth(false);
    history.push('/login');
  };

  if (isAuth === true) {
    return <Navbar handleLogout={handleLogout} />;
  } else {
    return null;
  }
}

export default NavbarSwitch;
