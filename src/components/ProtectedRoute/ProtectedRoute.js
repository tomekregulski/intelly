import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';

const ProtectedRoute = (props) => {
  const { auth } = useContext(AuthContext);
  const [isAuth, setIsAuth] = auth;

  console.log(isAuth);

  if (JSON.parse(localStorage.getItem('user'))) {
    console.log('TRUE');
    console.log('ACCESS GRANTED');
    return <Route {...props} />;
  } else {
    console.log('ACCESS DENIED');
    return <Redirect to={'/login'} />;
  }

  // if (isAuth === true) {
  //   console.log('ACCESS GRANTED');
  //   return <Route {...props} />;
  // } else {
  //   console.log('ACCESS DENIED');
  //   return <Redirect to={'/login'} />;
  // }
};

export default ProtectedRoute;
