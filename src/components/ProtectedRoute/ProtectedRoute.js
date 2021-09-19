import React from 'react';
// import { Login } from '../../pages/Login/Login';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  if (!JSON.parse(localStorage.getItem('intellyUser'))) {
    return <Redirect to={'/login'} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
