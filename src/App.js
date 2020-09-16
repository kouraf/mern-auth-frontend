import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Switch, Route } from 'react-router-dom';
import LoginUserRoute from './components/LoginUserRoute';
import UserContext from "./context/UserContext";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: null,
    user: {}
  });
  const [cookies, setCookie] = useCookies(['userData']);

  useEffect(() => {
    const coo = cookies.userData;
    if (coo) {
      setUserData(coo);
    }
  }, [userData])
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <LoginUserRoute path='/login' component={Login} />
        <LoginUserRoute path='/register' component={Register} />
        <Route component={Home} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
