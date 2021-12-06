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
            if (user != null && Object.keys(user).length != 0) {
                console.log('no touch plz')
                setLogin(true);
                setCurrUser(user);
            }
            else {
                console.log("currUser Null?")
                setLogin(false);
                setCurrUser({});
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
