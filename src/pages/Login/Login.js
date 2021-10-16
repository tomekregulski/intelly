import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';

import { Grid, TextField, Button } from '@material-ui/core';
import image from '../../images/intelly_logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth, user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [isAuth, setIsAuth] = auth;
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = user;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length && password.length) {
      const payload = {
        email: email,
        password: password,
      };

      console.log(payload);

      return axios
        .post('https://intelly-auth-service.herokuapp.com/api/users/login', {
          payload,
        })
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }

          setIsAuth(true);
          console.log(response.data);

          setUserData({
            id: response.data.id,
            email: response.data.email,
            password: response.data.password,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            roles: response.data.roles,
            access: response.data.access,
            brands: response.data.brands,
            token: response.data.token,
          });

          history.push('/');
        });
    }
  };

  return (
    <>
      <div>
        <img
          style={{
            display: 'block',
            width: '200px',
            margin: '0 auto 50px',
            paddingTop: '120px',
          }}
          src={image}
          alt='Intelly'
        />
      </div>
      <Grid
        container
        spacing={3}
        direction={'column'}
        justify={'center'}
        alignItems={'center'}
      >
        <Grid item xs={12}>
          <TextField
            label='Email'
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Password'
            type={'password'}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Button variant='outlined' fullWidth onClick={(e) => handleSubmit(e)}>
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
