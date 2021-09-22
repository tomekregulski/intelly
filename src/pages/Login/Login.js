import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';

import { Grid, TextField, Paper, Button } from '@material-ui/core';
import image from '../../images/intelly_logo.png';

// import AuthService from '../../../services/auth.service';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authState, setAuthState] = useContext(AuthContext);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submit');
    if (email.length && password.length) {
      // props.showError(null);
      const payload = {
        email: email,
        password: password,
      };

      // console.log(payload);

      axios
        .post(
          `https://intelly-server.herokuapp.com/api/users/login`,
          // 'http://localhost:5000/api/users/login',
          payload
        )
        .then((response) => {
          if (response.data.accessToken) {
            console.log(response.data);
            setAuthState({
              id: response.data.id,
              email: response.data.email,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              role: response.data.roles,
              brands: response.data.brands,
              token: response.data.accessToken,
            });
            console.log('logged in successfully');
            history.push('/');
            window.location.reload();
          }
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
            paddingTop: '160px',
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
