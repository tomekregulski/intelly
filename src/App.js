import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/contact' component={Contact} />
        </Switch>
      </div>
    </>
  );
}

export default App;
