import axios from 'axios';

// const API_URL = '/api/users/';

class AuthService {
  // login(email, password) {
  //   return axios
  //     .post(API_URL + 'login', {
  //       email,
  //       password,
  //     })
  //     .then((response) => {
  //       if (response.data.accessToken) {
  //         localStorage.setItem('user', JSON.stringify(response.data));
  //       }
  //       return response.data;
  //     });
  // }
  logout() {
    axios.get('http://localhost:5000/api/users/logout');
  }
  //   register(first_name, last_name, email, password) {
  //     return axios.post(API_URL + "signup", {
  //       first_name,
  //       last_name,
  //       email,
  //       password
  //     });
  //   }
  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem('intellyUser'));
  // }
}

export default new AuthService();
