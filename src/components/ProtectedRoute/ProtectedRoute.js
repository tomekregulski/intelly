import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const ProtectedRoute = (props) => {
  const [authState, setAuthState] = useContext(AuthContext);

  if (!authState.first_name) {
    return <Redirect to={'/login'} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
