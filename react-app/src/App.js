import React, {useEffect, useState} from 'react'

import logo from './logo.svg';
import Main from './components/Main'
import Login from './components/Login'
import './App.css';

function App() {
    const [login, setLogin] = useState(false);
    const [currUser, setCurrUser] = useState();

    useEffect(() =>{
        setLogin(login)
    }, [login])
    useEffect(() =>{
        setCurrUser(currUser)
    }, [currUser])

  return (
      <div className="App">
          {login ?
              <Main>

              </Main>
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
