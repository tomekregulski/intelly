import React, { useState, createContext, useEffect } from 'react';
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
      // console.log('intelly login');
      localStorage.setItem('intellyUser', JSON.stringify(authState));
    }
  }, [setAuthState, authState]);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};
