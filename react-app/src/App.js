import React, {useState} from 'react'

import logo from './logo.svg';
import Main from './components/Main'
import Login from './components/Login'
import './App.css';

function App() {
  const [login, setLogin] = useState(false);

  return (
      <div>
          {login ?
              <Main

              ></Main>
              :
              <Login
                  setLogin = {setLogin}
              ></Login>
          }
      </div>
  );
}

export default App;
