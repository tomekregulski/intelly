import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log('auth effect');
    if (JSON.parse(localStorage.getItem('user'))) {
      console.log('IS AUTH');
      setIsAuth(true);

      const user = JSON.parse(localStorage.getItem('user'));

      setUserData({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.roles,
        brands: user.brands,
        token: user.accessToken,
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth: [isAuth, setIsAuth], user: [userData, setUserData] }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
