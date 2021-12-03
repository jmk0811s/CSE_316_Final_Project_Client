import React, {useEffect, useState} from 'react'
import '../App.css';
import useWindowDimensions from "./UseWindowDimensions";
import SignUp from "./SignUp";
import {loginUserAPIMethod} from "../api/client";

function Login(props){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showSignup, setShowSignup] = useState(false);
    const [error, setError] = useState();

    const GetWidth = () => {
        const {width, height} = useWindowDimensions();
        return width;
    };

    let width = GetWidth();

    const login = (e) => {
        e.preventDefault();
        let userInfo = {"email": email, "password": password};
        loginUserAPIMethod(userInfo).then((status) => {
            console.log(status);
            if (status) {
                setError("");
                props.setLogin(true);
            }
            else {
                setError("login failed");
                props.setLogin(false);
            }
        });
    }

    return (
        <div className='loginPage'>
            <h1 style={{textAlign: 'center'}}>
                Day Logger
            </h1>
            <h2 style={{textAlign: 'center'}}>
                Organize your daily records in one place.
            </h2>

            <div className='login-content'>
                <form style = {{textAlign: 'center'}}>
                    <li id="email">
                        <p style={{margin: 0, textAlign: 'left'}}>Email</p>
                        <input type="text"
                               id="Email"
                               name="Email"
                               value = {email}
                               style={{width: '100%' ,height: '20px', alignItems: 'center'}}
                               onChange={(e) => setEmail(e.target.value)}></input>
                    </li>
                    <li id="password">
                        <p style={{margin: 0, textAlign: 'left'}}>Password</p>
                        <input type="text"
                               id="Password"
                               name="Password"
                               value = {password}
                               style={{width: '100%', height: '20px'}}
                               onChange={(e) => setPassword(e.target.value)}></input>
                    </li>
                    <li>
                        {error ? <label style = {{color: 'red'}}>{error}</label>:<></>}
                    </li>
                    <li>
                        <button onClick={login} type="submit" style={{alignItems: 'center', width: '100%', height: '35px',border: 'none', borderRadius: '10px' ,backgroundColor: 'rgb(58, 99, 197)',color: '#ffffff'}}>Log in</button>
                    </li>
                    <hr></hr>

                </form>
                <li style ={{paddingTop:20, textAlign: 'center'}}>
                    <button onClick={() => setShowSignup(true)} style={{alignItems: 'center', width: '30%', height: '35px',border: 'none', borderRadius: '10px' ,backgroundColor: 'green',color: '#ffffff'}}>Create New Account</button>
                </li>
            </div>
            {showSignup ?
                <SignUp
                    showSignup={showSignup}
                    setShowSignup = {setShowSignup}
                    setLogin={props.setLogin}
                ></SignUp>
                : null
            }
        </div>

    );
}

export default Login;