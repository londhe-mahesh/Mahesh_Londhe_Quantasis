import logo from './logo.svg';
import './App.css';
import './css/style.css'
import Dashboard from './components/Dashboard'
import { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';

function App() {
  return (
      <div className="container">
        <Router>
           <Switch>
              <Route path='/' exact>
                  <Dashboard></Dashboard>
              </Route>
              <Route path='/register' component={RegisterUser}></Route>
              <Route path='/login' component={Login}></Route>
           </Switch>
        </Router>
      </div>
  );
}

export default App;
