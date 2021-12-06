import React, {useEffect, useState} from 'react'

import logo from './logo.svg';
import Main from './components/Main'
import Login from './components/Login'
import './App.css';
import {getCurrentUserAPIMethod} from './api/client.js';

function App() {
    const [login, setLogin] = useState(false);
    const [currUser, setCurrUser] = useState({});

    useEffect(() =>{
        getCurrentUserAPIMethod().then((user) => {
            console.log(user);
            if (user != null && Object.keys(user).length != 0) {
                setLogin(true);
                setCurrUser(user);
            }
            else {
                setLogin(false);
                console.log(login)
                setCurrUser({});
                console.log(currUser)
            }
        });
    }, [login])

    useEffect(()=>{
        setCurrUser(currUser);
    }, [currUser])

  return (
      <div className="App">
          {login ?
              <Main
                  login = {login}
                  setLogin = {setLogin}
                  currUser = {currUser}
                  setCurrUser = {setCurrUser}
              ></Main>
              :
              <Login
                  setLogin = {setLogin}
                  setCurrUser = {setCurrUser}
              ></Login>
          }
      </div>
  );
}

export default App;
