import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState({
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    brands: '',
    token: '',
  });

  useEffect(() => {
    if (authState.token !== '') {
      async function fetchData() {
        const apiResponse = await axios.get(
          `https://intelly-auth-service.herokuapp.com/api/users/currentUser`
        );
        console.log(apiResponse);
      }
      fetchData();
    }
  }, []);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};
