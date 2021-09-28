import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import NavbarSwitch from './components/Navbar/NavbarSwitch';
import Login from './pages/Login/Login';
import Contact from './pages/Contact/Contact';
import { AuthProvider } from './context/authContext';
import { APIContextProvider } from './context/apiContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <APIContextProvider>
          <NavbarSwitch />
          <Switch>
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/' component={Dashboard} />
            <ProtectedRoute exact path='/contact' component={Contact} />
          </Switch>
        </APIContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
