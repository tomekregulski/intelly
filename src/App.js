import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
// import Contact from './pages/Contact/Contact';
import { AuthProvider } from './context/authContext';
import { APIContextProvider } from './context/apiContext';

function App() {
  return (
    <>
      <AuthProvider>
        <APIContextProvider>
          <Navbar />
          <div>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              {/* <Route exact path='/contact' component={Contact} /> */}
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </APIContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
