import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
// import Contact from './pages/Contact/Contact';
import { APIContextProvider } from './context/apiContext';

function App() {
  return (
    <>
      <APIContextProvider>
        <Navbar />
        <div>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            {/* <Route exact path='/contact' component={Contact} /> */}
          </Switch>
        </div>
      </APIContextProvider>
    </>
  );
}

export default App;
