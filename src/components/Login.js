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
        <div className='LoginPage'>
            <h1 style={{textAlign: 'center'}}>
                Day Logger
            </h1>
            <h2 style={{textAlign: 'center'}}>
                Organize your daily records in one place.
            </h2>

            <div className="Login">
                <form className='LoginForm' style = {{textAlign: 'center'}}>
                    <p>Email</p>
                    <input type="text"
                           id="Email"
                           name="Email"
                           value = {email}
                           onChange={(e) => setEmail(e.target.value)}></input>
                    <p>Password</p>
                    <input type="password"
                           id="Password"
                           name="Password"
                           value = {password}
                           onChange={(e) => setPassword(e.target.value)}></input>

                    <div>
                        <h3 style = {{color: 'red'}}>{error? error: " "}</h3>
                    </div>

                    <button onClick={login} type="submit" className="LoginButton">Log in</button>

                </form>

            </div>
            <hr style={{width: "100%"}}></hr>
            <div style={{textAlign: "center"}}>
                <button onClick={() => setShowSignup(true)} className="CreateAccount">Create New Account</button>
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