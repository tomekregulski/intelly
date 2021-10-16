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
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        roles: user.roles,
        access: user.access,
        brands: user.brands,
        token: user.token,
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
