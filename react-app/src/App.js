import React, {useEffect, useState} from 'react'

import logo from './logo.svg';
import Main from './components/Main'
import Login from './components/Login'
import './App.css';
import {getCurrentUserAPIMethod} from './api/client.js';

function App() {
    const [login, setLogin] = useState(false);
    const [currUser, setCurrUser] = useState();

    useEffect(() =>{
        getCurrentUserAPIMethod().then((user) => {
            console.log(user);
            if (user != null) {
                setLogin(true);
            }
            else {
                setLogin(false);
            }
        });
    }, [login])
    useEffect(() =>{
        setCurrUser(currUser)
    }, [currUser])

  return (
      <div className="App">
          {login ?
              <Main
                  setLogin = {setLogin}
                  currUser = {currUser}
                  setCurrUser = {setCurrUser}
              ></Main>
              :
              <Login
                  login = {login}
                  setLogin = {setLogin}
                  setCurrUser = {setCurrUser}
              ></Login>
          }
      </div>
  );
}

export default App;
