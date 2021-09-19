import React, { useState, useEffect } from 'react';
// import { AuthContext } from '../../context/authContext';
import AuthService from '../../Services/auth-service';

const Welcome = () => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      // console.log(user);
      setCurrentUser(user);
      // console.log(brands);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      {/* <h1>Welcome to Intelly's Retail Data Dashboard!</h1> */}
      {currentUser && (
        <p>
          Welcome, {currentUser.first_name} {currentUser.last_name}!
        </p>
      )}
      <p style={{ marginTop: '30px' }}>
        {/* We are just getting things off the ground, and construction is still
        underway for both the Welcome and Monthly pages. */}
        This dashboard will allow you to review Whole Foods sales portal data
        for any brands that you have registered with us.
      </p>
      <p style={{ marginTop: '5px' }}>
        {/* In the meantime, please feel free to explore the Weekly page, and come
        back soon to see how things are moving along! */}
        To get started, use the menus above to select a brand and/or region, and
        then navigate over to the weekly or monthly view.
      </p>
    </div>
  );
};

export default Welcome;
